import React from "react";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button} from '@mui/material';
import app_config from "../../config";
const ContactUs = () => {


  const handleFormSubmit = (formdata) => {
    console.log("Form submitted!!");
    console.log(formdata);

    fetch('http://localhost:5000/contact/add', {
      method: 'POST',
      body : JSON.stringify(formdata),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status === 200){
        Swal.fire({
          icon : 'success',
          title : 'Success',
          text : 'send Successful'
        })
        

      }else if(res.status === 300){
        Swal.fire({
          icon : 'error',
          title : 'Oops!!',
          text : 'Invalid Credentials'
        })
      }
    })
  };


  return (
    
    <div className="container">
      <h1>Connect with Us</h1>
      <p>
        I would Love To respond to your queries and help you. Feel free to get
        touch with me.
      </p>
      <div className="contact-box">
        <div className="contact-left">
          <h3>Send Your Request</h3>
          <Formik
                initialValues={{
                  name:"",
                  phone:"",
                  email:"",
                  subject:"",
                  message:"",
                   }}
                   onSubmit={handleFormSubmit}
                   >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Name" 
                id="name"
                value={values.name}
                onChange={handleChange}
                error={Boolean(errors.email) && touched.name}
                helperText={touched.name ? errors.name : ""}
              />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" placeholder="Phone Number" 
                id="phone"
                value={values.phone}
                onChange={handleChange}
                error={Boolean(errors.phone) && touched.phone}
                helperText={touched.phone ? errors.phone : ""}
              
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Email" 
                id="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email) && touched.email}
                helperText={touched.email ? errors.email : ""}
              
                />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input type="text" placeholder="product demo"
                id="subject"
                value={values.subject}
                onChange={handleChange}
                error={Boolean(errors.subject) && touched.subject}
                helperText={touched.subject ? errors.subject : ""}
              
                 />
              </div>
            </div>
            <label>Message</label>
            <textarea rows="5" placeholder="Your Message"
            id="message"
            value={values.message}
            onChange={handleChange}
            error={Boolean(errors.message) && touched.message}
            helperText={touched.message ? errors.message : ""}
          ></textarea>
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5 }}
                  >
                    SEND
                  </Button>
            </form>
            )}
            </Formik>
        </div>
        <div className="contact-right">
          <h3>Reach Us</h3>
           <table>
           <tr>
           <td>Email</td>
           <td>contactus@example.com</td>
           </tr>
           <tr>
           <td>Phone</td>
           <td>XXXXXXXXXX</td>
           </tr>
           <tr>
           <td>Address</td>
           <td>844334 lucknow mohaan road</td>
           </tr>
           </table>



        </div>
      </div>
    </div>
  );
};

export default ContactUs;
