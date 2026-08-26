import z from 'zod';

import { SetlistRowSchema } from '@/features/create_setlist/types/SetlistRow';

export const SubmitSetlistSchema = z.object({
  setlistId: z.string(),
  setlistName: z.string(),
  setlistSongs: z.array(SetlistRowSchema),
});

export type SubmitSetlistType = z.infer<typeof SubmitSetlistSchema>;
