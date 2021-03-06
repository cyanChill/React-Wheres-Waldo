/* 
  This will have the image slider as it's main component -- the only difference is that
  we have the level name displayed under the image slider
*/
import { useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import Button from "../FormElements/Button";

import classes from "./LevelSelector.module.css";

const LevelSelector = ({ level, onNext, onPrev, image, haveNav }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.lvlSelect}>
      <div className={classes.banner}>
        {haveNav && (
          <div className={classes.prev} onClick={onPrev}>
            <BsChevronLeft />
          </div>
        )}
        <img src={image} alt={`Level ${level} Banner`} draggable="false" />
        {haveNav && (
          <div className={classes.next} onClick={onNext}>
            <BsChevronRight />
          </div>
        )}
      </div>
      <Button onClick={() => navigate(`/level-${level}`)}>Play Level</Button>
    </div>
  );
};

export default LevelSelector;
