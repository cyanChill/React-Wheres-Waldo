import Navbar from "./Navbar";

import classes from "./HomeNav.module.css";

const HomeNav = () => {
  return (
    <Navbar className={classes.nav} fixed>
      <p>
        Gameboard image by{" "}
        <a
          href="https://twitter.com/supersadsausage"
          target="_blank"
          rel="noreferrer"
        >
          <span className={classes.bold}>
            STE PHA NIE{" "}
            <span className={classes.twitter}>@supersadsausage</span>
          </span>
        </a>
      </p>
    </Navbar>
  );
};

export default HomeNav;
