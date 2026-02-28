import { z } from "zod";

export const inquirySchema = z
  .object({
    formType: z.enum(["wholesale", "contact"]),
    fullName: z.string().trim().min(2, "Full name is required."),
    companyName: z.string().trim().optional().default(""),
    email: z.string().trim().email("Please provide a valid email address."),
    phone: z.string().trim().optional().default(""),
    website: z
      .union([z.literal(""), z.string().trim().url("Please provide a valid URL.")])
      .optional()
      .default(""),
    monthlyVolume: z.string().trim().optional().default(""),
    productsInterested: z.array(z.string()).optional().default([]),
    message: z.string().trim().min(10, "Please enter a message."),
    companyWebsite: z.string().optional().default("")
  })
  .superRefine((data, ctx) => {
    if (data.formType === "wholesale") {
      if (!data.companyName.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "Company name is required for wholesale inquiries."
        });
      }

      if (!data.monthlyVolume.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["monthlyVolume"],
          message: "Estimated monthly volume is required."
        });
      }

      if (data.productsInterested.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["productsInterested"],
          message: "Select at least one product."
        });
      }
    }
  });
