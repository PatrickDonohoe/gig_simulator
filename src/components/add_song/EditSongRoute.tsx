import { useParams, Navigate, useNavigate } from 'react-router';

import { useLibraryStore } from '@/stores/useLibraryStore';
import SongFormContainer from '@/components/add_song/SongFormContainer';
import { songToFormValues } from '@/utils/build_form_values/buildSongFormValues';
import type { SongType } from '@/types/SongType';

const EditSongRoute = () => {
  const navigate = useNavigate();
  const { songId } = useParams();
  const song = useLibraryStore((s) =>
    s.librarySongs.find((x) => x.id === songId),
  );
  const update = useLibraryStore((s) => s.updateSong);
  const saveUpdate = (edited: SongType) => {
    update(edited);
    navigate('..', { replace: true })
  }
  if (!song) return <Navigate to=".." />;

  return (
    <SongFormContainer
      defaultValues={songToFormValues(song)}
      onSave={saveUpdate}
      title="Edit Song"
      submitLabel="Save changes"
    />
  );
};
export default EditSongRoute;
