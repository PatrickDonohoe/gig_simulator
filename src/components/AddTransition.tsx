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
      className="border border-border-bold text-black rounded-md bg-accent/50 shadow-lg max-w-36 px-2 mx-auto hover:bg-accent/70 hover:ring"
    >
      Add a Transition
    </button>
  );
};
export default AddTransition;
