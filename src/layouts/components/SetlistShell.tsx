const SetlistShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      id="setlist"
      data-cy="setlist-shell"
      className="flex h-full flex-8 flex-col gap-2 bg-primary pb-2"
    >
      {children}
    </section>
  );
};
export default SetlistShell;
