import Navbar from '@/layouts/components/Navbar';
import ThemeToggle from '@/layouts/components/theme_toggle/ThemeToggle';
import Logo from '@icons/Logo_Only.svg?react';

const HeaderLayout = () => {
  return (
    <header className="flex w-max min-w-full items-center justify-between border-b-4 border-border-bold px-4">
      <div id="branding-navbar" className="flex items-center gap-4 md:gap-8">
        <div id="branding" className="flex items-center gap-3 py-2">
          <Logo className="size-12 md:size-16" />

          <div
            id="company-name"
            className="hidden flex-col justify-center font-semibold sm:flex"
          >
            <span className="text-2xl text-text-main">SETLIST</span>

            <span className="text-xl text-accent">BUILDER</span>
          </div>
        </div>

        <Navbar />
      </div>

      <ThemeToggle />
    </header>
  );
};
export default HeaderLayout;
