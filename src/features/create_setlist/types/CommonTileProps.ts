import type {
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';

import type { FormValues } from '../../../hooks/use_setlist/useSetlist';
import type { SongType } from '@/types/SongType';

export interface CommonTileProps {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  watch: UseFormWatch<FormValues>;
  getSongDisplayDetails: (songId: string) => SongType | undefined;
  onClick: () => void;
  onRemove: UseFieldArrayRemove;
}
