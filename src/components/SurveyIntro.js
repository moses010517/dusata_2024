import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyIntro.css';

const SurveyIntro = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/match-screen');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-intro">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 간단한 자기소개</h1>
      <div className="input-container">
        <textarea placeholder="자기소개 입력 (50자 이내로 간단히)" />
      </div>
      <p>간단한 자기소개를 해주세요. 성격, 가치관, 외모, 장점 등을 써주시면 좋아요</p>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyIntro;
