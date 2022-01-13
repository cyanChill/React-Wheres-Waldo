// Level 1
import bee from "./images/bee.png";
import cheese from "./images/cheese.png";
import mushroom from "./images/mushroom.png";

// Level 2
import mangosteen from "./images/mangosteen.png";
import pineapple_plant from "./images/pineapple-plant.png";
import thicc_frog from "./images/thicc-frog.png";

const getCharImg = (characterName) => {
  switch (characterName) {
    case "bee":
      return bee;
    case "cheese":
      return cheese;
    case "mushroom":
      return mushroom;
    case "mangosteen":
      return mangosteen;
    case "pineapple-plant":
      return pineapple_plant;
    case "thicc-frog":
      return thicc_frog;
    default:
      return null;
  }
};

export default getCharImg;
