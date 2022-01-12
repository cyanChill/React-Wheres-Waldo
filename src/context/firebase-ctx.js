import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

/* Firebase Stuff */
firebase.initializeApp({
  apiKey: "AIzaSyCNTqqi0LpjoE4ncpLokHdixCR96wXXJBw",
  authDomain: "the-odin-project-31cd8.firebaseapp.com",
  projectId: "the-odin-project-31cd8",
  storageBucket: "the-odin-project-31cd8.appspot.com",
  messagingSenderId: "399134823311",
  appId: "1:399134823311:web:9278f1813af4b6e199b1fa",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

/* Context Stuff */
const FirebaseContext = React.createContext({
  auth: null,
  firestore: null,
  newGame: (lvl, charId, estLoc) => {},
});

const FirebaseContextProvider = (props) => {
  const [dbScoreRef, setDBScoreRef] = useState(null);
  const [cachedScores, setCachedScores] = useState([]);

  // This should only trigger when we go onto the game page and click "start"
  const newGame = useCallback((lvl) => {
    /* 
        Check if the dbScoreRef is filled out completely -- ie: has an end time
           --> If it doesn't, delete the document from the database
    */

    // Afterwards: replace dbScoreRef with a new id and create a document in the db
    setDBScoreRef(uuidv4());
  }, []);

  const validateCharacterLevel = useCallback(async (lvl, charId, estLoc) => {
    /* 
      We'll go into the database and fetch the document with the id of "lvl" and fetch
      the values for "charId" along with the _imgSize to compare for the scaling math

      TODO: Also prevent users from inputting a pre-existing dbScoreRef id to try and override previous scores

      TODO: Or go for the pixel approach
    */
    const levelRef = firestore.collection("wheres-waldo-locations").doc(lvl);
    const levelData = await new Promise((resolve, reject) => {
      levelRef.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          resolve(null);
        }
      });
    });

    const imgSizeRef = levelData["_imgSize"];
    const charRef = levelData[charId];
    let { topLeftCorner: cTLC, bottomRightCorner: cBRC } = charRef;

    const {
      topLeftCorner: eTLC,
      bottomRightCorner: eBRC,
      currImgSize,
    } = estLoc;

    /* Scaling Corrections */
    // What we need to scale here is cTLC & cBRC
    const scaleRatio = currImgSize / imgSizeRef;
    console.log("...Scaling corrections");

    /* Seeing if the estimated location is within the acceptable range */
    if (
      cTLC.x > eBRC.x || // Est. loc. box is left of actual box
      cBRC.x < eTLC.x || // Est. loc. box is right of actual box
      cBRC.y < eTLC.y || // Est. loc. box is above actual box
      cTLC.y > eBRC.y // Est. loc. box is below actual box
    ) {
      console.log("Character not within box");
      return { correct: false };
    }

    console.log("Character within box");
    return { correct: true };
  }, []);

  const getTopTenScoreboard = useCallback(
    (lvl) => {
      return cachedScores
        .filter((score) => score.levelId === lvl)
        .sort((a, b) => a.runTime - b.runTime)
        .splice(0, 10);
    },
    [cachedScores]
  );

  const removeIncompleteDoc = useCallback(async () => {
    const docRef = firestore
      .collection("wheres-waldo-leaderboard")
      .doc(dbScoreRef);

    docRef.get().then((doc) => {
      if (doc.exists) {
        if (!doc.name) {
          // If we don't have a value for the name property, we remove the document
          firestore
            .collection("wheres-waldo-leaderboard")
            .doc(dbScoreRef)
            .delete()
            .then(() => console.log("Successfully deleted incomplete document"))
            .catch((err) =>
              console.log("Failed to delete incomplete document")
            );
        }
      }
    });
  }, [dbScoreRef]);

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

  const providerValues = {
    auth,
    firestore,
    newGame,
    getTopTenScoreboard,
    validateCharacterLevel,
    removeIncompleteDoc,
  };

  return (
    <FirebaseContext.Provider value={providerValues}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
export { FirebaseContext };
