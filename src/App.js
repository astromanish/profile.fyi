import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import NavBar from './NavBar';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <NavBar cartItemsCount={cart.length} />
      <Routes>
        <Route path="/" element={<ProductListingPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
