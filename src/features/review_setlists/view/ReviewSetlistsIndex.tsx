import SetlistsSidebar from '@/features/review_setlists/saved_setlists_sidebar/SetlistsSidebar';
import SetlistEmpty from '@/features/review_setlists/SetlistEmpty';

const ReviewSetlistsIndex = () => {
  return (
    <div id='setlists-index' className='flex w-full'>
      <SetlistsSidebar />
      <SetlistEmpty />
    </div>
  );
};
export default ReviewSetlistsIndex;
