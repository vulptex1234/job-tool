import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Page2() {
  const [selectedKasouDrinks, setSelectedKasouDrinks] = useState({});
  const [kasouDrinksTotal, setKasouDrinksTotal] = useState(0);
  const [kasouDrinksCount, setKasouDrinksCount] = useState(0);

  const kasoudrinkItems = {
    "a": 350,
    "b": 200,
    "c": 400,
    "d": 340,
    "e": 160,
    "f": 130,
  };

  const quantities = Array.from({ length: 51 }, (_, i) => i);

  const handleSelectKasouDrink = (name, price, quantity) => {
    const newSelectedKasouDrinks = { ...selectedKasouDrinks, [name]: { price, quantity } };
    setSelectedKasouDrinks(newSelectedKasouDrinks);

    const newKasouDrinksTotal = Object.values(newSelectedKasouDrinks).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setKasouDrinksTotal(newKasouDrinksTotal);

    const newKasouDrinksCount = Object.values(newSelectedKasouDrinks).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setKasouDrinksCount(newKasouDrinksCount);
  };

  const handleClear = () => {
    setSelectedKasouDrinks({});
    setKasouDrinksTotal(0);
    setKasouDrinksCount(0);
  };

  return (
    <div className="App">
      <h1>施設2</h1>

      <div className="button-container">
        <Link to="/page1">
          <button className='toggle-button'>施設1に切り替え</button>
        </Link>
        <Link to="/">
          <button className="back-button">HomePageへ戻る</button>
        </Link>
      </div>
      
      <div className="menu-section">
        <h2>ドリンク</h2>
        {Object.entries(kasoudrinkItems).map(([name, price]) => (
          <div className="menu-item" key={name}>
            <div className="item-info">
              <span className="item-name">{name}</span>
              <span className="item-price">[{price.toLocaleString()}円]</span>
            </div>
            <select
              className="item-select"
              value={selectedKasouDrinks[name]?.quantity || 0}
              onChange={(e) =>
                handleSelectKasouDrink(name, price, parseInt(e.target.value) || 0)
              }
            >
              {quantities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <span className="item-total">
              {selectedKasouDrinks[name]?.quantity > 0
                ? `${(selectedKasouDrinks[name].price * selectedKasouDrinks[name].quantity).toLocaleString()}円`
                : null}
            </span>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="totals">
          <h2 className="grand-total">合計金額: {kasouDrinksTotal.toLocaleString()}円 / {kasouDrinksCount}本</h2>
        </div>
        <button className="clear-button" onClick={handleClear}>クリア</button>
      </div>
    </div>
  );
}

export default Page2;