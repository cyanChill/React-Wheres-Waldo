import levelOne from "./images/level_1_banner.png";
import levelTwo from "./images/level_2_banner.png";

const getBanner = (bannerLvlNum) => {
  switch (bannerLvlNum) {
    case 1:
      return levelOne;
    case 2:
      return levelTwo;
    default:
      return null;
  }
};

const numBanners = 2;

export default getBanner;
export { numBanners };
