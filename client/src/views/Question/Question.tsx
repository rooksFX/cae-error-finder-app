import { useContext, useState } from 'react'
import './questions.scss';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/State';
import { IQuestion, IRound } from '../../context/types';

interface IQuestionsProps {
    activityID: number;
    activityName: string;
    round: IRound | null;
    data: IQuestion[];
    updateRoundAnswers?: (updatedAnswers: boolean[]) => void;
}

const Questions = ({ activityID, activityName, data : questions, round = null, updateRoundAnswers } : IQuestionsProps) => {
  const { setResultsAction } = useContext(QuizContext);

  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<boolean[]>([]);

  const navigate = useNavigate();

  const handleAnswer = (value : boolean) => {
    const order = questions[currentQuestion - 1].order;
    const result = value === questions[currentQuestion - 1].is_correct 

    // if existing
    const updatedAnswers = [...answers]
    if (updatedAnswers[order] !== undefined) {
        updatedAnswers[order] = result;
    } else {
        updatedAnswers.push(result);
    }
    setAnswers(updatedAnswers)
    if (order + 1 > questions.length) {
        // If Activity has Rounds
        if (round && updateRoundAnswers) {
          // Move to next Round
          updateRoundAnswers(updatedAnswers);
        }
        else {
          // Update results
          if (setResultsAction) {
              setResultsAction({
                  activityID,
                  activityName,
                  answers: updatedAnswers,
              })
          }
          navigate('/results')
        }
    }
    else {
        setCurrentQuestion(order + 1)
    }
  }

  const displayRound = () => {
    return round ? ` / ROUND ${round.order}`: ''
  }

  const renderQuestion = (question: string) => {
    const split = question.split('*');
    const [ start, highlight, end]  = split;
    return (
      <>{start}{' '}<span className='highlight'>*{highlight}*</span>{' '}{end}</>
    )
  }

  return (
    <div className="question-slot">
      <header>
        <h3>{activityName}{displayRound()}</h3>
        <h1>Q{currentQuestion}.</h1>
      </header>
      <div className="question-card-slot">
        <div className="question-card">
          <div className="question">
            <h4>"{renderQuestion(questions[currentQuestion-1].stimulus)}"</h4>
          </div>
          <div className="actions">
            <button className='correct' onClick={() => handleAnswer(true)}><h4>CORRECT</h4></button>
            <button className='incorrect' onClick={() => handleAnswer(false)}><h4>INCORRECT</h4></button>
          </div>
        </div>

    </div>
    </div>
  )
}

export default Questions