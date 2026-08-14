import { useNavigate } from 'react-router';

import SidebarShell from '@/layouts/components/SidebarShell';
import SidebarList from '@/features/review_setlists/setlist_sidebar/SidebarList';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

interface SetlistSidebarProps {
  handleSetlist: (id: string) => void;
  setlists: Omit<SubmitSetlistType, 'setlistSongs'>[];
}

const SetlistSidebar = ({ handleSetlist, setlists }: SetlistSidebarProps) => {
  const navigate = useNavigate();

  const HeaderProps = {
    onClick: () => navigate('/dash/create'),
    header: 'Setlists',
    buttonText: 'Create Setlist',
    header2: 'Select a setlist to review.',
  };

  return (
    <SidebarShell
      HeaderProps={HeaderProps}
      className="border-border-bold bg-bg-main"
    >
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-bold bg-primary">
        <header></header>

        <SidebarList setlists={setlists} handleSetlist={handleSetlist} />
      </section>
    </SidebarShell>
  );
};
export default SetlistSidebar;
