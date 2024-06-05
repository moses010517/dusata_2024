import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MatchScreen.css';

const MatchScreen = () => {
    const [userInfos, setUserInfos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 백엔드에서 데이터를 가져오는 함수
        const fetchUserInfos = async () => {
            try {
                const response = await axios.get('/api/matching/list'); // 백엔드 엔드포인트 '/api/matching/list'로 호출
                const data = response.data;
                setUserInfos(data);
            } catch (error) {
                console.error('Error fetching user infos:', error);
            }
        };

        fetchUserInfos();
    }, []);

    const handleCancelClick = () => {
        navigate('/'); // 홈 화면으로 이동하도록 설정
    };

    const handleMatchItemClick = (userInfo) => {
        navigate('/match-detail', { state: { userInfo } }); // 선택된 정보를 state로 전달
    };

    if (userInfos.length === 0) {
        return <div>Loading... 아직 매칭인원이 부족해요 나중에 다시 로그인해주세요!</div>; // 데이터를 로드하는 동안 표시되는 로딩 상태
    }

    // animal에 따른 이미지 매핑
    const animalImages = {
        "강아지상": '/images/match/f1_dog.png',
        "고양이상": '/images/match/f2_cat.png',
        "부엉이상": '/images/match/f3_bird.png',
        "사자상": '/images/match/f4_lion.png',
        "호랑이상": '/images/match/f5_tiger.png',
        "곰상": '/images/match/f6_bear.png',
        "토끼상": '/images/match/f7_rabbit.png',
        "늑대상": '/images/match/f8_wolf.png',
        "여우상": '/images/match/f9_fox.png',
        "햄스터상": '/images/match/f10_hamster.png',
        "원숭이상": '/images/match/f11_monkey.png'
    };

    return (
        <div className="match-screen">
            <img 
                src={`${process.env.PUBLIC_URL}/images/match/match_01.png`} 
                alt="match header" 
                className="match-header"
            />
            <div className="match-container">
                {userInfos.map((userInfo, index) => (
                    <div 
                        key={index} 
                        className="match-item" 
                        onClick={() => handleMatchItemClick(userInfo)}
                    >
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                            alt="paper"
                            className="match-paper"
                        />
                        <img 
                            src={`${process.env.PUBLIC_URL}${animalImages[userInfo.animal]}`} 
                            alt="face"
                            className="match-face"
                        />
                        <div className="match-text">{userInfo.introduce}</div>
                    </div>
                ))}
            </div>
            <button className="cancel-button" onClick={handleCancelClick}>매칭 취소하기</button>
        </div>
    );
};

export default MatchScreen;
