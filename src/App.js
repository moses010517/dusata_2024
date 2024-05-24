// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SurveyLogin from './components/SurveyLogin';
import SurveyName from './components/SurveyName';
import SurveyKakaoID from './components/SurveyKakaoID';
import SurveyStudentInfo from './components/SurveyStudentInfo';
import SurveyGender from './components/SurveyGender';

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
      </Routes>
    </Router>
  );
};

export default App;
