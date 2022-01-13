import levelOne from "./images/level_1_banner.png";
import levelTwo from "./images/level_2_banner.png";
import levelThree from "./images/level_3_banner.png";
import levelFour from "./images/level_4_banner.png";
import levelFive from "./images/level_5_banner.png";
import levelSix from "./images/level_6_banner.png";

const getBanner = (bannerLvlNum) => {
  switch (bannerLvlNum) {
    case 1:
      return levelOne;
    case 2:
      return levelTwo;
    case 3:
      return levelThree;
    case 4:
      return levelFour;
    case 5:
      return levelFive;
    case 6:
      return levelSix;
    default:
      return null;
  }
};

const numBanners = 6;

export default getBanner;
export { numBanners };
