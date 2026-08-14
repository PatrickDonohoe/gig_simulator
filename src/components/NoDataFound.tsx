const NoDataFound = ({ text }: { text: string }) => {
  return (
    <div
      data-cy="no_data_found"
      className="flex h-full items-center justify-center text-text-main"
    >
      <p className="text-center">{text}</p>
    </div>
  );
};
export default NoDataFound;
