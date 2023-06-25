import { TextField, Button } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
// import "./Image.css"

const ResetPassword = () => {
  
  const navigate = useNavigate();

  const handleFormSubmit = (formdata) => {
    console.log("Form submitted!!");
    console.log(formdata);

    fetch('http://localhost:5000/user/authenticate', {
      method: 'POST',
      body : JSON.stringify(formdata),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status === 200){
        Swal.fire({
          icon : 'success',
          title : 'Success 😀👌',
          text : 'Login Successful'
        })
        res.json().then(data => {
          console.log(data);
          sessionStorage.setItem('user', JSON.stringify(data));
        })
        navigate("/Dashboard");
      }
      else if(res.status === 300){
        Swal.fire({
          icon : 'error',
          title : 'Oops!!',
          text : 'Invalid Credentials or You dont have an account Sing up now'
        })
       navigate("/Signup");
      }
    })

  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    New_password: Yup.string()
      .min(4, "Password should be longer than 4 characters")
      .required("Required"),
    password: Yup.string()
      .min(4, "Password should be longer than 4 characters")
      .required("Required"),
  });

  return (
    <div className="bgimg  img-fluid" style={{ height: "100vh" }}>
      <div className="row h-100 justify-content-center align-items-center">
        
        <div className="col-md-3">
          <div className="card">
           
              <img src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png" className="profile mt-3 m-auto"/>
            
            <div className="card-body">
              <h3 className="text-muted text-center">Reset Password</h3>
             
              <Formik
                initialValues={{ email: "", New_password: "", Confirm_Password:"",}} //specifying initial value for form
                 // function to handle form submission
                onSubmit={handleFormSubmit}
                validationSchema={loginSchema}
              >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      sx={{ mt: 3 }}
                      fullWidth
                      label="Email"
                      placeholder="Email Address"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(errors.email) && touched.email}
                      helperText={touched.email ? errors.email : ""}
                    />

                    <TextField
                      sx={{ mt: 3 }}
                      fullWidth
                      type="password"
                      label="New Password"
                      placeholder=" New Password"
                      id="New_password"
                      value={values.New_password}
                      onChange={handleChange}
                      error={Boolean(errors.New_password) && touched.New_password}
                      helperText={touched.New_password ? errors.New_password : ""}
                    />
                    
                    <TextField
                      sx={{ mt: 3 }}
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      id="Confirm_password"
                      value={values.Confirm_Password}
                      onChange={handleChange}
                      error={Boolean(errors.Confirm_password) && touched.Confirm_password}
                      helperText={touched.Confirm_password ? errors.Confirm_password : ""}
                    />
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 5 , mb:1, backgroundColor:"#054c79e6"}}
                    >
                      Reset Password
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;