import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import app_config from "../../config";

function StartupSignup() {
  const navigate = useNavigate();
  const api_url = app_config.api_url;
  const handleFormSubmit = (formdata) => {
    console.log("Form submitted!!");
    console.log(formdata);

    fetch(`${api_url}/startup/add`, {
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
        navigate("/main/startuplogin");
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
    <div className="mains">
      <div classNameName="sub-mains">
        <div>
          <div className="imgs"></div>
          <div>
            <Formik
              initialValues={{
                title: "",
                phone: "",
                name: "",
                email: "",
                password: "",
                year: "",
                teamInfo: Object,
                details: Array,
                createdAt: new Date(),
              }} //specifying initial value for form
              onSubmit={handleFormSubmit} // function to handle form submission
              // validationSchema={loginSchema}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <section className="h-100" style={{backgroundColor: "#C7DDCC"}}>
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                          <div className="card card-registration my-4">
                            <div className="row g-0">
                              <div className="col-xl-6 d-none d-xl-block">
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                  alt="Sample photo"
                                  className="img-fluid"
                                  style={{
                                    borderTopLeftRadius: ".25rem",
                                    borderBottomLeftRadius: ".25rem",
                                  }}
                                />
                              </div>
                              <div className="col-xl-6">
                                <div className="card-body p-md-5 text-black">
                                  <h3 className="mb-5 fw-bold text-uppercase text-center">
                                    Startup Signup Form
                                  </h3>
                                  <div className="row">
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        label="Startup Title"
                                        color="secondary"
                                        id="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        focused
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        label="Name"
                                        color="secondary"
                                        focused
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        label="Email Address"
                                        color="secondary"
                                        focused
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        label="Password"
                                        sx={{ mt: 2 }}
                                        color="secondary"
                                        focused
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        label="Starting Year"
                                        color="secondary"
                                        focused
                                        id="year"
                                        value={values.year}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        label="Phone Number"
                                        color="secondary"
                                        sx={{ mt: 2}}
                                        focused
                                        id="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    sx={{ mt: 5 }}
                                    color="success"
                                  >
                                    Register
                                  </Button>
                                  <h5 className="text-center mt-4">
                                    Already have an account?{" "}
                                    <Link to="/main/Startuplogin">
                                      Login Here
                                    </Link>
                                  </h5>
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
        </div>
      </div>
    </div>
  );
}

export default StartupSignup;
