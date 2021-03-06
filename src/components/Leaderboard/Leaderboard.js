/* 
    Includes header -- Maybe "Top 10 Fastest Times"
    Includes a subcomponent which contains the actual score and probably
    relies on react-firebase-hooks for live updates
      -- Actually, probably should update when the current user wins a round
*/
import { useContext, useEffect, useState } from "react";

import { GameContext } from "../../context/game-ctx";

import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Leaderboard.module.css";

const Leaderboard = ({ level }) => {
  const { getTopTenScoreboard } = useContext(GameContext);
  const [topTen, setTopTen] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const populateData = async () => {
      setIsLoading(true);
      const boardData = await getTopTenScoreboard(level);
      setTopTen(boardData);

      setIsLoading(false);
    };

    populateData();
  }, [level, getTopTenScoreboard]);

  return (
    <div className={classes.leaderboard}>
      <h1>Leaderboard</h1>
      {isLoading && (
        <div className={`center ${classes.spinner}`}>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && topTen.length > 0 && (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Time (seconds)</th>
            </tr>
            {topTen.map((time, idx) => (
              <tr key={idx}>
                <td>{time.name}</td>
                <td>{time.runTime / 1000}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && topTen.length === 0 && (
        <p className={classes.noScore}>There's no times for this level.</p>
      )}
    </div>
  );
};

export default Leaderboard;
