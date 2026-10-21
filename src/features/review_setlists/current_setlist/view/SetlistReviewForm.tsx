import { useMemo } from 'react';
import { Link, Outlet, useRouteLoaderData } from 'react-router';

import useSetlistEditorState from '@/hooks/use_setlist/useSetlistEditorState';
import { submitEditSetlist } from '@/features/create_setlist/services/submitFuncs';
import SetlistEditor from '@/components/setlist/SetlistEditor';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { setlistToFormValues } from '@/utils/build_form_values/buildSetlistFormValues';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

const SetlistReviewForm = () => {
  // uses setlist data retrieved in DashRoutes from setlist id in the URL
  const saved = useRouteLoaderData('setlist') as SubmitSetlistType;
  const librarySongs = useLibraryStore((s) => s.librarySongs); // all songs in the library
  const defaultValues = useMemo(
    () => setlistToFormValues(saved, librarySongs),
    [saved, librarySongs],
  );

  const { setlist, sidebar } = useSetlistEditorState(
    (data) => submitEditSetlist({ ...data, setlistId: saved.setlistId }),
    defaultValues,
  );

  return (
    <div id="setlist-review-form" className="flex min-h-0 flex-1">
      <SetlistEditor
        sidebar={sidebar}
        setlist={{ ...setlist, submitLabel: 'Save changes' }}
        collapsibleLibrary
        initialLibraryOpen={saved.setlistSongs.length === 0}
        headerActions={<Link to='perform' className='flex flex-row items-center justify-center order-2 @md:order-3 gap-2 rounded-lg border border-border-bold bg-primary/80 p-1 font-semibold text-accent lg:text-lg max-w-40'>Perform</Link>}
      />
      <Outlet /> {/* edit-song/:songId modal renders here */}
    </div>
  );
};
export default SetlistReviewForm;
