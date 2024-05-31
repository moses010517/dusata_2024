import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchDetailScreen.css';

const MatchDetailScreen = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="match-detail-screen">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <img 
        src={`${process.env.PUBLIC_URL}/images/match/f11_monkey.png`} 
        alt="monkey" 
        className="match-monkey" 
      />
      <div className="memo" style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/match/match_bigpaper.png})`,
      }}>
        <div className="memo-text">
          안녕하세요 제이름은....<br />
          취미는.... 좋은 기회가 아니면 12345???? 되었으면 좋겠습니다!
        </div>
      </div>
      <button className="next-button">매칭하기</button>
    </div>
  );
};

export default MatchDetailScreen;
