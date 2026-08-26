const SetlistShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      id="setlist"
      data-cy="setlist-shell"
      className="flex min-h-0 flex-6 flex-col gap-2 bg-bg-main pb-2 w-full"
    >
      {children}
    </section>
  );
};
export default SetlistShell;
