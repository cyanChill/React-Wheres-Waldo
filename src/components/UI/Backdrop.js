import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const { darkness, onClick } = props;

  const darkPercent =
    isNaN(darkness) || darkness > 1 || darkness < 0 ? 0.25 : darkness;
  const backdropStyles = { backgroundColor: `rgba(0, 0, 0, ${darkPercent})` };

  return ReactDOM.createPortal(
    <div
      className={classes.backdrop}
      style={backdropStyles}
      onClick={onClick}
    />,
    document.getElementById("backdrop-portal")
  );
};

export default Backdrop;
