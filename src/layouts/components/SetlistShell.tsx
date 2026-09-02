const SetlistShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      id="setlist"
      data-cy="setlist-shell"
      className="flex min-h-0 w-full flex-6 flex-col gap-2 bg-bg-main pb-2"
    >
      {children}
    </section>
  );
};
export default SetlistShell;
