import PropTypes from "prop-types";

import bannerData from "../../data/banner/banner-thirteen.json";
import BannerThirteenSingle from "../../components/banner/BannerThirteenSingle.js";

const BannerThirteen = ({ spaceBottomClass }) => {
  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="row no-gutters">
        {bannerData?.map((single, key) => (
          <div className="col-lg-6 col-md-6" key={key}>
            <BannerThirteenSingle
              data={single}
              spaceBottomClass="mb-30"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

BannerThirteen.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerThirteen;
