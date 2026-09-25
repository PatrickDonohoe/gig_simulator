import { type SearchSong, SearchReturnSchema, SongReturnSchema, MultSongReturnSchema, SongAudioFeatures } from "@/types/SearchSong";

const RECCO_BASE_URL = 'https://api.reccobeats.com/v1/track';

export const searchTracks = async (
  { searchText, artist, artistId, sort, page, size }: SearchSong,
  signal?: AbortSignal,
): Promise<unknown> => {
  const params = new URLSearchParams({ searchText });
  if (artist) params.set('artist', artist);
  if (artistId) params.set('artistId', artistId);
  if (sort) params.set('sort', sort);
  if (page !== undefined) params.set('page', String(page));
  if (size !== undefined) params.set('size', String(size));

  const res = await fetch(`${RECCO_BASE_URL}/search?${params}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`ReccoBeats searchTracks failed: ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = SearchReturnSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error(`ReccoBeats searchTracks failed: ${parsed.error}`);
  }

  return parsed.data;
};

export const getTrack = async(
  id: string,
  signal: AbortSignal,
): Promise<unknown> => {
  const res = await fetch(`${RECCO_BASE_URL}/${id}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`ReccoBeats getTrack failed: ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = SongReturnSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error(`ReccoBeats getTrack failed: ${parsed.error}`);
  }

  return parsed.data;
}

export const getTracks = async(
  ids: string[],
  signal?: AbortSignal,
): Promise<unknown> => {
  const params = new URLSearchParams({ ids: ids.join(',') })
  
  const res = await fetch(`${RECCO_BASE_URL}?${params}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`ReccoBeats getTracks failed: ${res.statusText}`);
  }
  
  const json = await res.json();
  const parsed = MultSongReturnSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error(`ReccoBeats getTracks return unexpected data: ${parsed.error.message}`);
  }

  return parsed.data;
}

export const getTrackAudio = async (id: string, signal?: AbortSignal): Promise<unknown> => {
  const res = await fetch(`${RECCO_BASE_URL}/${id}/audio-features`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`ReccoBeats getTrackAudio failed: ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = SongAudioFeatures.safeParse(json);

  if (!parsed.success) {
    throw new Error(`ReccoBeats getTrackAudio failed: ${parsed.error}`);
  }

  return parsed.data;
}