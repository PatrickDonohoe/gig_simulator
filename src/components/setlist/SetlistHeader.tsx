import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';

export interface SetlistHeaderProps {
  setlistDuration: number;
  children: React.ReactNode;
}

const SetlistHeader = ({ setlistDuration, children }: SetlistHeaderProps) => {
  const duration = timeBreakdown(setlistDuration);

  return (
    // <header data-cy="setlist_header" className="flex flex-col bg-bg-main">
    <div
      data-cy="title-container"
      className="flex gap-4 border-b border-border-bold bg-bg-main px-6 py-2"
    >
      <div
        data-cy="time_div"
        className="border-bold flex max-w-60 flex-3 items-center justify-center gap-1 rounded-lg border border-border-bold bg-primary p-1 text-sm font-semibold text-accent md:text-base lg:text-lg"
      >
        <span>Total:</span>

        <span data-cy="setlist_length">
          {formatDuration(duration.hours)}:{formatDuration(duration.minutes)}:
          {formatDuration(duration.seconds)}
        </span>
      </div>

      {children}
    </div>
    // </header>
  );
};
export default SetlistHeader;
