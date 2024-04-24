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
import { GoogleLogin , useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { login } from "../../store/slices/Auth-slice";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
// import { useGoogleLogin } from "@react-oauth/google";

const LoginRegister = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [shouldRegister, setShouldRegister] = useState(false);
  const [decode, setdecode] = useState();
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
    // Check if registration should occur
    if (shouldRegister) {
      const registerUser = async (firstName, email) => {
        try {
          const userData = {
            firstname: firstName,
            email: email,
            address: "",
            businessName: "",
            contactNumber: "",
            password: "",
          };

          const response = await fetch(
            "http://localhost:5001/api/user/register/sso",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          // Handle error
          return { error: "Something went wrong" };
        }
      };

      const firstName = decode?.given_name || "";
      const email = decode?.email || "";

      registerUser(firstName, email)
        .then((data) => {
          console.log(data);
          if (typeof data.token === "string" && typeof data.role === "string") {
            dispatch(login({ token: data.token, role: data.role }));
            navigate("/");
          } else {
            console.error("Token or role is not a string");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // Reset the state variable to false after registration
      setShouldRegister(false);
    }
  }, [shouldRegister, decode]);

  // const loginSSO = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   flow: "auth-code",
  // });
  
  // const loginSSO = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
    
  // });
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

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
                              <div className="mt-60">
                                <LoginSocialFacebook
                                  appId="1601719023701531"
                                  onResolved={(response) => {
                                    console.log(response);
                                  }}
                                  onReject={(error) => {
                                    console.log(error);
                                  }}
                                >
                                  <FacebookLoginButton />
                                </LoginSocialFacebook>

                                {/* <GoogleLogin
                                  onSuccess={(credentialResponse) => {
                                    var decodeCredential = jwtDecode(
                                      credentialResponse.credential
                                    );
                                    // console.log(credentialResponse);
                                    setdecode(decodeCredential);
                                    console.log(decodeCredential);
                                    setShouldRegister(true);
                                  }}
                                  onError={() => {
                                    console.log("Login Failed");
                                  }}
                                /> */}


                                {/* <div className="btn btn-primary" onClick={() => login()}>Sign in with Google 🚀</div> */}

                                <button
                                className="d-flex justify-between"
                                  onClick={() => loginSSO()}
                                  style={{
                                    color: "white",
                                    width: "99%",
                                    background: "#d34836",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginLeft: "2px",
                                    fontSize: "20px",
                                  }}
                                >
                                  <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-google" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
</svg>
                                  </span>
                                  <span className="mx-2">

                                  Google
                                  </span>
                                </button>
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
