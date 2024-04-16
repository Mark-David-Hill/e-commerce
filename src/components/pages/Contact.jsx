import { useState } from "react";

import AlertModal from "../modals/AlertModal";

export default function Contact() {
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);

  const modalMessage = "Your message was sent.";

  const handleSubmit = () => {
    const form = document.getElementsByClassName("contact-form")[0];
    setAlertModalIsOpen(true);
    form.reset();
  };

  return (
    <div className="contact-container">
      <AlertModal
        modalIsOpen={alertModalIsOpen}
        setModalIsOpen={setAlertModalIsOpen}
        message={modalMessage}
      />
      <h1>Contact</h1>
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          id="first-name"
          name="first-name"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          id="last-name"
          name="last-name"
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Message"
          required
        ></textarea>
        <input type="submit" />
      </form>
    </div>
  );
}
