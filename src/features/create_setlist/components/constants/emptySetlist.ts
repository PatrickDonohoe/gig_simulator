import type { SubmitSetlistType } from '../../types/SubmitSetlistType';

export const emptySetlist: SubmitSetlistType[] = [
  {
    songId: '',
    transitionTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    notes: '',
  },
];
