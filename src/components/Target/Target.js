import classes from "./Target.module.css";

const Target = (props) => {
  const { show, center, characters, checkGuess } = props;

  const ddStyle = {
    left: `${center.x}px`,
    top: `${center.y}px`,
  };

  return (
    <div
      className={`${classes.targetContainer} ${show ? "" : classes.hide}`}
      style={ddStyle}
    >
      {characters
        .filter((char) => !char.found)
        .map((char) => (
          <div
            key={char.id}
            onClick={() => checkGuess(char.id)}
            className={classes["dropdown-btn"]}
          >
            <img src={char.image} alt={char.id} />
            <span>{char.id}</span>
          </div>
        ))}
    </div>
  );
};

export default Target;
