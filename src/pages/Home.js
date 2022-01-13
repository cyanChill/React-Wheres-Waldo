import { useState } from "react";

import LevelSelector from "../components/LevelSelector/LevelSelector";
import Leaderboard from "../components/Leaderboard/Leaderboard";

import classes from "./Home.module.css";
import getBanner, { numBanners } from "../assets/banner-imports";

const Home = () => {
  const [currLevel, setCurrLevel] = useState(1);

  const handleNext = () => {
    setCurrLevel(currLevel + 1 > numBanners ? 1 : currLevel + 1);
  };

  const handlePrev = () => {
    setCurrLevel(currLevel - 1 < 1 ? numBanners : currLevel - 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <section className={classes["lvlSlct-container"]}>
          <LevelSelector
            onNext={handleNext}
            onPrev={handlePrev}
            level={currLevel}
            image={getBanner(currLevel)}
            haveNav={numBanners > 1}
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
