const compareValues = (
  a: string | number | null | undefined,
  b: string | number | null | undefined
): number => {
  // pushing empty/undefined to the bottom regardless of direction
  const aEmpty = a === undefined || a === null || a === '';
  const bEmpty = b === undefined || b === null || b === '';
  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;

  if (typeof a === 'number' && typeof b === 'number') return a - b;

  // strings (and anything else) - case-insensitive, locale-aware
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
};

export default compareValues;
