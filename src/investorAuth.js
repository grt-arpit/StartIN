import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const InvestorAuthorisor = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("investor"))
      );
      console.log(currentUser);

      if (currentUser === null) {
        Swal.fire({
          icon: "info",
          title: "OOops!!",
          text: "You need to be logged in",
        });
        return <Navigate to="/main/Investorlogin" />;
      }

      return children;
}

export default InvestorAuthorisor;