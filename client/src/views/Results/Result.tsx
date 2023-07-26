import { IResults, IRoundAnswers } from '../../context/types';

import './result.scss'

const Result = ({ result } : { result: IResults }) => {

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
          <div className={`answer ${(result.total?.correct || 0) > (result.total?.incorrect || 0) ? 'correct' : 'incorrect'}`} >
            <h3>{result.total?.correct} / {result.total?.total}</h3>
          </div>
        </div>
        </div> 
      </div>
    </div>
  )
}

export default Result