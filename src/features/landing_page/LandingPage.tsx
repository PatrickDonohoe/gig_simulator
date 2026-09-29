import FeatureTile from '@/features/landing_page/FeatureTile';
import TechStack from '@/features/landing_page/TechStack';
import LPLink from '@/features/landing_page/LPLink';

const LandingPage = () => {
  return (
    <div
      id="landing-page"
      className="flex flex-col items-center bg-bg-main text-text-main py-4 divide-y-2 divide-text-main"
    >
      <header className="grid grid-cols-3 items-center pb-4">
        <h1 className="col-start-2 text-center text-3xl underline text-shadow-lg">
          Setlist Builder
        </h1>

        <div id="link-container" className="flex items-center gap-4 px-4">
          {/* TODO: create temp admin login with pre-filled data */}
          <LPLink id="to-dash" address="dash" text="Try as Guest/Recruiter" />
          
          <LPLink id="to-free-dash" address="dash" text="Create Free Account" />
        </div>
      </header>

      <section id='video-container' className="flex flex-col md:flex-row gap-2 md:gap-8 p-4">
        <div className="flex flex-col md:gap-4">
          <h2 className="text-2xl text-shadow-md font-bold">Setlist Builder at work</h2>
          <span className='font-semibold text-shadow-sm'>Drag and drop songs from your library to build a setlist.</span>
        </div>

        <video src="" width={800} height={450} controls autoPlay muted loop>
          Video is missing or unsupported.
        </video>
      </section>

      {/* Technical Breakdown */}
      <section className="flex flex-row md:flex-col items-center p-4 gap-4">
        <h2 className="text-center text-2xl">Features:</h2>

        <div id="tile-container" className="wrap flex flex-col md:flex-row gap-4">
          <FeatureTile
            id="searchable"
            title="Searchable Song Catalog"
            description="Search by title to find and add songs to your library."
            tooltip="Searches Recco Beats DB by title to show search results and prefill add song form data."
          />

          <FeatureTile
            id="drag-n-drop"
            title="Simple as Drag n Drop"
            description="Once a song is added to your library, simply drag it to the desired location in your setlist and drop it into place."
            tooltip="Utilizes @atlaskit/pragmatic-drag-n-drop to move songs between the library sidebar and the setlist as well as moving transitions between songs."
          />

          <FeatureTile
            id="timing"
            title="Dynamic Setlist Timing"
            description="Total setlist time between songs and transitions is calculated in real time to allow instant feedback when making selections."
            tooltip="Setlist duration is calculated via reducer function that recalculates when useWatch detects a change in the setlist field array."
          />

          <FeatureTile
            id="export"
            title="Performance Mode & Exports"
            description="Performance mode provides an immersive experience for the artist that eliminates distractions, provides high-contrast display, metronome, remaining setlist time, anticipated finish time, and more."
            tooltip="More details to come as these features are completed." // TODO: add relevant description of techniques used.
          />
        </div>
      </section>

      {/* Technologies Employed */}
      <TechStack />
    </div>
  );
};
export default LandingPage;
