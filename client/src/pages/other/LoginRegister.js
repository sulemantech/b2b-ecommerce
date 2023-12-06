import React, { Fragment } from "react";
import { Link, json, useLocation } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [errors, setErrors] = useState();
  const [values,setvaluse]=useState({
    
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    address:"",
    contactNumber:"",
    businessName:""

  });
  const navigate = useNavigate();

  useEffect(() => {
    SubmitLogin();
    SubmitRegistration()
  
  }, []);
  
  const SubmitRegistration=(e)=>{
    //  e.preventDefault();
    fetch("http://localhost:5000/api/signin/register",{
      method:"post",
      headers:{
        accept:"application/json",
        "content-type":"application/json",
      },
      body:JSON.stringify(values),
    })
    .then((res)=>{
      res.json()
     .then((result)=>{
      console.log(result);
      setvaluse({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    address:"",
    contactNumber:"",
    businessName:""


      });

     }) ;
      // window.location.reload();

    })
      .catch((err)=>console.log(err));

  };


const SubmitLogin=()=>{
  // e.preventDefault();
  if (!values.firstname.trim()) {
    setErrors({ ...errors, firstname: "Firstname is required" });
    return;
  }

  if (!values.password.trim()) {
    setErrors({ ...errors, password: "Password is required" });
    return;
  }
  fetch("http://localhost:5000/api/signin/login",{
    method:"post",
    headers:{
      accept:"application/json",
      "content-type":"application/json",
    },
    body:JSON.stringify(values),
  })
  .then((res)=>{
    res.json()
   .then((result)=>{
    console.log(result.token);
    console.log("loginnnnnnnn",result);
    if (result.token) {
      navigate('/');
  }
  else{
    console.log(result.message);
  }
    setvaluse({
  firstname:"",
  password:"",
    });

   }) ;
    // window.location.reload();

  })
    .catch((err)=>console.log(err));

}




  let { pathname } = useLocation();

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
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Login Register", path: process.env.PUBLIC_URL + pathname }
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
                              <input
                                type="text"
                                placeholder="firstname"
                                onChange={(e)=>setvaluse({...values,firstname:e.target.value})}
                                name={values.firstname}
                              />
                              <input
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>setvaluse({...values,password:e.target.value})}
                                name={values.password}
                                
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <input
                                type="button"
                                className="btn btn-success"
                                 onClick={SubmitLogin}
                                value="Login"
                                />
                                
                                {/* <button type="submit">
                                  <span>Login</span>
                                </button> */}
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form   className="form" onSubmit={SubmitRegistration}>
                              <input
                                type="text"
                                placeholder="firstname"
                                onChange={(e) =>
                                  setvaluse({ ...values, firstname : e.target.value })
                                }
                                name={values.firstname}
                              />
                               <input
                                type="text"
                                placeholder="lastname"
                                onChange={(e)=>setvaluse({...values,lastname:e.target.value})}
                                name={values.lastname}
                                
                              />
                               <input
                                type="email"
                                placeholder="email"
                                onChange={(e)=>setvaluse({...values,email:e.target.value})}
                                name={values.email}
                              />
                               <input
                                type="password"
                                placeholder="password"
                                onChange={(e)=>setvaluse({...values,password:e.target.value})}
                                name={values.password}
                              />
                               <input
                                type="text"
                                placeholder="address"
                                 onChange={(e)=>setvaluse({...values,address:e.target.value})}
                                name={values.address}
                              />
                              <input
                                type="number"
                                placeholder="contact"
                                onChange={(e)=>setvaluse({...values,contactNumber:e.target.value})}
                                name={values.contactNumber}
                              />
                              <input
                               type="text"
                                placeholder="Bussinessname"
                                 onChange={(e)=>setvaluse({...values,businessName:e.target.value})}
                                name={values.businessName}
                              
                              />
                                <input
                                type="button"
                                className="btn btn-success"
                                 onClick={SubmitRegistration}
                                value="Register"
                                />
                              {/* <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                  
                                </button>
                              </div> */}
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
