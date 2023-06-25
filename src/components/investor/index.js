import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Investor = () => {
  return (
    <div>
       <Header />
       <Outlet />
    </div>
  )
}

export default Investor;