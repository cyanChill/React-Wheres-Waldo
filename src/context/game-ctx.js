import React, { useState, useEffect, useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import firestore, { fetchDocData } from "../firebase";

const GameContext = React.createContext();

const GameContextProvider = (props) => {
  const [cachedScores, setCachedScores] = useState([]);

  /* Fetch Functions*/
  const getLvlInfo = useCallback(async (lvl) => {
    const levelInfo = await fetchDocData("wheres-waldo-locations", lvl);
    return levelInfo;
  }, []);

  const getTopTenScoreboard = useCallback(
    (lvl) => {
      return cachedScores
        .filter((score) => score.levelId === lvl && score.name)
        .sort((a, b) => a.runTime - b.runTime)
        .splice(0, 10);
    },
    [cachedScores]
  );

  /* Function to get level characters */
  const getLvlChars = useCallback(
    async (lvl) => {
      const levelData = await getLvlInfo(lvl);
      const levelChars = Object.keys(levelData).filter(
        (key) => key !== "_imgSize"
      );

      // Return the types of characters for the level
      return { characters: levelChars };
    },
    [getLvlInfo]
  );

  /* Function to submit a score to the database */
  const submitResult = useCallback(async (lvlNum, runTime, name) => {
    const newDocId = uuidv4();

    // Add document to the database
    const lbRef = firestore.collection("wheres-waldo-leaderboard");
    lbRef.doc(newDocId).set({
      name: name,
      levelId: lvlNum,
      runTime: runTime,
    });

    await fetchScores();
  }, []);

  /* Function to validate a guess at where a character is on the image */
  const validateCharacterLevel = useCallback(
    async (lvl, charId, estLoc) => {
      const levelData = await getLvlInfo(lvl);

      const { width: savedWidth, height: savedHeight } = levelData["_imgSize"];
      const charRef = levelData[charId];
      let { topLeftCorner: cTLC, bottomRightCorner: cBRC } = charRef;

      const {
        topLeftCorner: eTLC,
        bottomRightCorner: eBRC,
        currImgWidth,
        currImgHeight,
      } = estLoc;

      /* Scaling Corrections */
      const xScaleRatio = currImgWidth / savedWidth;
      const yScaleRatio = currImgHeight / savedHeight;
      cTLC = { x: (cTLC.x *= xScaleRatio), y: (cTLC.y *= yScaleRatio) };
      cBRC = { x: (cBRC.x *= xScaleRatio), y: (cBRC.y *= yScaleRatio) };

      /* Seeing if the estimated location is within the acceptable range */
      if (
        cTLC.x > eBRC.x || // Est. loc. box is left of actual box
        cBRC.x < eTLC.x || // Est. loc. box is right of actual box
        cBRC.y < eTLC.y || // Est. loc. box is above actual box
        cTLC.y > eBRC.y // Est. loc. box is below actual box
      ) {
        return false;
      }

      return true;
    },
    [getLvlInfo]
  );

  /* Function to cache the leaderboards */
  const fetchScores = useCallback(async () => {
    const docRef = firestore.collection("wheres-waldo-leaderboard");

    const queryData = await new Promise((resolve, reject) => {
      docRef
        .get()
        .then((snapshot) => {
          const docData = [];
          snapshot.forEach((doc) => docData.push(doc.data()));
          resolve(docData);
        })
        .catch((err) => {
          console.log(err);
          resolve([]);
        });
    });

    setCachedScores(queryData);
  }, []);

  /* Used to cached the leaderboards for each level */
  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  const ctxValues = {
    getTopTenScoreboard,
    getLvlChars,
    submitResult,
    cachedScores,
    validateCharacterLevel,
  };

  return (
    <GameContext.Provider value={ctxValues}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
export { GameContext };
