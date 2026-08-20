import type { FieldArrayWithId } from 'react-hook-form';

import type { FormValues } from '../../../hooks/use_setlist/useSetlist';
import type { CommonTileProps } from './CommonTileProps';

export interface TileProps {
  field: FieldArrayWithId<FormValues, 'setlist'>;
  commonTileProps: CommonTileProps;
}
