import { useNavigate } from "react-router-dom";

import Navbar from "../Navigation/Navbar";
import Button from "../FormElements/Button";

import classes from "./GameNavbar.module.css";

const GameNavbar = (props) => {
  const { characters } = props;
  const navigate = useNavigate();

  return (
    <Navbar className={classes.gamebar}>
      <div className={classes.gameChars}>
        {characters.map((char) => (
          <img
            key={char.id}
            src={char.image}
            alt={char.id}
            className={char.found ? classes.found : null}
          />
        ))}
      </div>
      <Button onClick={() => navigate("/")}>Home</Button>
    </Navbar>
  );
};

export default GameNavbar;
