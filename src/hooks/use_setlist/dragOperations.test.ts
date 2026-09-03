import { describe, it, expect } from 'vitest';

import { toSongRow } from '@/hooks/use_setlist/dragOperations';

describe('toSongRow', () => {
  it('keeps only kind and songId, dropping the useFieldArray id', () => {
    const field = { kind: 'song' as const, songId: '5', id: 'rhf-key' };
    expect(toSongRow(field)).toEqual({ kind: 'song', songId: '5' });
  });
});
