import React, { useEffect, useState } from "react";
import UpdateInvestor from "./UpdateInvestor";

const ManageInvestor = () => {
  const [investorFormData, setinvestorFormData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // for storing the user data
  const [investorArray, setInvestorArray] = useState([]);

  // to track data loading
  const [loading, setLoading] = useState(true);

  
  const getDataFromBackend = () => {
    fetch("http://localhost:5000/investor/getall").then((res) => {
      if (res.status === 200) {
        console.log("data fetched");
        res.json().then((data) => {
          console.log(data);
          setInvestorArray(data);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  // const displayData = () => {
  //   if(!loading){
  //     return nums.map( (n) => (
  //       <div className="card mt-4 bg-warning">
  //         <div className="card-body">
  //           <h1>{n}</h1>
  //           </div>
  //       </div>
  //     ) )
  //   }
  // }

  const deleteInvestor = (id) => {
    console.log(id);

    fetch("http://localhost:5000/investor/delete/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        console.log("data deleted");
        getDataFromBackend();
      }
    });
  };

  const updateInvestor = (investordata) => {
    setShowUpdateForm(true);
    setinvestorFormData(investordata);
  };

  const displayInvestors = () => {
    if (!loading) {
      return investorArray.map(({ _id, fname, lname, email, password }) => (
        <tr>
          <td>{fname +" "+lname}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>
            <button className="btn btn-danger" onClick={(e) => deleteInvestor(_id)}>
              <i class="fas fa-trash"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={e => updateInvestor({_id, fname, lname, email, password})} >
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
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{displayInvestors()}</tbody>
          </table>
        </div>
        {showUpdateForm ? <div className="col-md">{<UpdateInvestor investorFormData={investorFormData}  fetchData = {getDataFromBackend} setShowUpdateForm={setShowUpdateForm} />}</div> : ""}
      </div>
    </div>
  );
};

export default ManageInvestor;