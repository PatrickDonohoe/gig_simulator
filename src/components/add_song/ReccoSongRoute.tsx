import { useParams, useNavigate } from "react-router";

import { useTrackDetails } from "@/hooks/useTrackDetails";
import SongFormContainer from "@/components/add_song/SongFormContainer";
import { useLibraryStore } from "@/stores/useLibraryStore";

const ReccoSongRoute = () => {
  // Pulls the track id passed in the URL.
  const { trackId } = useParams();
  const navigate = useNavigate();
  const addSong = useLibraryStore((s) => s.addSong);
  const { data: formValues, isPending, isError, error } = useTrackDetails(trackId);

  if (isPending) return <p>Loading track...</p>
  if (isError) return <p role="alert">{error.message}</p>

  return <SongFormContainer defaultValues={formValues} onSave={(song) => {
    addSong({ ...song, rbid: trackId });
    navigate('../..') // track/:trackId -> add-song -> page
  }} title="Add song" submitLabel="add to library" />
}

export default ReccoSongRoute;