import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
          <NavLink className="navbar-brand" to="/">
            The Crackin Krakens
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mint">
                  Mint
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/roadmap">
                  Roadmap
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
