// Level 1
import bigfoot from "./images/bigfoot.png";
import cheese from "./images/cheese.png";
import rainbow_cake from "./images/rainbow_cake.png";

// Level 2
import mangosteen from "./images/mangosteen.png";
import pineapple_plant from "./images/pineapple-plant.png";
import thicc_frog from "./images/thicc-frog.png";

const getCharImg = (characterName) => {
  switch (characterName) {
    case "bigfoot":
      return bigfoot;
    case "cheese":
      return cheese;
    case "rainbow-cake":
      return rainbow_cake;
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
