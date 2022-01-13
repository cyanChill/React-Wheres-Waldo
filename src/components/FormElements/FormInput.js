import React from "react";

import classes from "./FormInput.module.css";

const FormInput = React.forwardRef((props, ref) => {
  const inputType = props.type ? props.type : "text";
  const inputClasses = `${classes.input} ${props.block && classes.block}`;

  return (
    <div
      className={`${classes.container} ${
        props.vertical ? classes.vertical : classes.row
      }`}
    >
      {props.label && <label className={classes.label}>{props.label}</label>}
      <input
        type={inputType}
        placeholder={props.placeholder}
        className={inputClasses}
        ref={ref}
      />
      {props.error && props.errorMsg && (
        <span className={classes.errorMsg}>{props.errorMsg}</span>
      )}
    </div>
  );
});

export default FormInput;
