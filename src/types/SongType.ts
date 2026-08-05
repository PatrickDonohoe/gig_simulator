import z from 'zod';

export const SongTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  genre: z.string(),
  key: z.string(),
  tempo: z.string(),
  duration: z.number(),
  instrumentation: z.array(z.string()),
});

export type SongType = z.infer<typeof SongTypeSchema>;
