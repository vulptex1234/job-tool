import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FacilityEquipmentPage.css';

const FacilityEquipmentPage = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const facilities = {
    '施設A': ['栓抜き', '醤油', 'グラス', 'トレンチ', 'ゲタ', 'カセットコンロ', 'パントリー: 1F/2F'],
    '施設B': ['栓抜き: 8本', '醤油', 'トレンチ: 4枚', 'カセットコンロ', 'パントリー: 1F'],
    '施設C': ['栓抜き: 7本', 'パントリー: 2F'],
    '施設D': ['カセットコンロ', 'パントリー: 2F'],
  };

  const handleFacilityClick = (facility) => {
    setSelectedFacility(selectedFacility === facility ? null : facility);
  };

  return (
    <div className="facility-page">
      <h1>施設の設備情報</h1>

      <div className="button-container">
        <Link to="/">
          <button className="back-button">HomePageへ戻る</button>
        </Link>
      </div>
      <div className="facility-list">
        <p>
          割り箸，紙おしぼり，布おしぼり，コースターは常備
        </p>
      </div>
      <div className="facility-list">
        {Object.keys(facilities).map((facility) => (
          <div key={facility} className="facility-item">
            <button className="facility-button" onClick={() => handleFacilityClick(facility)}>
              {facility}
            </button>
            {selectedFacility === facility && (
              <ul className="equipment-list">
                {facilities[facility].map((equipment, index) => (
                  <li key={index}>{equipment}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityEquipmentPage;