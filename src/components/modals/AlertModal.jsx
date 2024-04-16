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

export default function AlertModal(props) {
  const { modalIsOpen, setModalIsOpen, message } = props;

  function closeModal() {
    setModalIsOpen(false);
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
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
}