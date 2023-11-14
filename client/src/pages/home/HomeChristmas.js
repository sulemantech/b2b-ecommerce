import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutNine from "../../layouts/LayoutNine";
import HeroSliderThirtyThree from "../../wrappers/hero-slider/HeroSliderThirtyThree";
import BannerThirtyTwo from "../../wrappers/banner/BannerThirtyTwo";
import TabProductEleven from "../../wrappers/product/TabProductEleven";
import CountDownSix from "../../wrappers/countdown/CountDownSix";
import TestimonialThree from "../../wrappers/testimonial/TestimonialThree";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";

const HomeChristmas = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Christmas Home"
        description="Christmas home of flone react minimalist eCommerce template."
      />
      <LayoutNine
        headerContainerClass="container-fluid"
        headerBorderStyle="fluid-border"
        headerPaddingClass="header-padding-2"
      >
        {/* hero slider */}
        <HeroSliderThirtyThree />
        {/* banner */}
        <BannerThirtyTwo spaceTopClass="pt-95" spaceBottomClass="pb-70" />
        {/* tab product */}
        {/* tab product */}
        <TabProductEleven
          category="christmas"
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          sectionTitle="Featured Products"
          bgColorClass="bg-gray-3"
          bgShape={true}
          colorClass="pro-puce-color"
        />
        {/* countdown */}
        <CountDownSix
          spaceTopClass="pt-95"
          spaceBottomClass="pb-95"
          dateTime="November 13, 2023 12:12:00"
          countDownImage="/assets/img/banner/deal-11.png"
        />
        {/* testimonial */}
        <TestimonialThree />
        {/* tab product */}
        <TabProductEleven
          category="christmas"
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          sectionTitle="Best Products"
          bgColorClass="bg-gray-3"
          bgShape={true}
          colorClass="pro-puce-color"
        />
        {/* newsletter */}
        <NewsletterThree
          spaceTopClass="pt-80"
          spaceBottomClass="pb-95"
          subscribeBtnClass="dark-red-subscribe"
        />
      </LayoutNine>
    </Fragment>
  );
};

export default HomeChristmas;
