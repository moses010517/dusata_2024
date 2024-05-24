// src/components/SurveyMbti.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyMBTI.css';

const SurveyMbti = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/survey-smoking');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-mbti">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. mbti를 알려주세요</h1>
      <div className="input-container">
        <input type="text" placeholder="mbti 입력" />
      </div>
      <p className="warning-text">영문자 소문자로 4글자만 입력해주세요<br/>ex) entp, intj, intp 등</p>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyMbti;
