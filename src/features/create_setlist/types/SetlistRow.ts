import type { DurationInput } from "@/types/DurationInput";

export interface SetlistRow {
  songId: string;
  notes: string;
  transitionTime: DurationInput;
}