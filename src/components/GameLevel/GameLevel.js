import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { GameContext } from "../../context/game-ctx";
import customFilter from "../../utility/badwordFilter";

import GameNavbar from "./GameNavbar";
import Target from "../Target/Target";
import Button from "../FormElements/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../Modal/Modal";
import FormInput from "../FormElements/FormInput";

import classes from "./GameLevel.module.css";
import { numBanners as numLevels } from "../../assets/banner-imports";
import getCharImg from "../../assets/character-imports";
import level from "../../assets/images/level.jpg";
/* 
  Image Reference:
  https://www.reddit.com/r/wimmelbilder/comments/pxzhgz/day_at_the_beach_by_ste_pha_nie_included_a_list/
*/

const GameLevel = (props) => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { getLvlChars, submitResult, validateCharacterLevel } =
    useContext(GameContext);

  const boardRef = useRef();

  const [isValidLevel, setIsValidLevel] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [targetDown, setTargetDown] = useState(false);
  const [targetCenter, setTargetCenter] = useState({ x: null, y: null });

  const [characters, setCharacters] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [showSubmit, setShowSubmit] = useState(false);
  const [inputError, setInputError] = useState(false);
  const usernameRef = useRef();

  const [validScreenSize, setValidScreenSize] = useState(
    window.innerWidth >= 1200
  );

  const isValidScreenSize = useCallback(() => {
    return setValidScreenSize(window.innerWidth >= 1200);
  }, []);

  const targetDropHandler = (e) => {
    if (!targetDown) {
      const imgBoundingRect = e.target.getBoundingClientRect();
      const x = e.clientX - imgBoundingRect.left; // x position within element
      const y = e.clientY - imgBoundingRect.top; // y position within element

      setTargetCenter({ x, y });
      setTargetDown(true);
    } else {
      setTargetDown(false);
      setTargetCenter({ x: null, y: null });
    }
  };

  const handleGuessCheck = async (charId) => {
    const result = await validateCharacterLevel(levelId, charId, {
      currImgWidth: boardRef.current.getBoundingClientRect().width,
      currImgHeight: boardRef.current.getBoundingClientRect().height,
      topLeftCorner: {
        x: targetCenter.x - 2,
        y: targetCenter.y - 2,
      },
      bottomRightCorner: {
        x: targetCenter.x + 2,
        y: targetCenter.y + 2,
      },
    });

    if (result) {
      setCharacters((prevChar) =>
        prevChar.map((char) => {
          if (char.id === charId) {
            return { ...char, found: true };
          } else {
            return char;
          }
        })
      );
    }

    setTargetDown(false);
  };

  const handleSubmission = async () => {
    const username = usernameRef.current.value.trim();

    if (!username) {
      setInputError(true);
      return;
    }

    const levelNum = +levelId.split("level-")[1];
    const runTime = endTime - startTime;
    await submitResult(levelNum, runTime, customFilter.clean(username));

    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("resize", isValidScreenSize);

    return () => {
      window.removeEventListener("resize", isValidScreenSize);
    };
  }, [isValidScreenSize]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      const regex = /level-\d/;

      if (
        regex.test(levelId) && // Check correct path formatting
        +levelId.split("level-")[1] > 0 &&
        +levelId.split("level-")[1] <= numLevels &&
        !startTime
      ) {
        const lvlChars = await getLvlChars(levelId);
        setCharacters(
          lvlChars.characters.map((char) => ({
            id: char,
            found: false,
            image: getCharImg(char),
          }))
        );

        setStartTime(Date.now());
      } else {
        setIsValidLevel(false);
      }

      setIsLoading(false);
    };

    init();
  }, [levelId, getLvlChars]);

  useEffect(() => {
    if (characters.length > 0) {
      const foundAll = characters.every((char) => char.found);
      if (foundAll) {
        setEndTime(Date.now());
        setShowSubmit(true);
      }
    }
  }, [characters]);

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <LoadingSpinner overlay />
      </div>
    );
  }

  if (!isValidLevel) {
    return <Navigate to="/" />;
  }

  if (!validScreenSize) {
    return (
      <div className={classes.errorContainer}>
        <p>
          Sorry, but your current screen size is unoptimal for the game
          experience. This game requires a window size of atleast &ge; 1200px.
        </p>
        <Button onClick={() => navigate("/")}>Return to Home Page</Button>
      </div>
    );
  }

  return (
    <>
      {showSubmit && (
        <Modal
          title="Submit your score:"
          actions={
            <div className={classes["action-container"]}>
              <Button inverse onClick={() => navigate("/")}>
                Return Home
              </Button>
              <Button onClick={handleSubmission}>Submit</Button>
            </div>
          }
        >
          <p className={classes["win-msg"]}>
            Congratulations, you found all the characters in{" "}
            <span className={classes.bold}>
              {(endTime - startTime) / 1000} seconds
            </span>
            . You can submit a user name to save your record or return to the
            homepage without submitting your record.
          </p>
          <br />
          <FormInput
            label="Username:"
            type="text"
            vertical
            ref={usernameRef}
            error={inputError}
            errorMsg="Please enter a non-empty value"
          />
        </Modal>
      )}

      <div className={classes["game-container"]}>
        <GameNavbar characters={characters} />

        <div className={classes["img-container"]}>
          <img
            src={level}
            alt="Testing"
            onClick={targetDropHandler}
            draggable="false"
            ref={boardRef}
            className={classes.gameboard}
          />
          <Target
            show={targetDown}
            center={targetCenter}
            characters={characters}
            checkGuess={handleGuessCheck}
          />
        </div>
      </div>
    </>
  );
};

export default GameLevel;
