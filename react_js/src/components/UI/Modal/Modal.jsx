import React from "react";
import classes from './Modal.module.css'

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? [classes.modal, classes.active].join(' ') : classes.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? [classes.modalContent, classes.active].join(' ') : classes.modalContent}
        onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal;
