import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyLogin.css';

const SurveyLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const { setSurveyData } = useContext(SurveyContext);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      if (response.ok) {
        alert('인증번호가 전송되었습니다.');
      } else {
        alert('인증번호 전송에 실패했습니다.');
      }
    } catch (error) {
      alert('인증번호 전송 중 오류가 발생했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/phone-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber, verification_code: code }),
      });

      if (response.ok) {
        alert('인증번호가 확인되었습니다.');
        setSurveyData(prev => ({ ...prev, phone_number: phoneNumber }));
        navigate('/survey-name');
      } else {
        alert('인증번호 확인에 실패했습니다.');
      }
    } catch (error) {
      alert('인증번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="survey-login">
      <div className="survey-login-background" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/설문시작&로그인_1.png)` }} />
      <div className="phone-input-container">
        <span>+82 </span>
        <input
          type="text"
          placeholder="전화번호를 입력하세요"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button className="send-code-button" onClick={handleSendCode}>인증번호 전송</button>
      <div className="code-input-container">
        <input
          type="text"
          placeholder="인증번호 입력"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button className="verify-code-button" onClick={handleVerifyCode}>확인</button>
    </div>
  );
};

export default SurveyLogin;
