// Level 1
import bigfoot from "./images/bigfoot.png";
import cheese from "./images/cheese.png";
import rainbow_cake from "./images/rainbow_cake.png";

// Level 2
import mangosteen from "./images/mangosteen.png";
import pineapple_plant from "./images/pineapple-plant.png";
import thicc_frog from "./images/thicc-frog.png";

// Level 3
import toaster from "./images/toaster.png";
import sad_clown from "./images/sad_clown.png";
import ghost from "./images/ghost.png";

// Level 4
import octopus from "./images/octopus.png";
import toilet from "./images/toilet.png";
import trident from "./images/trident.png";

// Level 5
import banana_bunch from "./images/banana_bunch.png";
import angry_bird from "./images/angry_bird.png";
import wizard from "./images/wizard.png";

// Level 6
import igloo from "./images/igloo.png";
import fishbowl from "./images/fishbowl.png";
import turtle from "./images/turtle.png";

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
    case "toaster":
      return toaster;
    case "sad-clown":
      return sad_clown;
    case "ghost":
      return ghost;
    case "octopus":
      return octopus;
    case "toilet":
      return toilet;
    case "trident":
      return trident;
    case "banana-bunch":
      return banana_bunch;
    case "angry-bird":
      return angry_bird;
    case "wizard":
      return wizard;
    case "igloo":
      return igloo;
    case "fishbowl":
      return fishbowl;
    case "turtle":
      return turtle;
    default:
      return null;
  }
};

export default getCharImg;
