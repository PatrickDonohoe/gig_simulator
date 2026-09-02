import EmptyList from '@icons/document-text-svgrepo-com.svg?react';
import SetlistShell from '@/layouts/components/SetlistShell';

const SetlistEmpty = () => {
  return (
    <section
      data-cy="setlist-empty"
      className="flex min-h-0 flex-1 flex-col gap-8"
    >
      <SetlistShell>
        <section data-cy="empty" className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-center bg-primary py-4">
            <h1 className="flex items-center justify-center rounded-xl bg-bg-main p-4 text-center text-2xl text-text-main">
              No setlist selected.
            </h1>
          </div>

          <div
            data-cy="svg-container"
            className="flex min-h-0 flex-1 items-center justify-center bg-gray-300"
          >
            <EmptyList className="size-80 text-primary" />
          </div>
        </section>
      </SetlistShell>
    </section>
  );
};
export default SetlistEmpty;
