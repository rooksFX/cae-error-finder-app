import './App.scss'
import Home from './views/Home';
import { Route, Routes } from 'react-router-dom';
import Activity from './views/Activity/';
import Results from './views/Results/';
import { QuizProvider } from './context/State';
import Error from './components/error';

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
