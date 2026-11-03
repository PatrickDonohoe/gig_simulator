import { Outlet, useNavigate } from 'react-router';

import FullScreenSheet from '@/components/modals/FullScreenSheet';

/**
 * @returns A modal as route that displays a form if the track id is present and
 *   a searchbar with results if it does not.
 */

const AddSongFlow = () => {
  const navigate = useNavigate();

  const close = () => navigate('..');

  return (
    <FullScreenSheet title="Add a song" onClose={close}>
      <Outlet />
    </FullScreenSheet>
  );
};
export default AddSongFlow;
