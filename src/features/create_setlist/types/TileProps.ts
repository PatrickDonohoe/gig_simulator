import type { FieldArrayWithId } from 'react-hook-form';

import type { FormValues } from '../../../hooks/use_setlist/useSetlist';
import type { CommonTileProps } from './CommonTileProps';

export type SetlistField = FieldArrayWithId<FormValues, 'setlist'>;
export type SongField = Extract<SetlistField, { kind: 'song' }>;
export type TransitionField = Extract<SetlistField, { kind: 'transition' }>;

export interface TileProps {
  field: FieldArrayWithId<FormValues, 'setlist'>;
  commonTileProps: CommonTileProps;
}

export interface SongTileProps {
  field: SongField;
  commonTileProps: Pick<CommonTileProps, 'getSongDisplayDetails' | 'onRemove'>;
  index: number;
}

export interface TransitionTileProps {
  field: TransitionField;
  commonTileProps: Pick<
    CommonTileProps,
    'register' | 'getValues' | 'setValue' | 'control' | 'onRemove'
  >;
  index: number;
}
