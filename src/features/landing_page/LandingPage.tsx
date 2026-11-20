import FeatureList from '@/features/landing_page/components/FeatureList';
import TechStack from '@/features/landing_page/components/TechStack';
import LPLink from '@/features/landing_page/components/LPLink';
import Branding from '@/layouts/components/Branding';
import DemoVideo from '@/features/landing_page/components/DemoVideo';

const LandingPage = () => {
  return (
    <div
      id="landing-page"
      className="flex min-h-0 flex-1 flex-col items-center divide-y-2 divide-text-main bg-bg-main pb-4 text-text-main *:px-6 *:py-4 w-full"
    >
      <header className="flex flex-col sm:flex-row justify-between w-full items-center pb-4 px-6 gap-2 sm:gap-0">
        <Branding />

        <div id="link-container" className="flex flex-row sm:flex-col gap-2 sm:gap-4 w-full sm:max-w-sm">
          {/* TODO: create temp admin login with pre-filled data */}
          <LPLink id="to-dash" address="dash" text="Try as Guest" />

          <LPLink id="to-free-dash" address="dash" text="Create Free Account" />
        </div>
      </header>

      <DemoVideo />

      {/* Technical Breakdown */}
      <FeatureList />

      {/* Technologies Employed */}
      <TechStack />
    </div>
  );
};
export default LandingPage;
