import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchScreen.css';

const matchTexts = [
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!",
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!",
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!",
    "안녕하세요 제 이름은... \n취미는... 좋은 기회가 \n되었으면 좋겠습니다!"
];

const MatchScreen = () => {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/'); // 홈 화면으로 이동하도록 설정
    };

    return (
        <div className="match-screen">
            <img 
                src={`${process.env.PUBLIC_URL}/images/match/match_01.png`} 
                alt="match header" 
                className="match-header"
            />
            <div className="match-container">
                <div className="match-item">
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                        alt="paper"
                        className="match-paper"
                    />
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/f6_bear.png`} 
                        alt="bear"
                        className="match-face"
                    />
                    <div className="match-text">{matchTexts[0]}</div>
                </div>
                <div className="match-item">
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                        alt="paper"
                        className="match-paper"
                    />
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/f9_fox.png`} 
                        alt="fox"
                        className="match-face"
                    />
                    <div className="match-text">{matchTexts[1]}</div>
                </div>
                <div className="match-item">
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                        alt="paper"
                        className="match-paper"
                    />
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/f11_monkey.png`} 
                        alt="monkey"
                        className="match-face"
                    />
                    <div className="match-text">{matchTexts[2]}</div>
                </div>
                <div className="match-item">
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                        alt="paper"
                        className="match-paper"
                    />
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/match/f10_hamster.png`} 
                        alt="hamster"
                        className="match-face"
                    />
                    <div className="match-text">{matchTexts[3]}</div>
                </div>
            </div>
            <button className="cancel-button" onClick={handleCancelClick}>매칭 취소하기</button>
        </div>
    );
};

export default MatchScreen;
