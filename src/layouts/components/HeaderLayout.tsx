import Navbar from "@/layouts/components/Navbar";
import ThemeToggle from "@/layouts/components/theme_toggle/ThemeToggle";
import Logo from '@icons/Logo_Only.svg?react';

const HeaderLayout = () => {
  return (
    <header className="flex items-center justify-between px-4 w-max min-w-full border-b-4 border-border-bold">
      <div className="flex gap-8 items-center">
        <div className="flex gap-3 items-center py-2">
          <Logo className="size-16" />

          <div className="flex flex-col font-semibold justify-center">
            <span className="text-text-main text-2xl">SETLIST</span>

            <span className="text-accent text-xl">BUILDER</span>
          </div>
        </div>

        <Navbar />
      </div>

      <ThemeToggle />
    </header>
  )
}
export default HeaderLayout