// src/components/SurveySmoking.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySmoking.css';

const SurveySmoking = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNextClick = () => {
    if (selectedOption) {
      navigate('/next-survey-page'); // 다음 페이지 경로로 변경
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-smoking">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 흡연을 하시나요?</h1>
      <div className="button-container">
        <button 
          className={selectedOption === 'yes' ? 'selected' : ''}
          onClick={() => handleOptionClick('yes')}
        >
          네, 담배를 피워요
        </button>
        <button 
          className={selectedOption === 'no' ? 'selected' : ''}
          onClick={() => handleOptionClick('no')}
        >
          아니요, 담배를 안 피워요
        </button>
      </div>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveySmoking;
