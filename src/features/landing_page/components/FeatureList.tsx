import FeatureTile from '@/features/landing_page/components/FeatureTile';

const FeatureList = () => {
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <h2 className="text-center text-2xl">Features:</h2>

      <div
        id="tile-container"
        className="@container grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <FeatureTile
          id="searchable"
          title="Song Catalog"
          description="Search by title to find and add songs to your library."
        />

        <FeatureTile
          id="drag-n-drop"
          title="As Simple as Drag n Drop"
          description="Once a song is added to your library, simply drag it to the desired location in your setlist and drop it into place."
        />

        <FeatureTile
          id="timing"
          title="Dynamic Setlist Timing"
          description="Total setlist time between songs and transitions is calculated in real time to allow instant feedback when making selections."
        />

        <FeatureTile
          id="export"
          title="Performance Mode & Exports"
          description="Performance mode provides an immersive experience for the artist that eliminates distractions, provides high-contrast display, metronome, remaining setlist time, anticipated finish time, and more."
        />
      </div>
    </section>
  );
};
export default FeatureList;
