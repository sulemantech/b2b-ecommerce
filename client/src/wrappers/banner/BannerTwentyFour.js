import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-four.json";
import BannerTwentyFourSingle from "../../components/banner/BannerTwentyFourSingle.js";

const BannerTwentyFour = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerTwentyFourSingle
                data={single}
                spaceBottomClass="mb-30"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerTwentyFour;
