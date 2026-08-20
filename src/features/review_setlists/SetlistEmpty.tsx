import EmptyList from '@icons/document-text-svgrepo-com.svg?react';
import SetlistShell from '@/layouts/components/SetlistShell';



const SetlistEmpty = () => {
  return (

    <section className="flex flex-col gap-8 min-h-0 flex-1">
      <SetlistShell>
        <section data-cy='empty' className="flex flex-col pt-8">
          <div className="flex justify-center items-center bg-primary">
            <h1 className="flex justify-center items-center bg-bg-main p-4 text-center text-2xl text-text-main rounded-xl">
              No setlist selected.
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <EmptyList className="text-accent size-80" />
          </div>
        </section>
      </SetlistShell>
    </section>
  );
};
export default SetlistEmpty;
