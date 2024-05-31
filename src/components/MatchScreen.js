import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchScreen.css';

const MatchScreen = () => {
    const [userInfos, setUserInfos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 4개의 가짜 데이터 설정
        const fakeData = [
            {
                phone_number: "01012345678",
                user_name: "홍길동",
                user_kakao: "hong_gildong",
                major: "Computer Science",
                student_number: 20200101,
                gender: "male",
                hobby: "독서",
                mbti: "INTJ",
                smoke: false,
                animal: "강아지상",
                introduce: "안녕하세요, 홍길동입니다."
            },
            {
                phone_number: "01087654321",
                user_name: "김철수",
                user_kakao: "kim_cheolsu",
                major: "Mechanical Engineering",
                student_number: 20210101,
                gender: "male",
                hobby: "운동",
                mbti: "ENTP",
                smoke: true,
                animal: "고양이상",
                introduce: "반갑습니다, 김철수입니다."
            },
            {
                phone_number: "01011223344",
                user_name: "이영희",
                user_kakao: "lee_younghee",
                major: "Electrical Engineering",
                student_number: 20220101,
                gender: "female",
                hobby: "요리",
                mbti: "ISFJ",
                smoke: false,
                animal: "여우상",
                introduce: "안녕하세요, 이영희입니다."
            },
            {
                phone_number: "01055667788",
                user_name: "박지수",
                user_kakao: "park_jisoo",
                major: "Civil Engineering",
                student_number: 20230101,
                gender: "female",
                hobby: "음악 감상",
                mbti: "INFJ",
                smoke: false,
                animal: "곰상",
                introduce: "안녕하세요, 박지수입니다."
            }
        ];

        // 가짜 데이터를 상태로 설정
        setUserInfos(fakeData);

        /*
        // 백엔드 API 호출
        axios.get('/api/user-infos') // 백엔드 엔드포인트를 '/api/user-infos'로 가정
            .then(response => {
                const data = response.data;
                setUserInfos(data);
            })
            .catch(error => {
                console.error('Error fetching user infos:', error);
            });
        */
    }, []);

    const handleCancelClick = () => {
        navigate('/'); // 홈 화면으로 이동하도록 설정
    };

    const handleMatchItemClick = (userInfo) => {
        navigate('/match-detail', { state: { userInfo } }); // 선택된 정보를 state로 전달
    };

    if (userInfos.length === 0) {
        return <div>Loading...</div>; // 데이터를 로드하는 동안 표시되는 로딩 상태
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
