import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes["btn-colors"]} ${classes.btn} ${
    props.className
  } ${props.inverse && classes.inverse} ${
    props.variant && classes[props.variant]
  }`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
