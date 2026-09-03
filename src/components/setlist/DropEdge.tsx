import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

// A 2px insertion line drawn just above or below a setlist row while a drag is
// hovering it. Absolutely positioned, so it never shifts layout.
const DropEdge = ({ edge }: { edge: Edge | null }) => {
  if (edge !== 'top' && edge !== 'bottom') return null;

  return (
    <div
      data-cy="drop-edge"
      className={`pointer-events-none absolute left-0 right-0 z-10 h-0.5 rounded bg-deep_space_blue ${
        edge === 'top' ? '-top-2' : '-bottom-2'
      }`}
    />
  );
};
export default DropEdge;
