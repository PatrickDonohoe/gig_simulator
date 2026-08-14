import Navbar from '@/layouts/components/Navbar';
import ThemeToggle from '@/layouts/components/theme_toggle/ThemeToggle';
import Logo from '@icons/Logo_Only.svg?react';

const HeaderLayout = () => {
  return (
    <header className="flex w-max min-w-full items-center justify-between border-b-4 border-border-bold px-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 py-2">
          <Logo className="size-16" />

          <div className="flex flex-col justify-center font-semibold">
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
