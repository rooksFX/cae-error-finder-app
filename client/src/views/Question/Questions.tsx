import { useContext, useEffect, useState } from 'react'
import QuestionCard from './QuestionCard'
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

  useEffect(() => {
    console.log('answers: ', answers);
  }, [answers])

  return (
    <div className='questions-slot'>
        {questions.map(question => (
            <QuestionCard
                answer={answer}
                isActive={isActive(question.order)}
                key={question.order} question={question}
            />
        ))}
    </div>
  )
}

export default Questions