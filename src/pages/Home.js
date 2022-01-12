import { useState, useEffect } from "react";

import LevelSelector from "../components/LevelSelector/LevelSelector";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import classes from "./Home.module.css";
import banners from "../assets/banner-imports";

const Home = () => {
  const [currLevel, setCurrLevel] = useState(1);
  /* Actually might not need the image slider */

  const numLevels = Object.keys(banners).length;

  const handleNext = () => {
    setCurrLevel(currLevel + 1 > numLevels ? 1 : currLevel + 1);
  };

  const handlePrev = () => {
    setCurrLevel(currLevel - 1 < 1 ? numLevels : currLevel - 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <section className={classes["lvlSlct-container"]}>
          <LevelSelector
            onNext={handleNext}
            onPrev={handlePrev}
            level={currLevel}
            image={banners[`level_${currLevel}`]}
            haveNav={numLevels > 1}
          />
        </section>
        <section className={classes["leaderboard-container"]}>
          <Leaderboard level={currLevel} />
        </section>
      </div>
    </div>
  );
};

export default Home;
