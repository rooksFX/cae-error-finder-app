import './questionCard.scss'
import { IQuestion } from '../../context/types';

interface IQuestionCardProps {
  question: IQuestion;
  isActive: boolean;
  answer: (result: boolean, order: number) => void;
}

const Question = ({ answer, question, isActive } : IQuestionCardProps) => {

  const handleAnswer = (value : boolean) => {
    const index = question.order
    const result = value === question.is_correct 
    answer(result, index)
  }

  return (
    <>
      <div className="content">
        {question.stimulus}  
      </div>
      <div className="actions">
        <button onClick={() => handleAnswer(true)}>CORRECT</button>
        <button onClick={() => handleAnswer(false)}>INCORRECT</button>
      </div>
    </>
  )
}

export default Question