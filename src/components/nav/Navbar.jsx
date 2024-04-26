import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

export default function Navbar(props) {
  const { cartItems } = useContext(CartContext);
  const { isDarkMode, setIsDarkMode } = props;

  return (
    <div className="navbar-container">
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      <div className="links-container">
        <div className="main-links">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="cart-button-wrapper">
          <NavLink to="/cart" style={{ textDecoration: "none" }}>
            <div className="cart-button">
              <FontAwesomeIcon icon="fa-cart-shopping" />
              <p>
                {
                  cartItems.filter((item) => {
                    return item.count > 0;
                  }).length
                }
              </p>
            </div>
          </NavLink>
        </div>
      </div>
      <div
        className="switch-wrapper"
        onClick={() => {
          setIsDarkMode((prev) => !prev);
        }}
      >
        <button>{isDarkMode ? "Light" : "Dark"}</button>
      </div>
    </div>
  );
}
