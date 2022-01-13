/* 
  Compared to the previous implementation, we should take in a "percentage"
  property to control how transparent the backdrop will be
*/

import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const { darkness, onClick } = props;

  const darkPercent =
    isNaN(darkness) || darkness > 1 || darkness < 0 ? 0.25 : darkness;
  const backdropStyles = { background: `rgba(0, 0, 0, ${darkPercent})` };

  return ReactDOM.createPortal(
    <div
      className={classes.backdrop}
      styles={backdropStyles}
      onClick={onClick}
    />,
    document.getElementById("backdrop-portal")
  );
};

export default Backdrop;
