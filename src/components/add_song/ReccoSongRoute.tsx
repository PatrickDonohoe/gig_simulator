import { useParams, useNavigate, useLocation } from 'react-router';

import { useTrackDetails } from '@/hooks/useTrackDetails';
import SongFormContainer from '@/components/add_song/SongFormContainer';
import { useLibraryStore } from '@/stores/useLibraryStore';

const ReccoSongRoute = () => {
  // Pulls the track id passed in the URL.
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const addSong = useLibraryStore((s) => s.addSong);

  const {
    data: formValues,
    isPending,
    isError,
    error,
  } = useTrackDetails(trackId);

  const back = () =>
    navigate({ pathname: '..', search: state?.fromSearch ?? '' });

  if (isPending) return <p>Loading track...</p>;
  if (isError) return <p role="alert">{error.message}</p>;

  return (
    <div className="flex flex-col gap-4 first:items-end">
      <button
        className="rounded-md border-2 border-border-bold px-4 py-2 font-bold hover:bg-primary-hover hover:text-accent focus:border-accent"
        onClick={back}
      >
        Return to results
      </button>

      <SongFormContainer
        defaultValues={formValues}
        onSave={(song) => {
          addSong({ ...song, rbid: trackId });
          back();
        }}
        title="Add song"
        submitLabel="add to library"
      />
    </div>
  );
};

export default ReccoSongRoute;
