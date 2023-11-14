import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutFive from "../../layouts/LayoutFive";
import HeroSliderTwelve from "../../wrappers/hero-slider/HeroSliderTwelve";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import ProductGridFiveContainer from "../../wrappers/product/ProductGridFiveContainer";

const HomeFashionFour = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutFive>
        {/* hero slider */}
        <HeroSliderTwelve />
        {/* product grid */}
        <ProductGridFiveContainer
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          category="accessories"
        />
        {/* newsletter */}
        <NewsletterTwo spaceBottomClass="pb-100" />
      </LayoutFive>
    </Fragment>
  );
};

export default HomeFashionFour;
