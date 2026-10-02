import { useParams, Navigate } from 'react-router';

import { useLibraryStore } from '@/stores/useLibraryStore';
import SongFormContainer from '@/components/add_song/SongFormContainer';
import { songToFormValues } from '@/utils/build_form_values/buildSongFormValues';

const EditSongRoute = () => {
  const { songId } = useParams();
  const song = useLibraryStore((s) =>
    s.librarySongs.find((x) => x.id === songId),
  );
  const update = useLibraryStore((s) => s.updateSong);
  if (!song) return <Navigate to="../.." />;

  return (
    <SongFormContainer
      defaultValues={songToFormValues(song)}
      onSave={update}
      title="Edit Song"
      submitLabel="Save changes"
    />
  );
};
export default EditSongRoute;
