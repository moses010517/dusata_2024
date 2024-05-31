// MatchScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchScreen.css';

const matchTexts = [
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!",
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!",
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!",
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!"
];

const faceImages = [
    '/images/match/f6_bear.png',
    '/images/match/f9_fox.png',
    '/images/match/f11_monkey.png',
    '/images/match/f10_hamster.png'
];



const MatchScreen = () => {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/'); // 홈 화면으로 이동하도록 설정
    };

    const handleMatchItemClick = () => {
        navigate('/match-detail'); // 모두 같은 페이지로 이동하도록 설정
    };

    return (
        <div className="match-screen">
            <img 
                src={`${process.env.PUBLIC_URL}/images/match/match_01.png`} 
                alt="match header" 
                className="match-header"
            />
            <div className="match-container">
                {matchTexts.map((text, index) => (
                    <div 
                        key={index} 
                        className="match-item" 
                        onClick={handleMatchItemClick}
                    >
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                            alt="paper"
                            className="match-paper"
                        />
                        <img 
                            src={`${process.env.PUBLIC_URL}${faceImages[index]}`} 
                            alt="face"
                            className="match-face"
                        />
                        <div className="match-text">{text}</div>
                    </div>
                ))}
            </div>
            <button className="cancel-button" onClick={handleCancelClick}>매칭 취소하기</button>
        </div>
    );
};

export default MatchScreen;
