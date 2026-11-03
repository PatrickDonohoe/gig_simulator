import type { TransitionType } from "@/features/create_setlist/types/SetlistRow"
import { durationToDisplay } from "@/utils/add_time/addTimeDurations";

interface PerformTransTileProps {
  transition: TransitionType;
}

const PerformanceTransitionTile = ({ transition }: PerformTransTileProps) => {
  return (
    <li id="perform-trans-tile">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Notes:</h2>
        <p>{transition.notes}</p>
      </div>

      <div className="flex gap-2">
        <h2 className="font-semibold text-lg">Transition Time:</h2>
        <span>{durationToDisplay(transition.transitionTime)}</span>
      </div>
    </li>
  )
}
export default PerformanceTransitionTile