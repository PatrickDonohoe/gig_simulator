import z from 'zod';

export const SongTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  genre: z.string(),
  key: z.string(),
  tempo: z.number(),
  duration: z.number(),
  instrumentation: z.array(z.string()),
});

export type SongType = z.infer<typeof SongTypeSchema>;

export type SongTableRow = Omit<SongType, 'id' | 'instrumentation'>;

export type SongTableRowType = keyof SongTableRow;
