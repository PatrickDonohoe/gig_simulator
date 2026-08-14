import type {
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';

import type { FormValues } from '../hooks/useSetlist';
import type { SongType } from '@/types/SongType';
import type { FilterType } from '@/hooks/useFilters';

export interface CommonTileProps {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  getSongDisplayDetails: (songId: string) => SongType | undefined;
  onClick: () => void;
  onRemove: UseFieldArrayRemove;
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}
