// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SurveyLogin from './components/SurveyLogin';
import SurveyName from './components/SurveyName';
import SurveyKakaoID from './components/SurveyKakaoID';
import SurveyStudentInfo from './components/SurveyStudentInfo';
import SurveyGender from './components/SurveyGender';
import SurveyInterest from './components/SurveyInterest';
import SurveyMBTI from './components/SurveyMBTI';
import SurveySmoking from './components/SurveySmoking';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/login" element={<SurveyLogin />} />
        <Route path="/survey" element={<SurveyLogin />} />
        <Route path="/survey-name" element={<SurveyName />} />
        <Route path="/survey-kakaoid" element={<SurveyKakaoID />} />
        <Route path="/survey-studentinfo" element={<SurveyStudentInfo />} />
        <Route path="/survey-gender" element={<SurveyGender />} />
        <Route path="/survey-interest" element={<SurveyInterest />} />
        <Route path="/survey-mbti" element={<SurveyMBTI />} />
        <Route path="/survey-smoking" element={<SurveySmoking />} />
      </Routes>
    </Router>
  );
};

export default App;
