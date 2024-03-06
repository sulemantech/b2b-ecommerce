import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { STORE_NAME } from "../../../src/config";
import FooterNewsletter from "./FooterNewsletter";

const FooterCheckout = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 ">
          <div className="logo"  style={{marginTop:"0"}}>
            <h1 style={{ color: "#555252", opacity: "0.9",marginLeft:"10%" }}>{STORE_NAME}</h1>
            <p style={{ color: "#555252", opacity: "0.9",marginLeft:"10%" }}>
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://hasthemes.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Flone
              </a>
              .<br /> All Rights Reserved
            </p>

            <div className="footer-logo">
              <Link to={process.env.PUBLIC_URL + "/"}>
                <img alt="" src={process.env.PUBLIC_URL + footerLogo} />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="footer-title">
            <h3  style={{ color: "#555252", opacity: "0.9" ,marginLeft:"10%"}}>FOLLOW US</h3>
          </div>
          <div className="footer-list" style={{marginLeft:"10%" }}>
            <ul  style={{ color: "#555252", opacity: "0.9" }}>
              <li>
                <a
                  href="//www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="//www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="//www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="//www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4">
          <FooterNewsletter />
        </div>
      </div>
      </>
  );
};

FooterCheckout.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCheckout;
