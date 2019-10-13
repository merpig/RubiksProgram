import React from "react";
//import "./Nav.css";

const Navbar = props => (
  <nav className="navbar navbar-dark fixed-top bg-dark">
    <ul className="nav nav-justified mr-auto">
      <li className="nav-item">
        <p className="navbar-brand"><b>{props.title}</b></p>
      </li>
    </ul>
  </nav>
);

export default Navbar;
