import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QuizContext } from '../../context/State'

import './results.scss'
import Result from './Result'

const Results = () => {
  const navigate = useNavigate();

  const { results } = useContext(QuizContext);

  useEffect(() => {
    if (!results || !results.length) {
      navigate('/');
    }
    return;
  }, [results]);
  

  if (!results || !results.length) {
    return null;
  }

  return (
    <div className='results'>
      <h1>Results</h1>
      {results.map((result) => (<Result key={crypto.randomUUID()} result={result} />))}
      <footer>
        <Link to='/' ><h4>HOME</h4></Link>
      </footer>
    </div>
  )
}

export default Results