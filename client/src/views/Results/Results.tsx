import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IResults, IRoundAnswers } from '../../context/types'
import { QuizContext } from '../../context/State'

import './results.scss'

type TTotal = {
  correct: number;
  incorrect: number;
  total: number;
}

const Results = () => {
  const navigate = useNavigate()

  const [total, setTotal] = useState<TTotal | null>(null)

  const { results } = useContext(QuizContext)

  useEffect(() => {
    if (!results) {
      navigate('/')
      return
    }
    if (hasRounds()) {
      const { answers: roundAnswers } = results
      let flattenedAnswers: boolean[] = []
      for (const roundAnswer of (roundAnswers as IRoundAnswers[])) {
        flattenedAnswers = [...flattenedAnswers, ...roundAnswer.answers]
      }
      const correctAnswers = (flattenedAnswers).filter((value: boolean) => value === true).length
      const incorrectAnswers = (flattenedAnswers).filter((value: boolean) => value === false).length
      const newTotal: TTotal = {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        total: flattenedAnswers.length
      }
      setTotal(newTotal)

    }
    else {
      const { answers } = results;
      const correctAnswers = (answers as boolean[]).filter((value: boolean) => value === true).length
      const incorrectAnswers = (answers as boolean[]).filter((value: boolean) => value === false).length
      const newTotal: TTotal = {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        total: answers.length
      }
      setTotal(newTotal)
    }
  }, [results, navigate])

  if (!results) return null

  const renderAnswer = (value: boolean, index: number) => {
    const answer = value ? 'CORRECT' : 'FALSE'
    return (
      <div key={crypto.randomUUID()} className="answer-slot">
        <div className='quesstion-no'>
          Q{index+1} 
        </div>
        <div className={`answer ${value? 'correct' : 'incorrect'}`} >
          <b>{answer}</b>
        </div>
      </div>
    )
  }

  const hasRounds = () => {
    return typeof results.answers[0] !== 'boolean'
  }

  return (
    <div className='results'>
      <header>
        <h3>{results.activityName}</h3>
        <h1>Results</h1>
      </header>
      <div className="answers-slot custom-scroll">
        <div className="answers custom-scroll">
        { (hasRounds()) ?
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
        <div className="answer-slot">
          <div className='quesstion-no'>
            <h3>Total: </h3>
          </div>
          <div className={`answer ${(total?.correct || 0) > (total?.incorrect || 0) ? 'correct' : 'incorrect'}`} >
            <h3>{total?.correct} / {total?.total}</h3>
          </div>
        </div>
        </div>
      </div>
      <footer>
            <Link to='/' ><h4>HOME</h4></Link>
      </footer>
    </div>
  )
}

export default Results