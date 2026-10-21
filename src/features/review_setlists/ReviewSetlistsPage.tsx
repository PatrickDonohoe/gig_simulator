import { Outlet, useParams } from "react-router";

const ReviewSetlistsPage = () => {
  const { setlistId } = useParams();
  
  return (
    <div data-cy="view-page" className="flex min-h-0 flex-1">
      <Outlet key={setlistId} />
    </div>
  );
};
export default ReviewSetlistsPage;
