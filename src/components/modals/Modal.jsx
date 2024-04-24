import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

export default function Modal(props) {
  const { modalType, modalIsOpen, setModalIsOpen, message, handleClickYes } =
    props;

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleClick() {
    handleClickYes();
    closeModal();
  }

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-content-wrapper">
          <div className="modal-close-wrapper">
            <button onClick={closeModal}>x</button>
          </div>
          <h3>{message}</h3>
          {modalType === "confirmation" ? (
            <div className="modal-buttons-wrapper">
              <button onClick={closeModal}>No</button>
              <button onClick={handleClick}>Yes</button>
            </div>
          ) : (
            <div className="modal-buttons-wrapper">
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
