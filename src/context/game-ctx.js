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
  }, []);

  /* Function to validate a guess at where a character is on the image */
  const validateCharacterLevel = useCallback(async (lvl, charId, estLoc) => {
    /* 
      We'll go into the database and fetch the document with the id of "lvl" and fetch
      the values for "charId" along with the _imgSize to compare for the scaling math

      TODO: Or go for the pixel approach
    */

    const levelData = await getLvlInfo(lvl);

    const imgSizeRef = levelData["_imgSize"];
    const charRef = levelData[charId];
    let { topLeftCorner: cTLC, bottomRightCorner: cBRC } = charRef;

    const {
      topLeftCorner: eTLC,
      bottomRightCorner: eBRC,
      currImgWidth,
    } = estLoc;

    /* Scaling Corrections */
    // What we need to scale here is cTLC & cBRC
    const scaleRatio = currImgWidth / imgSizeRef;
    console.log("...Scaling corrections");

    /* Seeing if the estimated location is within the acceptable range */
    if (
      cTLC.x > eBRC.x || // Est. loc. box is left of actual box
      cBRC.x < eTLC.x || // Est. loc. box is right of actual box
      cBRC.y < eTLC.y || // Est. loc. box is above actual box
      cTLC.y > eBRC.y // Est. loc. box is below actual box
    ) {
      console.log("Character not within box");
      return false;
    }

    console.log("Character within box");
    return true;
  }, []);

  /* Used to cached the leaderboards for each level */
  useEffect(() => {
    const fetchScores = async () => {
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
    };

    fetchScores();
  }, []);

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
