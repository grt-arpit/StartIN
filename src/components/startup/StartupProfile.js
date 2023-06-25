import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import profile from "../main/image/maj.jpg";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import app_config from "../../config";
const StartupProfile = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("startup"))
  );

  const api_url = app_config.api_url;
  const [file, setFile] = useState(api_url+'/'+currentUser.thumbnail);
  const [selFile, setSelFile] = useState("");

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("uploaded");
      }
    });
  }

  console.log(currentUser);
  const handleFormSubmit = (formdata) => {
    formdata.thumbnail = selFile;
    fetch(`${api_url}/startup/update/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Success 😀👌",
          text: "update successful",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: " error occured",
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="contact-box">
        <div className="contact-left">
          <marquee>
            <h3>Update Your Profile</h3>
          </marquee>
          <Formik initialValues={currentUser} onSubmit={handleFormSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="New Title"
                  sx={{ mt: 4 }}
                  id="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label=" Name"
                  sx={{ mt: 4 }}
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  sx={{ mt: 4 }}
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Password"
                  sx={{ mt: 4 }}
                  id="password"
                  type="text"
                  value={values.password}
                  onChange={handleChange}
                />
                <TextField
                  className="bg"
                  fullWidth
                  label="Phone No"
                  sx={{ mt: 4 }}
                  id="phone"
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="year"
                  sx={{ mt: 4 }}
                  type="text"
                  id="year"
                  value={values.year}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5 }}
                >
                  UPDATE
                </Button>
              </form>
            )}
          </Formik>
        </div>

        <div className="contact-right">
        <div className="d-flex justify-content-center">
        <img style={{ height: "200px", width: "500px" }} src={file} />
      </div>
      <div className="d-flex justify-content-center">
        <input type="file" onChange={handleChange} />
      </div>
          <hr></hr>
          <h3>StartUp Profile</h3>
          <table>
            <tr>
              <td>
                <h2>Title :</h2>
              </td>
              <td className="star">{currentUser.title}</td>
            </tr>
            <tr>
              <td>
                <h2>Name :</h2>
              </td>
              <td className="star">{currentUser.name}</td>
            </tr>

            <tr>
              <td>
                <h2>Email :</h2>
              </td>
              <td className="star">{currentUser.email}</td>
            </tr>
            <tr>
              <td>
                <h2>Year :</h2>
              </td>
              <td className="star">{currentUser.year}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
