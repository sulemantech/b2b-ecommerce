import PropTypes from "prop-types";
import clsx from "clsx"
import bannerData from "../../data/banner/banner-sixteen.json";
import BannerSixteenSingle from "../../components/banner/BannerSixteenSingle.js";

const BannerSixteen = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="row no-gutters">
        {bannerData?.map((single, key) => (
          <div className="col-lg-6 col-md-6" key={key}>
            <BannerSixteenSingle
              data={single}
              spaceBottomClass="mb-30"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

BannerSixteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerSixteen;
