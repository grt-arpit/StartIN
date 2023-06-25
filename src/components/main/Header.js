import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import logo from './image/logo.png'
 const Header = () => {

  const { startupLoggedin, setStartupLoggedin } = useContext(UserContext);

  return (
    <>
  
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Navbar brand */}
        <a className="navbar-brand" href="/main/home">
         <img src={logo} height="40"/>
        </a>
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Link */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/startuplogin">
                Startup Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/startupSignup">
                Startup SignUp
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/Investorlogin">
                Investor Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/InvestorSignup">
                Investor SignUp
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/manageinvestor">
               ManageInvestor
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/managestartup">
               ManageStartup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/listing">
              Listing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/startup/startupprofile">
              StartupProfile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/investor/investorProfile">
              InvestorProfile
              </NavLink>
            </li>
           
          
          </ul>
          {
            startupLoggedin ? 
            <button className='btn btn-primary' onClick={e => {
              setStartupLoggedin(false);
              sessionStorage.removeItem('startup');
              // navigate
            }}>Startup Logout</button>
            :
            <Link className="btn btn-link" to="/main/startuplogin">Startup Login</Link>
          }
         
        </div>
      </div>
      {/* Container wrapper */}
    </nav>
    {/* Navbar */}
  </>
  
  )
}

export default Header;