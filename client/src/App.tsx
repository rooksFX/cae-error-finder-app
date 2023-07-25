import { Route, Routes } from 'react-router-dom'
import { QuizProvider } from './context/State'

import Home from './views/home'
import Activity from './views/activity'
import Results from './views/results'

import Error from './components/error'

import './App.scss'

function App() {
  return (
    <div id='app'>
      <QuizProvider>
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path={`/activity/:activitiyID`} element={ <Activity />}/>
          <Route path={`/results`} element={ <Results />}/>
          <Route path='/error' element={ <Error />}/>
          <Route path='*' element={ <Error />}/>
        </Routes>
      </QuizProvider>
    </div>
  )
}

export default App
