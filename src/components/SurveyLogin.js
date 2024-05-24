// src/components/SurveyLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyLogin.css';

const SurveyLogin = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSendCode = () => {
    // 인증번호 전송 로직
    alert('인증번호가 전송되었습니다.');
  };

  const handleVerifyCode = () => {
    // 인증번호 확인 로직
    alert('인증번호가 확인되었습니다.');
    navigate('/survey-name');
  };

  return (
    <div className="survey-login">
      <div className="survey-login-background" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/설문시작&로그인_1.png)` }} />
      <div className="phone-input-container">
        <span>+82</span>
        <input
          type="text"
          placeholder="전화번호를 입력하세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
