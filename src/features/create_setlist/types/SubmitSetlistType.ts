import type { SetlistRow } from "@/features/create_setlist/types/SetlistRow";

export interface SubmitSetlistType {
  setlistId: string;
  setlistName: string;
  setlistSongs: SetlistRow[];
}
