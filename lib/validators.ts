import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(25),
  email: z.string().email().max(120).optional().or(z.literal("")),
  serviceType: z.string().min(2).max(80),
  zipCode: z.string().min(3).max(15),
  timeline: z.string().min(2).max(80),
  details: z.string().min(10).max(2000),
  preferredContact: z.enum(["call", "text", "email"]),
  source: z.string().max(120).default("website-form"),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1200),
});

export const chatRequestSchema = z.object({
  sessionId: z.string().min(6).max(120),
  messages: z.array(chatMessageSchema).min(1).max(10),
  leadContext: z
    .object({
      name: z.string().max(80).optional(),
      phone: z.string().max(25).optional(),
      zipCode: z.string().max(15).optional(),
      serviceType: z.string().max(80).optional(),
      timeline: z.string().max(80).optional(),
    })
    .optional(),
});
