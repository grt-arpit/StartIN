import { TextField, Button } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { UserContext } from "../../context/userContext";
import app_config from "../../config";

// import "./Image.css"

const StartupLogin = () => {
  const navigate = useNavigate();
  const api_url = app_config.api_url;
  const { startupLoggedin, setStartupLoggedin } = useContext(UserContext);

  const handleFormSubmit = (formdata) => {
    console.log("Form submitted!!");
    console.log(formdata);

    fetch(`${api_url}/startup/authenticate`, {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success 😀👌",
          text: "Login Successful",
        });
        res.json().then((data) => {
          console.log(data);
          sessionStorage.setItem("startup", JSON.stringify(data));
          setStartupLoggedin(true);
          navigate("/startup/startupprofile");
        });
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Invalid Credentials or You dont have an account Sing up now",
        });
        navigate("/main/Startupsignup");
      }
    });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(4, "Password should be longer than 4 characters")
      .required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }} //specifying initial value for form
        // function to handle form submission
        onSubmit={handleFormSubmit}
        validationSchema={loginSchema}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <section className="vh-100" style={{ backgroundColor: "#C7DDCC" }}>
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: "1rem" }}>
                      <div className="row g-0">
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                            alt="login form"
                            className="img-fluid"
                            style={{ borderRadius: "1rem 0 0 1rem" }}
                          />
                        </div>
                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                          <div className="card-body p-4 p-lg-5 text-black">
                            <div className="justify-content-center d-flex align-items-center mb-2 pb-1">
                              <span className=" h1 fw-bold mb-3">
                                StartUp Login
                              </span>
                            </div>

                            <div className="form-outline mb-4">
                              <TextField
                                fullWidth
                                label="Email Address"
                                color="secondary"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <div className="form-outline mb-4">
                              <TextField
                                fullWidth
                                label="Password"
                                color="secondary"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <Button
                              variant="contained"
                              fullWidth
                              type="submit"
                              sx={{ mt: 2 }}
                              color="success"
                            >
                              Login Here
                            </Button>
                            <h5 className="text-center mt-4">
                              Don't have an account?{" "}
                              <Link to="/main/Startupsignup">SignUp Here</Link>
                            </h5>
                            <hr className="my-3" />
                            <button
                              data-url="https://www.google.com/"
                              className="btn btn-lg btn-block btn-primary"
                              style={{ backgroundColor: "#dd4b39" }}
                              type="submit"
                            >
                              <i className="fab fa-google me-2" /> Sign in with
                              google
                            </button>
                            <button
                              className="btn btn-lg btn-block btn-primary mb-2"
                              style={{ backgroundColor: "#3b5998" }}
                              type="submit"
                            >
                              <i className="fab fa-facebook-f me-2" />
                              Sign in with facebook
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StartupLogin;
