import EmptyList from '@icons/document-text-svgrepo-com.svg?react';

const SetlistEmpty = () => {
  return (
    <section
      data-cy="setlist-empty"
      className="flex min-h-0 grow flex-col gap-8"
    >
      <div
        id="setlist"
        data-cy="setlist-shell"
        className="flex min-h-0 w-full flex-6 flex-col gap-2 bg-bg-main"
      >
        <header data-cy="empty" className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-center bg-primary py-4">
            <h1 className="flex items-center justify-center bg-bg-main p-4 text-center text-2xl text-text-main">
              No setlist selected
            </h1>
          </div>

          <div
            data-cy="svg-container"
            className="flex min-h-0 flex-1 flex-col items-center justify-center bg-gray-300"
          >
            <h2 className="text-xl font-semibold">
              Choose a setlist from the left to continue.
            </h2>

            <EmptyList className="size-80 text-primary" />
          </div>
        </header>
      </div>
    </section>
  );
};
export default SetlistEmpty;
