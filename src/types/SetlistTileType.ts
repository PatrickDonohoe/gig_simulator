import type { SongType } from './SongType';
import type { DurationInput } from './DurationInput';

export interface SetlistTileType extends SongType {
  transitionTime: DurationInput;
  notes: string;
}
