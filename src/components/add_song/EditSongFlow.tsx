import { Outlet, useNavigate } from 'react-router';

import FullScreenSheet from '@/components/modals/FullScreenSheet';

const EditSongFlow = () => {
  const navigate = useNavigate();

  const close = () => navigate('.');

  return (
    <FullScreenSheet title="Edit a song" onClose={close}>
      <Outlet />
    </FullScreenSheet>
  );
};
export default EditSongFlow;
