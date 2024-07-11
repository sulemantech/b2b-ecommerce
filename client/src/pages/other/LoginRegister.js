import React, { Fragment, useEffect } from "react";
import { Link, NavLink, json, useLocation } from "react-router-dom";
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
import axios from "axios";
import { login } from "../../store/slices/Auth-slice";
import { registerUserSSO } from "../../API";
import "./stylFb.css";
import fb from "../../image/fb.svg";
// import { BiHide } from "react-icons/bi";

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
      e.currentTarget.style.background = "azure"; // Use currentTarget to reference the <div> element
    }
  }

  function handleMouseOut(e) {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName === "div" || tagName === "span") {
      e.currentTarget.style.background = "#FFFFFF"; // Use currentTarget to reference the <div> element
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
        {/* <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        /> */}

        <div className="login-register-area  pb-100">
          <div className="container">
            <div className="row ">
              <div className="col-lg-5 col-md-7 col-11 ms-auto me-auto">
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
                              <di className="row p-20">
                                <div className="col-12">
                                  <p className="text-danger m-0">
                                    {" "}
                                    {error === "Incorrect email" && error}
                                  </p>

                                  <div className="">
                                    <input
                                      className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                      type="text"
                                      placeholder="Email"
                                      onChange={(e) =>
                                        setvalues({
                                          ...values,
                                          email: e.target.value,
                                        })
                                      }
                                      name={values.email}
                                    />
                                  </div>
                                  <p className="text-danger m-0">
                                    {" "}
                                    {error === "Incorrect password" && error}
                                  </p>
                                  <div className="position-relative">
                                    <input
                                      className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
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
                                    <img
                                      src={`${process.env.PUBLIC_URL}/icons8-blind-32.png`}
                                      alt="My Icon"
                                      className="position-absolute top-50 translate-middle-y end-0 me-3 p-1 rounded rounded-circle cursor-pointer icon-hover"
                                    />
                                  </div>
                                  <div className="button-box">
                                    <div className="login-toggle-btn pt-1">
                                      {/* <input type="checkbox" /> */}
                                      {/* <label className="ml-5">Remember me</label> */}
                                      <Link to={process.env.PUBLIC_URL + "/"}>
                                        <p className="mr-2">Forgot Password?</p>
                                      </Link>
                                    </div>
                                    <div className="m-auto">
                                      <button
                                        className="mt-10"
                                        type="button"
                                        onClick={SubmitLogin}
                                      >
                                        login
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-12"
                                  style={{ textAlign: "center" }}
                                >
                                  {/* <div >
                                    <span className="rounded-circl">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-key-off"
                                        width="50"
                                        height="90"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#000000"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path
                                          stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"
                                        />
                                        <path d="M10.17 6.159l2.316 -2.316a2.877 2.877 0 0 1 4.069 0l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.33 2.33" />
                                        <path d="M14.931 14.948a2.863 2.863 0 0 1 -1.486 -.79l-.301 -.302l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.863 2.863 0 0 1 -.794 -1.504" />
                                        <path d="M15 9h.01" />
                                        <path d="M3 3l18 18" />
                                      </svg>
                                    </span>
                                  </div> */}

                                  {/* <div className="mt-3 mb-2">
                                    <p>
                                      Don't have an account?
                                      <a className="purple-link" href="#">
                                        {" "}
                                        Register
                                      </a>
                                    </p>
                                  </div> */}

                                  <div className="d-flex mt-3 mb-2 justify-content-between">
                                    <hr
                                      style={{
                                        width: "50%",
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                      }}
                                    />
                                    <p className="mt-1 pl-1 pr-1">Or</p>
                                    <hr
                                      style={{
                                        width: "50%",
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                      }}
                                    />
                                  </div>

                                  <div>
                                    <div
                                      className="btn d-flex justify-content-center align-items-center text-center"
                                      onClick={() => loginsso()}
                                      onMouseOver={handleMouseOver}
                                      onMouseOut={handleMouseOut}
                                      style={{
                                        color: "#00000",
                                        width: "100%",
                                        background: "#FFFFFF",
                                        borderRadius: "10px",
                                        height: "50px",
                                        // fontFamily: "Helvetica",
                                        marginLeft: "2px",
                                        fontSize: "18px",
                                        // marginTop: "18px",
                                        padding: "10px",
                                        textAlign: "start",
                                      }}
                                    >
                                      <span style={{ marginRight: "15px" }}>
                                        <svg
                                          width="20"
                                          height="30"
                                          viewBox="0 0 52 51"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            width="50.3924"
                                            height="50.3924"
                                            transform="translate(0.829002 0.255676)"
                                            fill="white"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M49.2058 26.0002C49.2058 24.288 49.0521 22.6417 48.7668 21.0612H26.0253V30.4015H39.0204C38.4607 33.4198 36.7595 35.9771 34.2021 37.6893V43.7478H42.0058C46.5717 39.5442 49.2058 33.3539 49.2058 26.0002Z"
                                            fill="#4285F4"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.025 49.5975C32.5445 49.5975 38.0104 47.4353 42.0055 43.7475L34.2019 37.6889C32.0397 39.1377 29.2738 39.9938 26.025 39.9938C19.736 39.9938 14.4128 35.7462 12.514 30.0389H4.44695V36.295C8.42013 44.1865 16.586 49.5975 26.025 49.5975Z"
                                            fill="#34A853"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12.5143 30.0396C12.0314 28.5908 11.757 27.0433 11.757 25.4518C11.757 23.8603 12.0314 22.3128 12.5143 20.864V14.6079H4.44723C2.81186 17.8676 1.87894 21.5554 1.87894 25.4518C1.87894 29.3481 2.81186 33.0359 4.44723 36.2957L12.5143 30.0396Z"
                                            fill="#FBBC05"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.025 10.9088C29.5702 10.9088 32.7531 12.1271 35.2555 14.5198L42.1811 7.5942C37.9994 3.69786 32.5336 1.30517 26.025 1.30517C16.586 1.30517 8.42013 6.71615 4.44695 14.6076L12.514 20.8637C14.4128 15.1564 19.736 10.9088 26.025 10.9088Z"
                                            fill="#EA4335"
                                          />
                                        </svg>
                                      </span>
                                      <span
                                        style={{
                                          marginRight: "20px",
                                          fontSize: "16px",
                                        }}
                                      >
                                        Login with Google
                                      </span>
                                    </div>
                                    <div
                                      className="m-auto"
                                      style={{ width: "100%" }}
                                    ></div>
                                  </div>
                                </div>
                              </di>
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
                              <div className="d-flex gap-2">
                                <input
                                  required
                                  className="form-control w-50 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                  type="text"
                                  placeholder="First name"
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
                                  className="form-control w-50 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                  placeholder="Last name"
                                  onChange={(e) =>
                                    setvalues({
                                      ...values,
                                      lastname: e.target.value,
                                    })
                                  }
                                  name={values.lastname}
                                />
                              </div>
                              <input
                                required
                                type="email"
                                className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="Email"
                                onChange={(e) =>
                                  setvalues({
                                    ...values,
                                    email: e.target.value,
                                  })
                                }
                                name={values.email}
                              />
                              <div className="">
                                <input
                                  required
                                  className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
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
                                <div className="position-relative">
                                  <input
                                    required
                                    className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                    type="confirm password"
                                    placeholder="Confirm password"
                                    onChange={(e) =>
                                      setvalues({
                                        ...values,
                                        password: e.target.value,
                                      })
                                    }
                                    name={values.password}
                                  />
                                  <img
                                    src={`${process.env.PUBLIC_URL}/icons8-blind-32.png`}
                                    alt="My Icon"
                                    className="position-absolute top-50 translate-middle-y end-0 me-3 p-1 rounded rounded-circle cursor-pointer icon-hover"
                                  />
                                </div>
                              </div>
                              <input
                                required
                                type="text"
                                className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="Address"
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
                                type="text"
                                className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                placeholder="Contact"
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
                                className="form-control w-100 rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                type="text"
                                placeholder="Bussiness name"
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
                                className="btn btn-success w-100 mt-2"
                                onClick={SubmitRegistration}
                              >
                                Register
                              </button>
                            </form>
                            <div
                              className="col-12"
                              style={{ textAlign: "center" }}
                            >
                              {/* <div >
                                    <span className="rounded-circl">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-key-off"
                                        width="50"
                                        height="90"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#000000"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path
                                          stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"
                                        />
                                        <path d="M10.17 6.159l2.316 -2.316a2.877 2.877 0 0 1 4.069 0l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.33 2.33" />
                                        <path d="M14.931 14.948a2.863 2.863 0 0 1 -1.486 -.79l-.301 -.302l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.863 2.863 0 0 1 -.794 -1.504" />
                                        <path d="M15 9h.01" />
                                        <path d="M3 3l18 18" />
                                      </svg>
                                    </span>
                                  </div> */}

                              <div className="mt-3 mb-2">
                                <p>
                                  Already have an account?
                                  <Link
                                    className="purple-link"
                                    to="/login-register"
                                    eventKey="login"
                                  >
                                    {" "}
                                    Login
                                  </Link>
                                </p>
                              </div>
                            </div>
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
