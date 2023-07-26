import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IResults, IRoundAnswers, TTotal } from '../../context/types';

import './result.scss'

const Result = ({ result } : { result: IResults }) => {
  const navigate = useNavigate();

  const [total, setTotal] = useState<TTotal | null>(null)

  useEffect(() => {
    if (hasRounds()) {
      const { answers: roundAnswers } = result;
      let flattenedAnswers: boolean[] = [];
      for (const roundAnswer of (roundAnswers as IRoundAnswers[])) {
        flattenedAnswers = [...flattenedAnswers, ...roundAnswer.answers]
      }
      const correctAnswers = (flattenedAnswers).filter((value: boolean) => value === true).length;
      const incorrectAnswers = (flattenedAnswers).filter((value: boolean) => value === false).length;
      const newTotal: TTotal = {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        total: flattenedAnswers.length
      }
      setTotal(newTotal);

    }
    else {
      const { answers } = result;
      const correctAnswers = (answers as boolean[]).filter((value: boolean) => value === true).length;
      const incorrectAnswers = (answers as boolean[]).filter((value: boolean) => value === false).length;
      const newTotal: TTotal = {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        total: answers.length
      }
      setTotal(newTotal);
    }
  }, [result, navigate])

  if (!result) return null;

  const renderAnswer = (value: boolean, index: number) => {
    const answer = value ? 'CORRECT' : 'FALSE';
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
    return typeof result.answers[0] !== 'boolean'
  }

  return (
    <div className='result'>
      <div className="answers-slot custom-scroll">
        <div className="answers custom-scroll">
        <div className='round'><h3>{result.activityName}</h3></div>
        { (hasRounds()) ?
          (result.answers as IRoundAnswers[]).map((answer) => (
            <div key={crypto.randomUUID()}  className='rounds-slot'>
              <div className='round'>ROUND {answer.order}</div>
              {
                answer.answers.map((value, index) => renderAnswer(value, index))
              }
            </div>
          ))
          :
          (result.answers as boolean[]).map((answer, index) => renderAnswer(answer, index))
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
      </footer>
    </div>
  )
}

export default Result