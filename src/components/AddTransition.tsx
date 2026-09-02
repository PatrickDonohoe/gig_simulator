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
      className="border border-border-bold"
    >
      Add a Transition
    </button>
  );
};
export default AddTransition;
