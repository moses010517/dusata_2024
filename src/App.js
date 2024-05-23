// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SurveyLogin from './components/SurveyLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/login" element={<SurveyLogin />} />
        <Route path="/survey" element={<SurveyLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
