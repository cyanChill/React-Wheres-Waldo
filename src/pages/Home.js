import { useState, useEffect } from "react";

import LevelSelector from "../components/LevelSelector/LevelSelector";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import classes from "./Home.module.css";

const Home = () => {
  const [currLevel, setCurrLevel] = useState(1);
  /* Actually might not need the image slider */

  const handleNext = () => {};

  const handlePrev = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <section className={classes["lvlSlct-container"]}>
          <LevelSelector
            onNext={handleNext}
            onPrev={handlePrev}
            level={currLevel}
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
