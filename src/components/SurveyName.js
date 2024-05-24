// src/components/SurveyName.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyName.css';

const SurveyName = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/survey-kakaoid');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-name">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 이름을 알려주세요</h1>
      <div className="input-container">
        <input type="text" placeholder="이름입력" />
      </div>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyName;
