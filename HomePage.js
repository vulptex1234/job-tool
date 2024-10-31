import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Calc_webapp</h1>
        <div className="button-container">
          <Link to="/page1">
            <button className="home-button">施設1</button>
          </Link>
          <Link to="/page2">
            <button className="home-button">施設2</button>
          </Link>
        </div>

        <div className="button-container">
          <Link to="/page3">
            <button className="home-button">勤務時間</button>
          </Link>
          <Link to="/ShiftCreationPage">
            <button className="home-button">シフト表</button>
          </Link>
        </div>

        <div className="button-container">
          <Link to="/FacilityEquipmentPage">
            <button className="home-button">各施設情報</button>
          </Link>
          
        </div>

      </div>
    </div>
  );
}

export default HomePage;