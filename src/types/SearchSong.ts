import z from 'zod';

// Used for the search parameters
export const SearchSongSchema = z.object({
  searchText: z.string().min(3, 'Song title must be at three letters long'),
  artist: z
    .string()
    .min(3, 'Artist name must be at least three letters long')
    .optional(),
  artistId: z.string().optional(),
  sort: z.literal(['asc', 'desc']).optional(),
  size: z.number().min(1).max(50).optional(),
  page: z.number().min(0).max(1000).optional(),
});

export type SearchSong = z.infer<typeof SearchSongSchema>;

export const SongReturnSchema = z.object({
  id: z.string(),
  trackTitle: z.string(),
  artists: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      href: z.string(),
    }),
  ),
  durationMs: z.number(),
  isrc: z.string().optional(),
  ean: z.string().optional(),
  upc: z.string().optional(),
  href: z.string(),
  availableCountries: z.string().optional(),
  popularity: z.number().min(0).max(100),
  // TODO: add corresponding popularity icon next to song title either in library or create setlist.
});

export const MultSongReturnSchema = z.object({
  content: z.array(SongReturnSchema),
});

export const SearchReturnSchema = z.object({
  content: z.array(SongReturnSchema),
  page: z.number(),
  size: z.number(), // assuming this is elements/page
  totalElements: z.number(),
  totalPages: z.number(),
});

// Schema for the returned audio features object.
export const SongAudioFeatures = z.object({
  id: z.string(),
  href: z.url(),
  isrc: z.string(),
  acousticness: z.number().min(0).max(1),
  danceability: z.number().min(0).max(1),
  energy: z.number().min(0).max(1),
  instrumentalness: z.number().min(0).max(1),
  key: z.number().min(-1).max(11), // -1 = no key, 0 = C, 11 = B
  liveness: z.number().min(0).max(1),
  loudness: z.number(),
  mode: z.number().min(-1).max(1), // -1 = no mode, 0 = minor, 1 = major
  speechiness: z.number().min(0).max(1),
  tempo: z.number(),
  valence: z.number().min(0).max(1),
});
