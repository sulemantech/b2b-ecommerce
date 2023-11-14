import PropTypes from "prop-types";
import clsx from "clsx"
import bannerData from "../../data/banner/banner-fifteen.json";
import BannerFifteenSingle from "../../components/banner/BannerFifteenSingle.js";

const BannerFifteen = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area banner-area-2", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="custom-row-2">
          {bannerData?.map((single, key) => (
            <div className="col-xl-4 col-md-6" key={key}>
              <BannerFifteenSingle
                spaceBottomClass="mb-10"
                data={single}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerFifteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerFifteen;
