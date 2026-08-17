import z from 'zod';

import { DurationSchema } from '@/types/DurationInput';

export const SetlistRowSchema = z.object({
  songId: z.string(),
  notes: z.optional(z.string()),
  transitionTime: DurationSchema,
});

export type SetlistRow = z.infer<typeof SetlistRowSchema>;
