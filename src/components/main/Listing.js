import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Listing() {
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataFromBackend = () => {
    fetch("http://localhost:5000/startup/getall").then((res) => {
      if (res.status === 200) {
        console.log("data fetched");
        res.json().then((data) => {
          console.log(data);
          setUserArray(data);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  const deleteComponent = (id) => {
    fetch("http://localhost:5000/startup/delete/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        console.log("data deleted");
        getDataFromBackend();
      }
    });
  };

  const displayComponents = () => {
    if (!loading) {
      return userArray.map(
        ({_id,  Startup, title, email, password, year, thumbnail, createdAt }) => (
          <div className="col-md-4 col-lg-4 mb-4 mb-lg-0">
            <div className="card mb-5">
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">{title}</p>
                <div
                  className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                  style={{ width: "35px", height: "35px" }}
                >
                  <p className="text-white mb-0 small">Startup</p>
                </div>
              </div>
              <img
                src={"http://localhost:5000/"+ thumbnail}
                className="card-img-top"
                alt="Startup"
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a href="#!" className="text-muted">
                      <h3> Startup</h3>
                    </a>
                  </p>
                  <p className="small">
                    <h4>{year}</h4>
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  
                  <h4 className="text-dark mb-0">{email}</h4>
                </div>
                <Link to={"/main/sdetail/"+_id}>View More</Link>

                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted mb-0">
                    <span className="fw-bold"></span>
                  </p>
                  <div className="ms-auto text-warning">
                    <i class="fa-solid fa-thumbs-up"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
  };

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">{displayComponents()}</div>
        </div>
      </section>
    </div>
  );
}

export default Listing;
