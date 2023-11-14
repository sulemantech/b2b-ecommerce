import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-seventeen.json";
import BannerSeventeenSingle from "../../components/banner/BannerSeventeenSingle.js";

const BannerSeventeen = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerSeventeenSingle
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

BannerSeventeen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerSeventeen;
