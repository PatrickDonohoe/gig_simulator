import z from 'zod';

export const SongTypeSchema = z.object({
  id: z.string(),
  rbid: z.string().optional(),
  title: z.string(),
  artists: z.string(),
  key: z.string(),
  mode: z.literal(['major', 'minor', 'not found']),
  tempo: z.number(),
  duration: z.number(),
  instrumentation: z.array(z.string()),
  upc: z.string().optional(),
});

export type SongType = z.infer<typeof SongTypeSchema>;

export type SongTableRow = Omit<SongType, 'id' | 'instrumentation'>;

export type SongTableRowType = keyof SongTableRow;
