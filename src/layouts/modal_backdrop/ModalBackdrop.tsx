interface ModalProps {
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalBackdrop = ({ handleClose, children }: ModalProps) => {
  return (
    <>
      <div
        id="modal_layout"
        data-cy="modal_layout"
        className="fixed top-0 right-0 left-0 z-40 h-screen min-h-full bg-black/50"
        onClick={handleClose}
      />

      {/* Centering Div */}
      <div
        id="centering_div_ML"
        data-cy="centering_div_ML"
        className="overlflow-y-auto pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          id="modal_children_wrapper"
          data-cy="modal_children_wrapper"
          className="pointer-events-auto max-h-full w-full max-w-md overflow-y-auto sm:max-w-lg md:max-w-xl lg:max-w-4xl"
        >
          {children}
        </div>
      </div>
    </>
  );
};
export default ModalBackdrop;
