interface FeatureTileProps {
  id: string;
  title: string;
  description: string;
}

const FeatureTile = ({ id, title, description }: FeatureTileProps) => {
  return (
    <article
      id={`feature-tile-${id}`}
      className="flex flex-col rounded-md bg-menu p-2 text-text-main *:p-1"
    >
      <h3 className="font-semibold">{title}</h3>

      <p className="grow bg-border-subtle text-sm @5xl:text-base">
        {description}
      </p>
    </article>
  );
};
export default FeatureTile;
