import z from 'zod';

import { SongTypeSchema } from './SongType';
import { DurationSchema } from './DurationInput';

export const SetlistTileSchema = z.strictObject({
  ...SongTypeSchema.shape,
  transitionTime: DurationSchema,
  notes: z.optional(z.string()),
})

export type SetlistTileType = z.infer<typeof SetlistTileSchema>;
