import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutSix from "../../layouts/LayoutSix";
import TabProductSeven from "../../wrappers/product/TabProductSeven";
import Newsletter from "../../wrappers/newsletter/Newsletter";
import BannerTen from "../../wrappers/banner/BannerTen";
import HeroSliderThirteen from "../../wrappers/hero-slider/HeroSliderThirteen";

const HomeFashionFive = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutSix>
        {/* hero slider */}
        <HeroSliderThirteen />
        {/* banner */}
        <BannerTen spaceTopClass="pt-10" spaceBottomClass="pb-85" />
        {/* tab product */}
        <TabProductSeven
          spaceBottomClass="pb-100"
          category="accessories"
          containerClass="container-fluid"
          extraClass="hm4-section-padding"
        />
        {/* newsletter */}
        <Newsletter
          spaceBottomClass="pb-100"
          spaceLeftClass="pl-30"
          spaceRightClass="pr-30"
        />
      </LayoutSix>
    </Fragment>
  );
};

export default HomeFashionFive;
