import { BrowserRouter, Route, Routes } from "react-router-dom";
import BottomNavBar from "./BottomNavbar";
import Cart from "./Cart";
import Category from "./Category";
import Home from "./Home";
import Navbar from "./Navbar";
import Product from "./Product";
import SearchResults from "./SearchResults";



function App() {
  return (
    <div className="App">
    <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/searchresults/:slug" element={ <SearchResults />} />
            <Route path="/category/:slug" element={ <Category />} />
            <Route path="/product/:slug" element={ <Product />} />
            <Route path="/cart" element={ <Cart />} />
          </Routes>
          <BottomNavBar/>
    </BrowserRouter>
    </div>
  );
}

export default App;

