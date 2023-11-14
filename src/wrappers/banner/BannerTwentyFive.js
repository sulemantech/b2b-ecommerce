import clsx from "clsx";
import bannerData from "../../data/banner/banner-twenty-five.json";
import BannerTwentyFiveSingle from "../../components/banner/BannerTwentyFiveSingle.js";

const BannerTwentyFive = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area hm9-section-padding", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4" key={key}>
              <BannerTwentyFiveSingle
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

export default BannerTwentyFive;
