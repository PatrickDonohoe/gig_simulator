export interface AddTransitionProps {
  onClick: () => void;
  dataCy?: string;
}

const AddTransition = ({ onClick, dataCy }: AddTransitionProps) => {
  return (
    <button
      type="button"
      data-cy={dataCy}
      onClick={onClick}
      className="mx-auto max-w-36 rounded-md border border-border-bold bg-accent/50 px-2 text-black shadow-lg hover:bg-accent/70 hover:ring"
    >
      Add a Transition
    </button>
  );
};
export default AddTransition;
