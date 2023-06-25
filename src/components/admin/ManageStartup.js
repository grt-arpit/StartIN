import React, { useEffect, useState } from "react";
import UpdateStartup from "./UpdateStartup";

const ManageStartup = () => {
  const [startupFormData, setStartupFormData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // for storing the user data
  const [startupArray, setStartupArray] = useState([]);

  // to track data loading
  const [loading, setLoading] = useState(true);

  

  const getDataFromBackend = () => {
    fetch("http://localhost:5000/startup/getall").then((res) => {
      if (res.status === 200) {
        console.log(" Start Up data fetched");
        res.json().then((data) => {
          console.log(data);
          setStartupArray(data);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  
  const deleteStartup = (id) => {
    console.log(id);

    fetch("http://localhost:5000/startup/delete/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        console.log("data deleted");
        getDataFromBackend();
      }
    });
  };

  const updateStartup = (startupdata) => {
    setShowUpdateForm(true);
    setStartupFormData(startupdata);
  };

  const displayStartup = () => {
    if (!loading) {
      return startupArray.map(({ _id, title, email, password, year }) => (
        <tr>
          <td>{title}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>
            <button className="btn btn-danger" onClick={(e) => deleteStartup(_id)}>
              <i class="fas fa-trash"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={e => updateStartup({_id, title, email, password})} >
              <i class="fas fa-pen"></i>
            </button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div class="row">
        <div className="col-md">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{displayStartup()}</tbody>
          </table>
        </div>
        {showUpdateForm ? <div className="col-md">{<UpdateStartup startupFormData={startupFormData}  fetchData = {getDataFromBackend} setShowUpdateForm={setShowUpdateForm} />}</div> : ""}
      </div>
    </div>
  );
};

export default ManageStartup ;