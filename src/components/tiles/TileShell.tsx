import DropEdge from "@/components/setlist/DropEdge";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/types";

interface TileShellProps {
  label: 'Song' | 'Transition';
  dragRef?: React.Ref<HTMLElement>; // undefined = not draggable
  dragging?: boolean;
  closestEdge?: Edge | null;
  actions?: React.ReactNode; // edit/trash icons, only when editable
  children: React.ReactNode;
}

const TileShell = ({ label, dragRef, actions, children, dragging = false, closestEdge = null }: TileShellProps) => {
  return (
    <div id="tile-shell" className="relative min-w-70 max-w-120">
      {dragRef && <DropEdge edge={closestEdge} />}
      <section
        ref={dragRef}
        className={`flex flex-col gap-2 roudned-xl border-2 border-border-bold p-2 text-text-main ${dragRef ? 'cursor-grab' : ''} ${dragging ? 'opacity-40' : ''}`}
      >
        <header className="grid grid-cols-3 items-center">
          <h1 className="col-start-2 justify-self-center font-semibold">{label}</h1>
          <div className="col-start-3 flex gap-2 justify-self-end">{actions}</div>
        </header>
        {children}
      </section>
    </div>
  )
}
export default TileShell