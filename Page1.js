import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Page1() {
  const [selectedDishes, setSelectedDishes] = useState({});
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const [dishesTotal, setDishesTotal] = useState(0);
  const [drinksTotal, setDrinksTotal] = useState(0);
  const [drinksCount, setDrinksCount] = useState(0);

  const menuItems = {
    "A": 10000,
    "B": 9000,
    "C": 8000,
    "D": 7000,
    "E": 6000,
    "F": 5000,
    "G": 4000,
  };

  const drinkItems = {
    "a": 350,
    "b": 200,
    "c": 100,
    "d": 300,
    "e": 400,
    "f": 700,
    "g": 600,
    "h": 500,
    "i": 500,
    "j": 200
  };

  const quantities = Array.from({ length: 51 }, (_, i) => i);

  const handleSelectDish = (name, price, quantity) => {
    const newSelectedDishes = { ...selectedDishes, [name]: { price, quantity } };
    setSelectedDishes(newSelectedDishes);

    const newDishesTotal = Object.values(newSelectedDishes).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setDishesTotal(newDishesTotal);
  };

  const handleSelectDrink = (name, price, quantity) => {
    const newSelectedDrinks = { ...selectedDrinks, [name]: { price, quantity } };
    setSelectedDrinks(newSelectedDrinks);

    const newDrinksTotal = Object.values(newSelectedDrinks).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setDrinksTotal(newDrinksTotal);

    const newDrinksCount = Object.values(newSelectedDrinks).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setDrinksCount(newDrinksCount);
  };

  const handleClear = () => {
    setSelectedDishes({});
    setSelectedDrinks({});
    setDishesTotal(0);
    setDrinksTotal(0);
    setDrinksCount(0);
  };


  return (
    <div className="App">

      <h1>施設1</h1>

      <div className="button-container">
        <Link to="/page2">
          <button className='toggle-button'>施設2に切り替え</button>
        </Link>
        <Link to="/">
          <button className="back-button">HomePageへ戻る</button>
        </Link>
      </div>

      <div className="menu-section">
        <h2>料理</h2>
        {Object.entries(menuItems).map(([name, price]) => (
          <div className="menu-item" key={name}>
            <div className="item-info">
              <span className="item-name">{name}</span>
              <span className="item-price">[{price.toLocaleString()}円]</span>
            </div>
            <select
              className="item-select"
              value={selectedDishes[name]?.quantity || 0}
              onChange={(e) =>
                handleSelectDish(name, price, parseInt(e.target.value) || 0)
              }
            >
              {quantities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <span className="item-total">
              {selectedDishes[name]?.quantity > 0
                ? `${(selectedDishes[name].price * selectedDishes[name].quantity).toLocaleString()}円`
                : null}
            </span>
          </div>
        ))}
      </div>

      <div className="menu-section">
        <h2>ドリンク</h2>
        {Object.entries(drinkItems).map(([name, price]) => (
          <div className="menu-item" key={name}>
            <div className="item-info">
              <span className="item-name">{name}</span>
              <span className="item-price">[{price.toLocaleString()}円]</span>
            </div>
            <select
              className="item-select"
              value={selectedDrinks[name]?.quantity || 0}
              onChange={(e) =>
                handleSelectDrink(name, price, parseInt(e.target.value) || 0)
              }
            >
              {quantities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <span className="item-total">
              {selectedDrinks[name]?.quantity > 0
                ? ` ${(selectedDrinks[name].price * selectedDrinks[name].quantity).toLocaleString()}円`
                : null}
            </span>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="totals">
          <h3 className="section-total">料理: {dishesTotal.toLocaleString()}円</h3>
          <h3 className="section-total">ドリンク: {drinksTotal.toLocaleString()}円 / {drinksCount}本</h3>
          <h2 className="grand-total">合計金額: {(dishesTotal + drinksTotal).toLocaleString()}円</h2>
        </div>
        <button className="clear-button" onClick={handleClear}>クリア</button>
      </div>
    </div>
  );
}

export default Page1;