import React, { Fragment, useEffect } from "react";
import { Link, json, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitLoginAsync } from "../../store/slices/Auth-Action";
import { postRegistration } from "../../API";
import { useGoogleLogin } from "@react-oauth/google";
import { FacebookLoginButton } from "react-social-login-buttons";
import axios from "axios";
import { login } from "../../store/slices/Auth-slice";
import FacebookLogin from "react-facebook-login";
import { registerUserSSO } from "../../API";
import "./stylFb.css";

const LoginRegister = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [facebook, setFacebook] = useState();
  const [shouldRegister, setShouldRegister] = useState(false);
  const [google, setGoogle] = useState();
  const [error, setError] = useState(null);
  const [values, setvalues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    contactNumber: 0,
    businessName: "",
  });

  function handleMouseOver(e) {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName === "div" || tagName === "span") {
      e.currentTarget.style.background = "#ff6347"; // Use currentTarget to reference the <div> element
    }
  }
  
  function handleMouseOut(e) {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName === "div" || tagName === "span") {
      e.currentTarget.style.background = "#d34836"; // Use currentTarget to reference the <div> element
    }
  }
  

  const navigate = useNavigate();

  const SubmitRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await postRegistration("/customer", values);
      console.log("user registerd", result);
      window.location.reload();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const SubmitLogin = () => {
    dispatch(submitLoginAsync(values, navigate, setError));
  };

  let { pathname } = useLocation();

  useEffect(() => {
    if (shouldRegister) {
      let userData = {};
      if (google) {
        const firstName = google.data.given_name || "";
        const email = google.data.email || "";
        userData = {
          firstname: firstName,
          email: email,
          address: "",
          businessName: "",
          contactNumber: "",
          password: "",
          socialMedia: "google", // Add a field to indicate Google login
        };
      } else if (facebook) {
        const firstName = facebook?.name || "";
        const email = facebook?.email || "";
        userData = {
          firstname: firstName,
          email: email,
          address: "",
          businessName: "",
          contactNumber: "",
          password: "",
          socialMedia: "facebook", // Add a field to indicate Facebook login
        };
      }

      registerUserSSO(userData)
        .then((data) => {
          console.log(data);
          if (typeof data.token === "string" && typeof data.role === "string") {
            // Dispatch login action here
            dispatch(login({ token: data.token, role: data.role }));
            navigate("/");
          } else {
            console.error("Token or role is not a string");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setShouldRegister(false);
    }
  }, [shouldRegister, google, facebook, dispatch, navigate]);

  const loginsso = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer${response.access_token}`,
            },
          }
        );
        setGoogle(res);
        setShouldRegister(true);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const responseFacebook = (response) => {
    debugger;
    setFacebook(response);
    console.log(response);
    setShouldRegister(true);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />

        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form className="form" onSubmit={SubmitLogin}>
                              <p className="text-danger">
                                {" "}
                                {error === "Incorrect email" && error}
                              </p>
                              <div>
                                <input
                                  className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                  type="text"
                                  placeholder="email"
                                  onChange={(e) =>
                                    setvalues({
                                      ...values,
                                      email: e.target.value,
                                    })
                                  }
                                  name={values.email}
                                />
                              </div>
                              <input
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    password: e.target.value,
                                  })
                                }
                                name={values.password}
                              />
                              <p className="text-danger">
                                {" "}
                                {error === "Incorrect password" && error}
                              </p>

                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={SubmitLogin}
                                  >
                                    login
                                  </button>
                                </div>
                              </div>
                              <div className="mt-60 ">
                                <div
                                  className="m-auto"
                                  style={{ width: "60%" }}
                                >
                                  <FacebookLogin
                                    appId="1353052488720779"
                                    fields="name,email,picture"
                                    autoLoad={false}
                                    onClick={responseFacebook}
                                    callback={responseFacebook}
                                    cssClass="btnFacebook"
                                    icon={
                                      <i
                                        className="fa fa-facebook "
                                        style={{ marginRight: "10px" }}
                                      ></i>
                                    }
                                    textButton={
                                      <span className="mr-200">
                                        Continue with Facebook
                                      </span>
                                    }
                                  />
                                </div>
                                <div
                                  className="m-auto"
                                  style={{ width: "60%" }}
                                >
                                  <div
                                    className="btn"
                                    onClick={() => loginsso()}
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    style={{
                                      color: "white",
                                      width: "100%",
                                      background: "#d34836",
                                      borderRadius: "5px",
                                      marginLeft: "2px",
                                      fontSize: "20px",
                                      marginTop: "5px",
                                    }}
                                  >
                                    <span style={{ marginRight: "5px" }}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-brand-google-filled"
                                        width="25"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        strokeWidth="0.5"
                                        stroke="#ffffff"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path
                                          stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"
                                        />
                                        <path
                                          d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z"
                                          strokeWidth="0"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    <span style={{ marginRight: "30px" }}>
                                      Continue with Google
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form
                              className="form"
                              onSubmit={SubmitRegistration}
                            >
                              <input
                                required
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                type="text"
                                placeholder="firstname"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    firstname: e.target.value,
                                  })
                                }
                                name={values.firstname}
                              />
                              <input
                                required
                                type="text"
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="lastname"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    lastname: e.target.value,
                                  })
                                }
                                name={values.lastname}
                              />
                              <input
                                required
                                type="email"
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="email"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    email: e.target.value,
                                  })
                                }
                                name={values.email}
                              />
                              <input
                                required
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                type="password"
                                placeholder="password"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    password: e.target.value,
                                  })
                                }
                                name={values.password}
                              />
                              <input
                                required
                                type="text"
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="address"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    address: e.target.value,
                                  })
                                }
                                name={values.address}
                              />
                              <input
                                required
                                type="number"
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="contact"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    contactNumber: parseInt(e.target.value),
                                  })
                                }
                                name={values.contactNumber}
                              />
                              <input
                                required
                                className="form-control w-100 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                type="text"
                                placeholder="Bussinessname"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    businessName: e.target.value,
                                  })
                                }
                                name={values.businessName}
                              />
                              <button
                                required
                                type="button"
                                className="btn btn-success"
                                onClick={SubmitRegistration}
                              >
                                Register
                              </button>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
