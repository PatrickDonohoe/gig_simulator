import { Link } from 'react-router';

import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import Pencil from '@icons/edit-3-svgrepo-com.svg?react';
import TileShell from '@/components/tiles/TileShell';
import type { SongTileProps } from '@/features/create_setlist/types/TileProps';
import { useSetlistRowTile } from '@/hooks/use_setlist/useDndTile';
import SongDetails from '@/components/tiles/SongDetails';

const SetlistSongTile = ({
  field,
  index,
  commonTileProps,
  editable = true,
}: SongTileProps) => {
  const { ref, dragging, closestEdge } = useSetlistRowTile({
    rowId: field.id,
    index,
    rowKind: 'song',
    disabled: !editable,
  });

  const { getSongData, onRemove } = commonTileProps;
  const song = getSongData(field.songId) ?? {
    id: field.songId,
    title: 'unknown',
    artists: '',
    key: '',
    mode: 'not found',
    tempo: 0,
    duration: 0,
  };

  return (
    <TileShell
      label="Song"
      id={song.id}
      dragRef={editable ? ref : undefined}
      dragging={dragging}
      closestEdge={closestEdge}
      actions={
        editable && (
          <>
            <Link
              id={`edit-button-${song.id}`}
              to={`edit-song/${field.songId}`}
              aria-label="Edit song"
            >
              <Pencil className="size-6" />
            </Link>

            <button
              type="button"
              onClick={() => onRemove(index)}
              aria-label="Remove from setlist"
            >
              <TrashCan className="size-6" />
            </button>
          </>
        )
      }
    >
      <SongDetails song={song} />
    </TileShell>
  );
};
export default SetlistSongTile;
