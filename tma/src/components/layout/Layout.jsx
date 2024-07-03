// Layout.js
import { useState } from 'react'
import { Outlet, useNavigate, useLocation  } from 'react-router-dom';

import { IconContext } from "react-icons";
import {  CiCircleChevLeft } from "react-icons/ci";


import './Layout.scss'

function Layout() {

    let navigate  = useNavigate();
    const location = useLocation();  

    const back = () => navigate("/");

    const [isShow, setIsShow] = useState(false)

    const showMenu = () => {
        setIsShow(!isShow);
    };


  return (
    <>

        {isShow?"":""}

        {location.pathname!="/"?
        <IconContext.Provider value={{ size: 45 }}>
            <div className='top-buttons'>
              <div onClick={back}><CiCircleChevLeft /></div>
            </div>
        </IconContext.Provider>
        :""}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;