import InfoIcon from '@icons/circle_i.svg?react';

interface FeatureTileProps {
  id: string;
  title: string;
  description: string;
  tooltip: string;
}

const FeatureTile = ({ id, title, description, tooltip }: FeatureTileProps) => {
  return (
    <article
      id={`feature-tile-${id}`}
      className="rounded-md bg-menu p-2 text-text-main"
    >
      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="flex items-center justify-between">
        <p>{description}</p>

        <span title={tooltip} className="cursor-pointer">
          <InfoIcon />
        </span>
      </div>
    </article>
  );
};
export default FeatureTile;
