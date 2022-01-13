import ReactDOM from "react-dom";

import Card from "../UI/Card";
import Backdrop from "../UI/Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
  const cardStyle = {};

  const modalContent = (
    <div className={classes.modal}>
      <Backdrop darkness={0.75} />
      <Card style={cardStyle} className={classes.card}>
        <h2>{props.title}</h2>
        <hr />
        <div>{props.children}</div>
        <div>{props.actions}</div>
      </Card>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-portal")
  );
};

export default Modal;
