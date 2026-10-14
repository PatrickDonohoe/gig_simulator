import type { SearchReturn, SongReturn, AudioFeatures } from "@/types/SearchSong";
import type { SearchResultsPage } from "@/types/SearchResultsProps";
import type { SongFormValues } from "@/types/SongFormType";
import { msToBreakdown } from "@/utils/add_time/addTimeDurations";

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'not found'];
const MODES: SongFormValues['mode'][] = ['minor', 'major', 'not found'];

export const toSearchResultsPage = (r: SearchReturn): SearchResultsPage => ({
  rows: r.content.map((s) => ({
    id: s.id,
    title: s.trackTitle,
    artists: s.artists,
    durationSec: Math.round(s.durationMs / 1000),
  })),
  page: r.page,
  totalPages: r.totalPages,
  totalResults: r.totalElements,
  pageSize: r.size,
});

export const reccoToFormValues = (track: SongReturn, audio: AudioFeatures): SongFormValues => {
  return {
    rbid: track.id,
    title: track.trackTitle,
    artists: track.artists.length > 0 ? track.artists.map((a) => a.name).join(', ') : '',
    key: KEYS[audio.key],
    mode: MODES[audio.mode],
    tempo: String(Math.round(audio.tempo)),
    duration: msToBreakdown(track.durationMs),
    instrumentation: [],
  }
}