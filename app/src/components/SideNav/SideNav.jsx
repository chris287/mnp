import * as React from "react";
import { NavLink } from "react-router-dom";
import SearchInIcon from "../../assets/images/search-in.svg";
import SearchOutIcon from "../../assets/images/search-out.svg";
import DashboardIcon from "../../assets/images/dashboard.svg";
import "./style.scss";

const SideNav = () => {
  return (
    <>
      <nav className="main-menu">
        <ul>
          <li>
            <NavLink exact activeClassName="active" to="/">
              <i className="nav-icon">
                <img
                  src={DashboardIcon}
                  alt="Dashboard Menu Icon"
                  className="nav-menu-image"
                />
                <span className="info-text">Dashboard</span>
              </i>
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active" to="/searchin">
              <i className="nav-icon">
                <img
                  src={SearchInIcon}
                  alt="Search Port In Menu Icon"
                  className="nav-menu-image"
                />
                <span className="info-text">Port In</span>
              </i>
              <span className="nav-text">Search Port-In</span>
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active" to="searchout">
              <i className="nav-icon">
                <img
                  src={SearchOutIcon}
                  alt="Search Port Out Menu Icon"
                  className="nav-menu-image search-out"
                />
                <span className="info-text">Port-Out</span>
              </i>
              <span className="nav-text">Search Port Out</span>
            </NavLink>
          </li>
        </ul>

        <ul className="logout">
          <li>
            <a href="#">
              <i className="fa fa-cogs nav-icon"></i>
              <span className="nav-text">Settings</span>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="fa fa-right-from-bracket nav-icon"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* <div className="container">
          <div className="blob-c">
            <div className="shape-blob"></div>
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
            <div className="shape-blob three"></div>
            <div className="shape-blob four"></div>
            <div className="shape-blob five"></div>
            <div className="shape-blob six"></div>
          </div>
        </div> */}
    </>
  );
};

export default SideNav;
