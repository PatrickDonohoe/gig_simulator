import type { SongRowType } from '../../features/create_setlist/types/SetlistRow';

// A song row is identical in the sidebar and the setlist ({ kind: 'song',
// songId }), so this isn't a shape conversion — it just narrows to those two
// fields, dropping anything extra (e.g. the `id` key useFieldArray puts on
// `fields` entries) before the row is inserted.
export const toSongRow = ({ songId }: { songId: string }): SongRowType => ({
  kind: 'song',
  songId,
});
