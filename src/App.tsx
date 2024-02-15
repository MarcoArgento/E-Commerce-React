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
  qty:number
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const[counter,setCounter] = useState<number>(0);
 

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
  function aggiungiCarello(productId: number) {
    const updatedProducts = products.map(product => {
      if (product.id === productId && product.qty > 0) {
        setCounter(counter + 1);
        return { ...product, qty: product.qty - 1 };
      }
      return product;
    });
  
    setProducts(updatedProducts);
  }
  

  return (
   <div id='container'>
    <div id='nav'>
      <div id='container-counter'><h1 id='text-count' style={counter === 0 ? {display:'none'}: {display:'flex'}}>{counter}</h1></div>
    <img id='img' src={require('./png-clipart-computer-icons-shopping-cart-shopping-cart-text-shopping-centre.png')}  alt="" />
      <h1>Shop</h1>
    </div>
    <div id='container-card'>

      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.thumbnail} alt="" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}  Qt:{product.qty}</p>
          <button onClick={() => aggiungiCarello(product.id)} disabled={product.qty === 0}>Aggiungi al carrello</button>
        </div>
      ))}
     </div>
  </div>
  );
}

export default App;
