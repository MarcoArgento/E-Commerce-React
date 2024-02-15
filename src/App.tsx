import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';

interface Product {
  id: number;
  thumbnail:string;
  title: string;
  price: number;
  description: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
 

  useEffect(() => {
    async function getCard() {
      try {
        const response = await fetch("https://mockend.up.railway.app/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


    
    getCard();
  }, []); 

  return (
   <div id='container'>
    <div id='nav'>
    <img id='img' src={require('./png-clipart-computer-icons-shopping-cart-shopping-cart-text-shopping-centre.png')} alt="" />
      <h1>Shop</h1>
    </div>
    <div id='container-card'>

      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.thumbnail} alt="" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button>Aggiungi al carrello</button>
        </div>
      ))}
     </div>
  </div>
  );
}

export default App;
