import React,{useContext} from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Header = () => {
  const navigate = useNavigate();
  const {investorLoggedin,setInvestorLoggedin} = useContext(UserContext);

  return (
    <div>
        <header>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink className="nav-link" to="/main/home">
          Home
        </NavLink>
      </li>
     
    <li className="nav-item">
      <NavLink className="nav-link" to="/investor/investorchat">
        InvestorChat
      </NavLink>
    </li>
        </ul>
        {
            investorLoggedin ? 
            <button className='btn btn-primary' onClick={e => {
              setInvestorLoggedin(false);
              sessionStorage.removeItem('investor');
              navigate("/main/Investorlogin")
            }}> Logout</button>
            :
            <Link className="btn btn-link" to="/main/Investorlogin">Investor Login</Link>
          }
      </div>
    </div>
  </nav>
 
 
</header>
    </div>
  )
}

export default Header