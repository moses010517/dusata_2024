// src/components/SurveyStudentInfo.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyStudentInfo.css';

const SurveyStudentInfo = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/survey-gender');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-studentinfo">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 학과와 학번을 알려주세요</h1>
      <div className="input-container">
        <input type="text" placeholder="학과입력" />
      </div>
      <div className="input-container">
        <input type="text" placeholder="학번입력" />
      </div>
      <p>학과와 학번을 정확하게 기입해주세요</p>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyStudentInfo;
