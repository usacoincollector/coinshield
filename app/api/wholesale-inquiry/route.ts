import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

type Entry = {
  count: number;
  resetAt: number;
};

const ipStore = new Map<string, Entry>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const existing = ipStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_REQUESTS) {
    return false;
  }

  existing.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please wait a minute and try again."
      },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request payload."
      },
      { status: 400 }
    );
  }

  const companyWebsite =
    typeof body === "object" &&
    body !== null &&
    "companyWebsite" in body &&
    typeof body.companyWebsite === "string"
      ? body.companyWebsite
      : "";

  if (companyWebsite) {
    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received."
      },
      { status: 200 }
    );
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please review the form fields and try again.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  console.log("[Coin Shield inquiry stub]", {
    receivedAt: new Date().toISOString(),
    ip,
    payload: parsed.data
  });

  return NextResponse.json({
    success: true,
    message:
      parsed.data.formType === "wholesale"
        ? "Your wholesale inquiry has been received."
        : "Your message has been received."
  });
}
