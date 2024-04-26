import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import icons from "./helpers/icons";

import Products from "./components/pages/Products";
import Product from "./components/pages/Product";
import Contact from "./components/pages/Contact";
import NoPage from "./components/pages/NoPage";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/nav/Footer";

import "./styles/main.scss";

icons();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={"App " + (isDarkMode && "dark-mode")}>
      <BrowserRouter>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:id" component={Product} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/contact" component={Contact} />
          <Route path="/product" component={Product} />
          <Route component={NoPage} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
