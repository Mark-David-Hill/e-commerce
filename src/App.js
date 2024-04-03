import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import icons from "./helpers/icons";

import Products from "./pages/Products";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import "./styles/main.scss";

icons();

function App() {
  return (
    <div className="App">
      <h1>This is the Website</h1>
      <BrowserRouter>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/contact" component={Contact} />
          <Route path="/product" component={Product} />
          <Route component={NoPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
