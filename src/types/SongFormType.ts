import z from 'zod';

export const SongFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Song title is required.'),
  artist: z.string().min(1, 'Artist name is required.'),
  genre: z.string(),
  key: z.string(),
  tempo: z.string(),
  duration: z.object({
    hours: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
    minutes: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
    seconds: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
  }),
  instrumentation: z.array(z.object({ value: z.string() })),
});

export type SongFormValues = z.infer<typeof SongFormSchema>;
