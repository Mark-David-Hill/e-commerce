import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../components/CartProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="navbar-container">
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <div className="cart-button-wrapper">
        <NavLink to="/cart">
          <FontAwesomeIcon icon="fa-cart-shopping" />
        </NavLink>
        <p>{cartItems.length}</p>
      </div>
    </div>
  );
}
