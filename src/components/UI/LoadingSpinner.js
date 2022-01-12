import Backdrop from "../UI/Backdrop";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  if (props.overlay) {
    return (
      <>
        <div className={classes.wrapper}>
          <div className={`${classes.spinner} ${classes.overlay}`} />
        </div>
        <Backdrop dark />
      </>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.spinner} />
    </div>
  );
};

export default LoadingSpinner;
