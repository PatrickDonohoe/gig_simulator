import Moon from '@icons/moon-dark-theme-svgrepo-com.svg?react';
import Sun from '@icons/sun-light-theme-svgrepo-com.svg?react';
import useTheme from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { resolvedTheme, handleTheme } = useTheme();

  const isDark: boolean = resolvedTheme === 'dark';

  const visible: string = 'scale-100 rotate-0 opacity-100';
  const notVisible: string = 'scale-0 -rotate-90 opacity-0';

  return (
    <button
      data-cy="button"
      className="group w-20 flex-none rounded-full border-2 border-border-bold bg-bg-surface p-1 text-text-muted hover:border-accent hover:bg-bg-main hover:text-text-main"
      onClick={() => handleTheme(isDark ? 'light' : 'dark')}
    >
      <div
        data-cy="toggle"
        className={`relative size-8 ${!isDark && 'translate-x-full'}`}
      >
        <Moon
          data-cy="moon"
          className={`absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${isDark ? `${visible} group-hover:translate-x-1` : notVisible}`}
        />
        <Sun
          data-cy="sun"
          className={`absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${isDark ? notVisible : `${visible} group-hover:-translate-x-1`}`}
        />
      </div>
    </button>
  );
};
export default ThemeToggle;
