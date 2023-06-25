import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import app_config from "../../config";

const StartupDetail = () => {
  const api_url = app_config.api_url;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("startup"))
  );
  const [startupDetail, setStartupDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [productList, setProductList] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const getDataFormBackend = async () => {
    const res = await fetch(`${api_url}/startup/getbyid/${id}`);
    const data = await res.json();
    setStartupDetail(data);
    setLoading(false);
  };

  const fetchProducts = () => {
    fetch(`${api_url}/product/getbystartup${id}`).then((res) => {
      if (res.status === 200) {
        console.log("data fetched");
        res.json().then((data) => {
          console.log(data);
          setProductList(data);
          setProductLoading(false);
        });
      }
    });
  }

  useEffect(() => {
    getDataFormBackend()
    fetchProducts()
  }, [])
  

  const displayProduct = () => {
    if (!productLoading) {
      return productList.map(({ _id, name, startup, description,image, video }) => (
        <div className="card bg-c-yellow order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">{productList.name}</h6>
                        <h2 className="text-right">
                          <i className="fa fa-refresh f-left" />
                          <span>486</span>
                        </h2>
                        <p className="m-b-0">
                          {productList.startup}<span className="f-right">anything</span>
                        </p>
                      </div>
                    </div>
      ));
    }
  };

  const displayDetails = () => {
    if (!loading) {
      return (
        <div className="team-single">
          <div className="row">
            <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
              <div className="">
                <img
                  src={api_url + "/" + startupDetail.thumbnail}
                  alt="xyz"
                  className="img-fluid"
                />
              </div>
              <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
                <h4 className="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">
                  {startupDetail.title}
                </h4>
                <p className="sm-width-95 sm-margin-auto">
                  {startupDetail.email}
                </p>
                <div className="margin-20px-top team-single-icons">
                  <ul className="no-margin">
                    <li>
                      <a href="javascript:void(0)">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="fab fa-google-plus-g" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="team-single-text padding-50px-left sm-no-padding-left">
                <div className="card bg-c-green order-card">
                  <div className="card-block">
                    <h4 className="font-size38 sm-font-size32 xs-font-size30">
                      Description
                    </h4>
                    <p className="no-margin-bottom">
                      {/* {currentUser.description} officia deserunt mollit anim id */}
                      est laborum. Sed ut perspiciatis unde omnis iste natus
                      error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore
                      veritatis et quasi architecto beatae vitae dicta sunt
                      explicabo. aut odit aut fugit, sed
                    </p>
                  </div>
                </div>

                <div className="contact-info-section margin-40px-tb">
                  <ul className="list-style9 no-margin">
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fa-solid fa-file-signature text-yellow" />
                          <strong className="margin-10px-left text-yellow">
                            Title
                          </strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>{startupDetail.title}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-envelope text-pink" />
                          <strong className="margin-10px-left xs-margin-four-left text-pink">
                            Email:
                          </strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>
                            <p>{startupDetail.email}</p>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-mobile-alt text-purple" />
                          <strong className="margin-10px-left xs-margin-four-left text-purple">
                            Phone:
                          </strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>{startupDetail.phone}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fa-solid fa-calendar-days text-lightred" />
                          <strong className="margin-10px-left text-lightred">
                            Started In:
                          </strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>{startupDetail.year}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-map-marker-alt text-green" />
                          <strong className="margin-10px-left text-green">
                            Address:
                          </strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>Digipodium Hazaratganj,Lucknow</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Button variant="contained" color="success">
              <Link to={"/investor/investorupchat/" + startupDetail._id}>
                Start chat
              </Link>
            </Button>
            <h4 className="font-size38 sm-font-size32 xs-font-size30 m-5">
              Our New Launch Products
            </h4>
            <div className="col-md-12">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-blue order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Product 1</h6>
                        <h2 className="text-right">
                          <i className="fa fa-cart-plus f-left" />
                          <span>486</span>
                        </h2>
                        <p className="m-b-0">
                          Product Title<span className="f-right">anything</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-green order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Product 2</h6>
                        <h2 className="text-right">
                          <i className="fa fa-rocket f-left" />
                          <span>486</span>
                        </h2>
                        <p className="m-b-0">
                          Product Title<span className="f-right">anything</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-yellow order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Product 3</h6>
                        <h2 className="text-right">
                          <i className="fa fa-refresh f-left" />
                          <span>486</span>
                        </h2>
                        <p className="m-b-0">
                          Product Title<span className="f-right">anything</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-pink order-card">
                      <div className="card-block">
                        <h6 className="m-b-20">Product 4</h6>
                        <h2 className="text-right">
                          <i className="fa fa-credit-card f-left" />
                          <span>486</span>
                        </h2>
                        <p className="m-b-0">
                          Product Title<span className="f-right">anything</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading ...</h1>;
    }
  };

  return <div className="mt-1">{displayDetails()}
  <div>{displayProduct()}</div>
  </div>;
};

export default StartupDetail;