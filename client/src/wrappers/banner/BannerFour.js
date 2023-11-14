
import bannerData from "../../data/banner/banner-four.json";
import BannerFourSingle from "../../components/banner/BannerFourSingle.js";

const BannerFour = () => {
  return (
    <div className="banner-area bg-gray-2">
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerFourSingle
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

export default BannerFour;
