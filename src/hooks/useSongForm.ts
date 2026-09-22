import { useContext } from "react";

import { SongFormContext, type SongFormContextType } from "@/context/song_form/SongFormContext";

const useSongForm = (): SongFormContextType => {
  const context = useContext(SongFormContext);

  if (!context) {
    throw new Error('useSongForm must be used within a SongFormProvider.');
  }

  return context;
};

export default useSongForm;