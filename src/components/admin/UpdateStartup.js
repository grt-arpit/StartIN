import { Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";

const UpdateStartup = ({startupFormData,fetchData,setShowUpdateForm}) => {
  const handleFormSubmit = (formdata) => {
    console.log(formdata);

    fetch("http://localhost:5000/startup/update/"+startupFormData._id, {
      method: "PUT",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Success",
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
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="text-muted text-center">Update Startup Details</h3>
          <Formik
            initialValues={startupFormData}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <label className="mt-4">Title</label>
                <input
                  className="form-control"
                  placeholder="Title"
                  value={values.title}
                  id="title"
                  onChange={handleChange}
                />
                <label className="mt-4">Email</label>
                <input
                  className="form-control"
                  placeholder="email"
                  value={values.email}
                  id="email"
                  onChange={handleChange}
                />
                <label className="mt-4">password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="password"
                  value={values.password}
                  id="password"
                  onChange={handleChange}
                />

                <button className="btn btn-primary mt-5" type="Submit">
                  Submit
                </button>
                <button className="btn btn-primary mt-5" type="button" onClick={e=>setShowUpdateForm(false)}>
                  cancle
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateStartup;
