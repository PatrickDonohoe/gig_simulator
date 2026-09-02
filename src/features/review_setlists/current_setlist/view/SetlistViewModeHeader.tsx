import SetlistHeader from '@/components/setlist/SetlistHeader';
import HeaderFilters from '@/components/setlist/HeaderFilters';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';

export interface ViewModeHeaderProps {
  setlistDuration: number;
  setlistName: string | undefined;
  handleMode: (mode: ViewMode) => void;
  otherModes: ViewMode[];
}
const SetlistViewModeHeader = ({
  setlistDuration,
  setlistName,
  handleMode,
  otherModes,
}: ViewModeHeaderProps) => {
  return (
    <div id="view-header" className="flex flex-col">
      <SetlistHeader setlistDuration={setlistDuration}>
        <h1 className="max-w-120 flex-5 rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2">
          {setlistName ?? 'Add your Setlist Title here'}
        </h1>

        <div className="flex gap-4 text-text-main">
          {otherModes.map((mode, index) => (
            <button
              key={index}
              id={`button-${mode}`}
              className="flex items-center justify-center rounded-xl border border-border-bold px-2 capitalize"
              onClick={() => handleMode(mode)}
              // disabled={noSetlist}
            >
              {mode}
            </button>
          ))}
        </div>
      </SetlistHeader>

      <HeaderFilters />
    </div>
  );
};
export default SetlistViewModeHeader;
