import React from "react";
import "./modal.css";

interface ModalProps {
  closeModal: () => void;
  children?: any;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <>
      <div className="modal-darkBG" onClick={closeModal} />
      <div className="modal-centered">
        <div className="modal">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
