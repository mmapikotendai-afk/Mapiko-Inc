import { z } from "zod";
export const serviceIds = [
  "websites",
  "applications",
  "education",
  "ai",
  "support",
  "unsure",
] as const;
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  organisation: z.string().trim().max(150).optional().default(""),
  service: z.enum(serviceIds, { error: "Please choose a service." }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000),
  budget: z.string().trim().max(100).optional().default(""),
  timeframe: z.string().trim().max(150).optional().default(""),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().finite(),
});
export type ContactInput = z.infer<typeof contactSchema>;
export function isContactConfigured() {
  return !!(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL
  );
}
