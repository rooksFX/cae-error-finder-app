import './questionCard.scss'
import { IQuestion } from '../../context/types';

interface IQuestionCardProps {
  question: IQuestion;
  isActive: boolean;
  answer: (result: boolean, order: number) => void;
}

const QuestionCard = ({ answer, question, isActive } : IQuestionCardProps) => {
  const handleAnswer = (value : boolean) => {
    const index = question.order
    const result = value === question.is_correct 
    answer(result, index)
  }

  return (
    <div className={`question-card ${isActive ? 'active': ''}`}>
      <div className="header">
        <h1>Q{question.order}.</h1>
      </div>
      <div className="content">
        {question.stimulus}  
      </div>
      <div className="actions">
        <button onClick={() => handleAnswer(true)}>CORRECT</button>
        <button onClick={() => handleAnswer(false)}>INCORRECT</button>
      </div>
    </div>
  )
}

export default QuestionCard