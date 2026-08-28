import { Link } from 'react-router';
import AddFolder from '@icons/add-folder-svgrepo-com.svg?react';

const SavedSetlistsSidebarEmpty = () => {
  return (
    <div data-cy='sidebar-empty' className="mx-8 flex justify-center">
      <Link to="/dash/create" className="m-4 text-accent hover:text-accent/90">
        <AddFolder className="size-40" />
      </Link>
    </div>
  );
};
export default SavedSetlistsSidebarEmpty;
