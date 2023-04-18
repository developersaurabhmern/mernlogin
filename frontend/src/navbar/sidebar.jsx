import React from 'react';
import { NavLink} from "react-router-dom";
import { SlSpeedometer } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { TfiPackage } from "react-icons/tfi";




const Sidebar = () => {

  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <div className="logo">
        <h1 style={{color:"#fff"}}>Site Logo</h1>
        </div>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink activeClassName="active" to="/" className="nav-link ">
              <SlSpeedometer className="nav-icon" />
              <span className='pl-2'>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/users" className="nav-link ">
              <FiUser className="nav-icon" />
              <span className='pl-2'>Users</span>
            </NavLink>
          </li>
          

        </ul>

      </aside>

    </>
  );
}

export default Sidebar;