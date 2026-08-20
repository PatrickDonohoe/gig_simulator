import { formatDuration, timeBreakdown } from '@/utils/add_time/addTimeDurations';

export interface DragPreviewCardProps {
  title: string;
  duration: number;
}

// Rendered inside <DragOverlay> as the floating "currently being dragged"
// preview. Deliberately a plain, non-interactive summary (not the real
// SongLibraryTile/SetlistSongTile) so nothing here is registered with
// react-hook-form or dnd-kit's own sortable machinery.
const DragPreviewCard = ({ title, duration }: DragPreviewCardProps) => {
  const { minutes, seconds } = timeBreakdown(duration);

  return (
    <div className="flex max-w-72 items-center justify-between gap-2 rounded-xl border border-border-bold bg-bg-main p-2 text-text-main shadow-lg">
      <span className="truncate underline">{title}</span>
      <span>
        {formatDuration(minutes)}:{formatDuration(seconds)}
      </span>
    </div>
  );
};
export default DragPreviewCard;
