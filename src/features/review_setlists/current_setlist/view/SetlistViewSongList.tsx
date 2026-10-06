import ViewTransitionTile from '@/features/review_setlists/current_setlist/view/ViewTransitionTile';
import ViewSongTile from '@/features/review_setlists/current_setlist/view/ViewSongTile';
import { type ViewRow } from '@/features/review_setlists/hooks/use_review/useReview';

export interface SetlistViewSongListProps {
  rows: ViewRow[];
  onRemove: (songId: string) => void;
}

/**
 * @param setlistSongs Is an array of the song id's and transition data for the
 *   selected setlist.
 * @param viewHeader Is the setlist data needed for the header and the callback
 *   fn to change the mode.
 * @param getSongData Is the callback fn to retrieve song data for a specific
 *   tile.
 * @param onRemove Is the callback fn to remove a song from the displayed
 *   setlist.
 * @returns A header (including setlist name and filters) and the mapped songs
 *   and transitions specific to this setlist.
 * @summary Presents the body of the setlist.
 */
const SetlistViewSongList = ({ rows, onRemove }: SetlistViewSongListProps) => {
  return (
    <div
      data-cy="list"
      className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-hidden bg-accent p-2 text-text-main hover:border-border-subtle"
    >
      {rows.map((row, index) =>
        row.kind === 'song' ? (
          <ViewSongTile key={row.songId} song={row} onRemove={onRemove} />
        ) : (
          <ViewTransitionTile key={row.transitionId} tile={row} index={index} />
        ),
      )}
    </div>
  );
};

export default SetlistViewSongList;
