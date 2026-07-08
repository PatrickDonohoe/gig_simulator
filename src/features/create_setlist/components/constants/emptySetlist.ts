import type { SetlistRow } from "../../types/SetlistRow";

export const emptySetlist: SetlistRow[] = [
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
