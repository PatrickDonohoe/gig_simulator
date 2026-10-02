import z from 'zod';

export const SongFormSchema = z.object({
  id: z.string().optional(),
  rbid: z.string().optional(),
  title: z.string().min(1, 'Song title is required.'),
  artists: z.string().min(1, 'Artist name is required.'),
  key: z.string(),
  mode: z.literal(['minor', 'major', 'not found']),
  tempo: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
  duration: z.object({
    hours: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
    minutes: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
    seconds: z.string().regex(/^\d*$/, 'Whole numbers only').optional(),
  }),
  instrumentation: z.array(z.object({ value: z.string() })),
});

export type SongFormValues = z.infer<typeof SongFormSchema>;