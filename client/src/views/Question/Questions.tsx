import { useContext, useEffect, useState } from 'react'
import Question from './Question'
import './questions.scss';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/State';
import { IQuestion, IRound } from '../../context/types';

interface IQuestionsProps {
    activityID: number;
    activityName: string;
    round: IRound | null;
    data: IQuestion[];
    updateRoundAnswers?: (newAnswers: boolean[]) => void;
}

const Questions = ({ activityID, activityName, data : questions, round = null, updateRoundAnswers } : IQuestionsProps) => {
  const { setResults } = useContext(QuizContext);

  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<boolean[]>([]);

  const navigate = useNavigate();

  const isActive = (order: number) => {
    return order === currentQuestion;
  }

  const answer = (result: boolean, order: number) => {
    // if existing
    const newAnswers = [...answers]
    if (newAnswers[order] !== undefined) {
        newAnswers[order] = result;
    } else {
        newAnswers.push(result);
    }

    setAnswers(newAnswers)
    
    const index = order + 1;
    console.log('index: ', index);
    if (index > questions.length) {
        // If Activity has Rounds
        if (round && updateRoundAnswers) {
          // Move to next Round
          updateRoundAnswers(newAnswers);
        }
        else {
          // Update results
          if (setResults) {
              setResults({
                  activityID,
                  activityName,
                  answers: newAnswers,
              })
          }
          navigate('/results')
        }
    }
    else {
        console.log("Move to next question");
        setCurrentQuestion(order + 1)
    }
  }

  // const getPosition = (index: number) => {
  //   if (currentQuestion < index) {
  //     return `100vw`;
  //   }
  //   else if (currentQuestion > index) {
  //     return `-100vw`;
  //   }
  //   return '0'
  // }

  const displayRound = () => {
    return round ? ` / ROUND ${round.order}`: ''
  }

  return (
    <div className='questions'>
      <div className="question-card">
        <header>
          <h3>{activityName}{displayRound()}</h3>
          <h1>Q{currentQuestion}.</h1>
        </header>
        <div className='questions-slot'>
            {questions.map((question, index) => (
                <div 
                  className={`question ${isActive(question.order) ? 'active': ''}`}
                  // style={{ left: getPosition(question.order) }}
                  key={crypto.randomUUID()}
                >
                  <Question
                      answer={answer}
                      isActive={isActive(question.order)}
                      key={question.order} question={question}
                  />
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Questions