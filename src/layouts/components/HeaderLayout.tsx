import Navbar from '@/layouts/components/Navbar';
import ThemeToggle from '@/layouts/components/theme_toggle/ThemeToggle';
import Branding from '@/layouts/components/Branding';

const HeaderLayout = () => {
  return (
    <header className="flex w-max min-w-full items-center justify-between border-b-4 border-border-bold px-4">
      <div id="branding-navbar" className="flex items-center gap-4 md:gap-8">
        <Branding />

        <Navbar />
      </div>

      <ThemeToggle />
    </header>
  );
};
export default HeaderLayout;
