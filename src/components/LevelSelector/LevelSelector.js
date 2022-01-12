/* 
  This will have the image slider as it's main component -- the only difference is that
  we have the level name displayed under the image slider
*/
import { useNavigate } from "react-router-dom";

import Button from "../FormElements/Button";

import classes from "./LevelSelector.module.css";
import banners from "../../assets/banner-imports";

const LevelSelector = ({ level, onNext, onPrev }) => {
  const navigate = useNavigate();
  const multipleLevels = Object.keys(banners).length > 1;

  return (
    <div className={classes.lvlSelect}>
      <div className={classes.banner}>
        {multipleLevels && <div className={classes.prev} onClick={onPrev} />}
        <img src={banners[`level_${level}`]} alt={`Level ${level} Banner`} />
        {multipleLevels && <div className={classes.next} onClick={onNext} />}
      </div>
      <p>Level {level}</p>
      <Button onClick={() => navigate(`/level-${level}`)}>Play Level</Button>
    </div>
  );
};

export default LevelSelector;
