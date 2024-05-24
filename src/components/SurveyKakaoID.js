// src/components/SurveyKakaoID.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyKakaoID.css';

const SurveyKakaoID = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/survey-studentinfo');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-kakaoid">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 카카오톡 아이디를 알려주세요</h1>
      <div className="input-container">
        <input type="text" placeholder="카카오톡ID입력" />
      </div>
      <p>카카오톡 아이디 검색허용을 확인해주세요</p>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyKakaoID;
