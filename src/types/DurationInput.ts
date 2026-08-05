import z from "zod";

export const DurationSchema = z.object({
  hours: z.optional(z.number()),
  minutes: z.optional(z.number()),
  seconds: z.optional(z.number()),
})

export type DurationInput = z.infer<typeof DurationSchema>;
