import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from "swiper";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { APIHost } from "../../API";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log('Window width:', width);
      setWindowWidth(width);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slides = product?.productImages.flatMap((productImage, i) =>
    productImage.images.map((img, j) => ({
      src: process.env.PUBLIC_URL + img,
      key: `${i}_${j}`,
    }))
  );

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      1200: {
        slidesPerView: 4,
        direction: "vertical",
      },
    },
  };

  const divStyle = {
    height: windowWidth < 1200 ? '100px' : '430px',
  };

  console.log('divStyle:', divStyle);

  return (
    <Fragment>
      <div className="row row-5 test">
        <div
          className={clsx(
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-9"
          )}
        >
          <div className="product-large-image-wrapper">
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            {product?.productImages?.length ? (
              <Swiper options={gallerySwiperParams}>
                {product.productImages.map((imageSet, key) => (
                  <SwiperSlide key={key}>
                    <button
                      className="lightgallery-button"
                      onClick={() => setIndex(key)}
                    >
                      <i className="pe-7s-expand1"></i>
                    </button>
                    <div className="single-image">
                      <img
                        src={`${APIHost}${imageSet.images}`}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="caption">
                      <p>{imageSet.caption}</p>
                    </div>
                  </SwiperSlide>
                ))}

                <AnotherLightbox
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                  slides={slides}
                  plugins={[Thumbnails, Zoom, Fullscreen]}
                />
              </Swiper>
            ) : (
              <div className="single-image">
                <img
                  className="img-fluid"
                  src="https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={clsx(
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-3"
          )}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb" style={divStyle}>
            {product?.productImages?.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {product?.productImages.map((single, key) => (
                  <SwiperSlide key={key}
                  style={{ 
                   
                    // paddingLeft: selectedImageIndex === key ? '1px' : 'none',
                    // paddingRight: selectedImageIndex === key ? '1px' : 'none',
                  }}
                  >
                    <div 
                      className="single-image" 
                      style={{ 
                        width: '100%', 
                        height: '100px', 
                        }}
                        onClick={() => setSelectedImageIndex(key)}
                        >
                      <img
                        src={`${APIHost}${single.images}`}
                        className="img-fluid"
                        style={{ width: '100%', height: '100%', objectFit: 'cover',
                        border: selectedImageIndex === key ? '1px solid black' : 'none',
                        borderRadius: selectedImageIndex === key ? '5px' : 'none',

                         }}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
        caption: PropTypes.string,
      })
    ),
    discount: PropTypes.string,
    new: PropTypes.bool,
  }),
  thumbPosition: PropTypes.string,
};

export default ProductImageGalleryLeftThumb;
