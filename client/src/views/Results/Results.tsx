import React, { useContext, useEffect } from 'react'
import { IRoundAnswers } from '../../context/types'
import { QuizContext } from '../../context/State'
import { Link, useNavigate } from 'react-router-dom'

import './results.scss'

const Results = () => {
  const navigate = useNavigate();

  const { results } = useContext(QuizContext);

  useEffect(() => {
    if (!results) navigate('/')
  }, [results, navigate])
  

  console.log('results: ', results);

  if (!results) return null;

  const renderAnswer = (value: boolean, index: number) => {
    const answer = value ? 'CORRECT' : 'FALSE';
    return (
      <div key={crypto.randomUUID()} className="answer">
        <div>
          Q{index+1} 
        </div>
        <div>
          <b>{answer}</b>
        </div>
      </div>
    )
  }

  return (
    <div className='results'>
      <div className="header">
        <h3>{results.activityName}</h3>
        <h1>Results</h1>
      </div>
      <div className="answers-slot">
        { (typeof results.answers[0] !== 'boolean') ?
          (results.answers as IRoundAnswers[]).map((answer) => (
            <div key={crypto.randomUUID()}  className='rounds-slot'>
              <div className='round'>ROUND {answer.order}</div>
              {
                answer.answers.map((value, index) => renderAnswer(value, index))
              }
            </div>
          ))
          :
          (results.answers as boolean[]).map((answer, index) => renderAnswer(answer, index))
        }
      </div>
      <div className="footer">
            <Link to='/' >HOME</Link>
      </div>
    </div>
  )
}

export default Results