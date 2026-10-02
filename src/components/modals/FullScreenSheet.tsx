import { useEffect, useRef } from 'react';

interface FullScreenSheetProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const FullScreenSheet = ({
  title,
  onClose,
  children,
}: FullScreenSheetProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Opens as a modal when mounted. The route decides when this component exists.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // Clicking the backdrop (desktop only; on mobile, the sheet fills the screen)
  // hits the <dialog> itself rather than its content.
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      id="full-screen-sheet"
      data-cy="full-screen-sheet"
      aria-labelledby="sheet-title"
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-bg-main p-0 text-text-main backdrop:bg-black/50 md:m-auto md:h-[85dvh] md:max-w-4xl md:rounded-lg md:border-2 md:border-border-bold"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-border-bold p-4">
          <h2 id="sheet-title" className="">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-my-1 flex-none px-2 py-1"
          >
            X
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </dialog>
  );
};
export default FullScreenSheet;
