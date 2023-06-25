import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import app_config from "../../config";

function InvestorSignup() {
  const navigate = useNavigate();
  const api_url = app_config.api_url;
  const handleFormSubmit = (formdata) => {
    console.log("Form submitted!!");
    console.log(formdata);

    fetch(`${api_url}/investor/add`, {
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
          text: "signup Successful",
        });
        navigate("/main/Investorlogin");
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Invalid Credentials",
        });
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
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          contact: "",
          age: "",
          password: "",
          aadhar: "",
          createdAt: new Date(),
        }} //specifying initial value for form
        onSubmit={handleFormSubmit} // function to handle form submission
        // validationSchema={loginSchema}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
            <section className="vh-100" style={{ backgroundColor: "#ffff" }}>
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-12 col-xl-11">
                    <div
                      clastext-centersName="card text-black"
                      style={{ borderRadius: 25 }}
                    >
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p className=" h1 fw-bold mx-1 mx-md-4">
                              Investor Sign up
                            </p>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <TextField
                                fullWidth
                                label="First Name"
                                color="secondary"
                                id="fname"
                                value={values.fname}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <TextField
                                fullWidth
                                label="Last Name"
                                color="secondary"
                                id="lname"
                                value={values.lname}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <TextField
                                fullWidth
                                label="Contact"
                                color="secondary"
                                id="contact"
                                value={values.contact}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
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
                            <div className="d-flex flex-row align-items-center mb-4">
                              <TextField
                                fullWidth
                                label="Age"
                                color="secondary"
                                id="age"
                                value={values.age}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <TextField
                                fullWidth
                                label="Aadhar Number"
                                color="secondary"
                                id="aadhar"
                                value={values.aadhar}
                                onChange={handleChange}
                                focused
                              />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <TextField
                                fullWidth
                                label="Password"
                                color="secondary"
                                id="password"
                                value={values.paasword}
                                onChange={handleChange}
                                focused
                              />
                            </div>

                            <Button
                              variant="contained"
                              fullWidth
                              type="submit"
                              sx={{ mt: 1 }}
                              color="success"
                            >
                              Register
                            </Button>
                            <h5 className="text-center mt-4">
                              Already have an account?{" "}
                              <Link to="/main/Investorlogin">Login Here</Link>
                            </h5>
                          </div>
                          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                              className="img-fluid"
                              alt="Sample image"
                            />
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
}

export default InvestorSignup;
