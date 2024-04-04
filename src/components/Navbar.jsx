import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <img src={logo} alt="Logo" />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/cart">
        <FontAwesomeIcon icon="fa-cart-shopping" />
      </NavLink>
    </div>
  );
}
