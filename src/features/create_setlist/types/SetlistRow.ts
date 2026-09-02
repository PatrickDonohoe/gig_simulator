import z from 'zod';

import { DurationSchema } from '@/types/DurationInput';

export const TransitionSchema = z.object({
  kind: z.templateLiteral(['transition']),
  transitionId: z.string(),
  notes: z.optional(z.string()),
  transitionTime: DurationSchema,
});

export type TransitionType = z.infer<typeof TransitionSchema>;

export const SongRowSchema = z.object({
  kind: z.templateLiteral(['song']),
  songId: z.string(),
});

export type SongRowType = z.infer<typeof SongRowSchema>;

export const SetlistRowSchema = z.xor([SongRowSchema, TransitionSchema]);

// export const SetlistRowSchema = z.object({
//   songId: z.string(),
// });

export type SetlistRow = z.infer<typeof SetlistRowSchema>;
