import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import CurrentSongs from '@/features/review_setlists/current_setlist/CurrentSongs';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SetlistTileType } from '@/types/SetlistTileType';
import SetlistHeader, {
  type SetlistHeaderProps,
} from '@/components/SetlistHeader';

export interface ViewCurrentProps {
  songsDisplayData: SetlistTileType[];
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType;
  headerData: Omit<SetlistHeaderProps, 'children'>;
}

const ViewCurrent = ({
  songsDisplayData,
  handleMode,
  setlistData,
  headerData,
}: ViewCurrentProps) => {
  const { activeFilters } = headerData;
  return (
    <div>
      <SetlistHeader {...headerData}>
        <h1 className="grow rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2">
          {setlistData.setlistName}
        </h1>

        <div className="flex gap-4">
          <button
            className="flex items-center justify-center"
            onClick={() => handleMode('perform')}
          >
            Perform
          </button>

          <button
            className="flex items-center justify-center"
            onClick={() => handleMode('edit')}
          >
            Edit
          </button>
        </div>
      </SetlistHeader>

      <section>
        <CurrentSongs
          songsDisplayData={songsDisplayData}
          activeFilters={activeFilters}
        />
      </section>
    </div>
  );
};
export default ViewCurrent;
