import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';


function App() {

  const [product, setProduct] = useState({
    name:'React from FB',
    price: 10,
    broductBy: 'facebook'
  })
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout stripeKey="" token="" name="Buy React" >
          <button className="btn-large green"> Buy React is just {product.price}$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
