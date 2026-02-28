type InquiryPayload = {
  formType: "wholesale" | "contact";
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  monthlyVolume: string;
  productsInterested: string[];
  message: string;
};

type ResendConfig = {
  apiKey: string;
  apiBaseUrl: string;
  toEmail: string;
  fromEmail: string;
};

function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.INQUIRY_FROM_EMAIL;
  const apiBaseUrl =
    process.env.RESEND_API_BASE_URL ?? "https://api.resend.com";

  if (!apiKey || !toEmail || !fromEmail) {
    return null;
  }

  return {
    apiKey,
    apiBaseUrl,
    toEmail,
    fromEmail
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailContent(payload: InquiryPayload) {
  const inquiryType =
    payload.formType === "wholesale" ? "Wholesale Inquiry" : "Contact Message";
  const productList =
    payload.productsInterested.length > 0
      ? payload.productsInterested.join(", ")
      : "Not provided";

  const text = [
    `${inquiryType} from coinshieldproducts.com`,
    "",
    `Full Name: ${payload.fullName}`,
    `Company Name: ${payload.companyName || "Not provided"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Website / Marketplace: ${payload.website || "Not provided"}`,
    `Estimated Monthly Volume: ${payload.monthlyVolume || "Not provided"}`,
    `Products Interested In: ${productList}`,
    "",
    "Message:",
    payload.message
  ].join("\n");

  const rows = [
    ["Inquiry Type", inquiryType],
    ["Full Name", payload.fullName],
    ["Company Name", payload.companyName || "Not provided"],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Website / Marketplace", payload.website || "Not provided"],
    [
      "Estimated Monthly Volume",
      payload.monthlyVolume || "Not provided"
    ],
    ["Products Interested In", productList]
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;border:1px solid #d7d1c5;">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border:1px solid #d7d1c5;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#17202a;line-height:1.6;">
      <h1 style="margin-bottom:16px;">${escapeHtml(inquiryType)}</h1>
      <table style="border-collapse:collapse;margin-bottom:24px;width:100%;max-width:720px;">
        <tbody>${rows}</tbody>
      </table>
      <h2 style="margin-bottom:8px;">Message</h2>
      <div style="white-space:pre-wrap;border:1px solid #d7d1c5;padding:16px;border-radius:12px;background:#f8f6f1;">
        ${escapeHtml(payload.message)}
      </div>
    </div>
  `;

  return { html, text, inquiryType };
}

export async function sendInquiryEmail(payload: InquiryPayload) {
  const config = getResendConfig();

  if (!config) {
    throw new Error("Email delivery is not configured.");
  }

  const { html, text, inquiryType } = buildEmailContent(payload);
  const subject = `${inquiryType}: ${payload.fullName}${payload.companyName ? ` (${payload.companyName})` : ""}`;

  const response = await fetch(`${config.apiBaseUrl}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      reply_to: payload.email,
      subject,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Resend request failed with status ${response.status}: ${errorText}`
    );
  }

  return response.json();
}
