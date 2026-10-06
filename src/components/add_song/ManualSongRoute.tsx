import SongFormContainer from "@/components/add_song/SongFormContainer";
import { emptySongFormValues } from "@/utils/build_form_values/buildSongFormValues";
import { useLibraryStore } from "@/stores/useLibraryStore";

const ManualSongRoute = () => {
  const create= useLibraryStore((s) => s.addSong);

  return (
    <SongFormContainer 
    defaultValues={emptySongFormValues()}
    onSave={create}
    title="New Song"
    submitLabel="add to library"
    />
  )
}
export default ManualSongRoute