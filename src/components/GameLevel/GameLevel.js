import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { FirebaseContext } from "../../context/firebase-ctx";

import TargetBox from "../TargetBox/TargetBox";

import classes from "./GameLevel.module.css";
import level from "../../assets/images/level.jpg";
/* 
  Image Reference:
  https://www.reddit.com/r/wimmelbilder/comments/pxzhgz/day_at_the_beach_by_ste_pha_nie_included_a_list/
*/

const GameLevel = (props) => {
  const { levelId } = useParams();
  const { removeIncompleteDoc, getScoreboard } = useContext(FirebaseContext);
  const [targetDown, setTargetDown] = useState(false);
  const [targetCenter, setTargetCenter] = useState({ x: null, y: null });

  const targetDropHandler = (e) => {
    if (!targetDown) {
      const imgBoundingRect = e.target.getBoundingClientRect();
      const x = e.clientX - imgBoundingRect.left; // x position within element
      const y = e.clientY - imgBoundingRect.top; // y position within element

      console.log(`Pixels from Left: ${x}  |  Pixels from Top: ${y}`);

      setTargetCenter({ x, y });
      setTargetDown(true);
    } else {
      setTargetDown(false);
      setTargetCenter({ x: null, y: null });
    }
  };

  const validatCharLoc = async () => {};

  useEffect(() => {
    getScoreboard("level-1");
  }, []);

  useEffect(() => {
    window.addEventListener("unload", (e) => {
      removeIncompleteDoc();
    });

    return () => {
      window.removeEventListener("unload", removeIncompleteDoc);
    };
  }, [removeIncompleteDoc]);

  return (
    <div className={classes.test}>
      <div className={classes["img-container"]}>
        <img
          src={level}
          alt="Testing"
          onClick={targetDropHandler}
          draggable="false"
        />
        <TargetBox show={targetDown} center={targetCenter} />
      </div>
    </div>
  );
};

export default GameLevel;
