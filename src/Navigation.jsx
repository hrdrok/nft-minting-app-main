import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img class="logo fixed-left"
            src="lege.png"/>            
          </NavLink>
          <title class="nav container-fluid fixed-left h4" style= {{color:"#61892F"}}>
            The Crackin Krakens</title>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/roadmap">
                  Roadmap
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mint">
                  Mint
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Staking
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
