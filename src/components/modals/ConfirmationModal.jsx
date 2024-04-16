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

export default function ConfirmationModal(props) {
  const { modalIsOpen, setModalIsOpen, message, handleClickYes } = props;

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
        <button onClick={closeModal}>x</button>
        <h3>{message}</h3>
        <button onClick={closeModal}>No</button>
        <button onClick={handleClick}>Yes</button>
      </ReactModal>
    </div>
  );
}
