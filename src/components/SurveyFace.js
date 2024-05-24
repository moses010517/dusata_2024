import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyFace.css';

const faceImages = [
  { id: 1, src: 'f1', selected: false },
  { id: 2, src: 'f2', selected: false },
  { id: 3, src: 'f3', selected: false },
  { id: 4, src: 'f4', selected: false },
  { id: 5, src: 'f5', selected: false },
  { id: 6, src: 'f6', selected: false },
  { id: 7, src: 'f7', selected: false },
  { id: 8, src: 'f8', selected: false },
  { id: 9, src: 'f9', selected: false },
  { id: 10, src: 'f10', selected: false },
  { id: 11, src: 'f11', selected: false }
];

const SurveyFace = () => {
  const [faces, setFaces] = useState(faceImages);
  const navigate = useNavigate();

  const handleFaceClick = (id) => {
    const updatedFaces = faces.map(face =>
      face.id === id ? { ...face, selected: true } : { ...face, selected: false }
    );
    setFaces(updatedFaces);
  };

  const handleNextClick = () => {
    const selectedFace = faces.find(face => face.selected);
    if (selectedFace) {
      navigate('/survey-intro'); // 다음 페이지 경로로 변경
    } else {
      alert('얼굴형을 선택해주세요');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-face">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 얼굴상을 선택해주세요</h1>
      <div className="face-container">
        {faces.map(face => (
          <div key={face.id} className="face-option" onClick={() => handleFaceClick(face.id)}>
            <img 
              src={`${process.env.PUBLIC_URL}/images/face/${face.src}_${face.selected ? '1' : '0'}.png`} 
              alt={`face ${face.id}`} 
              className="face-image"
            />
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyFace;
