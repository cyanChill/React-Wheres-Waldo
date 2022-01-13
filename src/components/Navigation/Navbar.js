import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <nav className={`${classes.navbar} ${props.className}`} style={props.style}>
      {props.children}
    </nav>
  );
};

export default Navbar;
