import { useMemo } from "react"

import WorkspaceSidebar from "./components/WorkspaceSidebar"
import Setlist from "./components/setlist/Setlist"
import useSetlist from "./hooks/useSetlist"
import { getAllSongs } from "@/utils/songStorage"
import type { SongType } from "@/types/SongType"

const CreateSetlistPage = () => {
  // Temporary solution to get data to the hook.
  const allSongs: SongType[] = useMemo(() => { 
    return getAllSongs();
   }, []);

  const { register } = useSetlist(allSongs);
  
  return (
    <div className="grid grid-cols-[6rem_1fr]">
      <WorkspaceSidebar tiles={[]} />
      <Setlist tiles={[]} register={register} />
    </div>
  )
}
export default CreateSetlistPage