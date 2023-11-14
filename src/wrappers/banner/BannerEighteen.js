import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-eighteen.json";
import BannerEighteenSingle from "../../components/banner/BannerEighteenSingle.js";

const BannerEighteen = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area banner-area-2", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="custom-row-2">
          {bannerData?.map((single, key) => (
            <div className="col-xl-4 col-md-6" key={key}>
              <BannerEighteenSingle
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

BannerEighteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerEighteen;
