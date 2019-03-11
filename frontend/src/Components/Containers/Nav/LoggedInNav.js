import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

  render() {
    return(
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-color">
          <a className="navbar-brand" href="/">Artsies</a>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <span className="nav-link">
                  <NavLink to="/">Home</NavLink>
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link">
                  <NavLink to="/about">About</NavLink>
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link">
                  <NavLink to="/support">Support</NavLink>
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link">
                  <NavLink to="/cart">Cart</NavLink>
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link">
                  <NavLink to="/addProduct">Add Product</NavLink>
                </span>
              </li>
            </ul>


            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link">
                  <NavLink to="/signout">Sign Out</NavLink>
                </span>
              </li>
            </ul>

          </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default Nav;