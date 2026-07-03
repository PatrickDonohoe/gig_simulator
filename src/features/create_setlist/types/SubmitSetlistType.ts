import type { DurationInput } from '@/types/DurationInput';

export interface SubmitSetlistType {
  songId: string;
  transitionTime: DurationInput;
  notes: string;
}
