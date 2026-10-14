import Chevron from '@icons/chevron-up-svgrepo-com.svg?react';

interface PageButtonProps {
  direction: 'prev' | 'next';
  isDisabled: boolean;
  onClick: () => void;
}

const PageButton = ({ direction, isDisabled, onClick }: PageButtonProps) => {
  const isPrev = direction === 'prev';

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="group flex-none transform rounded-md border-2 border-text-main px-2 py-1 transition-all hover:border-accent hover:text-accent enabled:hover:scale-105 hover:enabled:shadow-[0_0_12px_var(--color-accent)] disabled:border-transparent disabled:text-text-muted"
    >
      <Chevron
        className={`size-6 transition ${
          isPrev
            ? 'rotate-270 group-enabled:group-hover:-translate-x-1'
            : 'rotate-90 group-enabled:group-hover:translate-x-1'
        } `}
      />
    </button>
  );
};
export default PageButton;
