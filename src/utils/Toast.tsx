import { toast } from 'react-toastify';

import SuccessBanner from '@/components/modals/SuccessBanner';

export const notifySuccess = (
  title: string,
  message?: string,
  strong?: string,
) =>
  toast(<SuccessBanner title={title} message={message} strong={strong} />, {
    icon: false,
    closeButton: false,
  });
