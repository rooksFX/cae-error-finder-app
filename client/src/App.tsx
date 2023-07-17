import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios';
import { activities } from './utils/mockData';
import Home from './views/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Activity from './views/Activity/ActivityCard';
import Results from './views/Results/Results';
import { QuizProvider } from './context/State';

function App() {
  return (
    <div id='app'>
      <QuizProvider>
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path={`/activity/:activitiyID`} element={ <Activity />}/>
          <Route path={`/results`} element={ <Results />}/>
        </Routes>
      </QuizProvider>
    </div>
  )
}

export default App
