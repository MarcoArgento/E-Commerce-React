import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
  qty: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false); // Nuovo stato per la visualizzazione del carrello

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
    const productToAdd = products.find(product => product.id === productId && product.qty > 0);
    if (productToAdd) {
      setCart(prevCart => [...prevCart, productToAdd]);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, qty: product.qty - 1 } : product
        )
      );
    }
  }

  // Calcolo del prezzo totale del carrello
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div id='container'>
      <div id='nav'>
        <div id='container-counter'>
          <h1 id='text-count' style={{ display: cart.length === 0 ? 'none' : 'flex' }}>{cart.length}</h1>
        </div>
        <img id='img' src={require('./png-clipart-computer-icons-shopping-cart-shopping-cart-text-shopping-centre.png')} alt=""
          onClick={() => setShowCart(!showCart)} /> {/* Toggle dello stato showCart al clic sull'immagine */}
        <h1>Shop</h1>
      </div>
      <div id='container-card'>
        {showCart ? (
          cart.map(product => (
            <div key={product.id} className="card">
              <img src={product.thumbnail} alt="" />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          products.map(product => (
            <div key={product.id} className="card">
              <img src={product.thumbnail} alt="" />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}  Qt:{product.qty}</p>
              <button onClick={() => aggiungiCarello(product.id)} disabled={product.qty === 0}>Aggiungi al carrello</button>
            </div>
          ))
        )}
      </div>
      {showCart && (
        <div id="total-price">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default App;