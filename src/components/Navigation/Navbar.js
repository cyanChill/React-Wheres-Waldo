import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const navStyle = {
    position: props.fixed ? "fixed" : "static",
    ...props.style,
  };

  return (
    <nav className={`${classes.navbar} ${props.className}`} style={navStyle}>
      {props.children}
    </nav>
  );
};

export default Navbar;
