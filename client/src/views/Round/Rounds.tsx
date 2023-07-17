import { useContext, useEffect, useState } from 'react'
import { IQuestion, IRound } from '../../context/types'
import Questions from '../Question/Questions'

import './rounds.scss';
import { QuizContext } from '../../context/State';
import { useNavigate } from 'react-router-dom';

interface IRoundsProps {
    currentRoundOrder: number
    activityID: number
    activityName: string
    updateRound: () => void
    data: IRound[]
}

interface IRoundAnswers {
  order: number;
  answers: boolean[];
}

const Rounds = ({ currentRoundOrder, activityID, activityName, updateRound, data: rounds } : IRoundsProps) => {
  console.log('rounds: ', rounds);
  console.log('currentRoundOrder: ', currentRoundOrder);
  const { setResults } = useContext(QuizContext);

  const [displayRoundPage, setDisplayRoundPage] = useState(true)
  const [roundAnswers, setRoundAnswers] = useState<IRoundAnswers[]>([]);

  const currentRound = rounds.find(round => round.order === currentRoundOrder) as IRound;

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setDisplayRoundPage(false), 2000)
  }, [displayRoundPage])

  useEffect(() => {
    setDisplayRoundPage(true)
  }, [currentRoundOrder])
  
  
  const updateRoundAnswers = (newAnswers: boolean[]) => {
    const newRoundAnswer = {
      order: currentRoundOrder,
      answers: newAnswers,
    }
    
    const newRoundAnswers = [...roundAnswers]
    newRoundAnswers.push(newRoundAnswer)
    setRoundAnswers(newRoundAnswers)

    if (currentRoundOrder + 1 > rounds.length) {
      // Exit Questions
      if (setResults) {
        setResults({
          activityID: activityID,
          activityName: activityName,
          answers: newRoundAnswers,
        });
      }
      navigate('/results')
    }

    updateRound();
  }

  return (
    <div className='rounds-slot'>
      {displayRoundPage ? 
        (
          <div className='round-landing-page'>
            <h1>ROUND {currentRoundOrder}</h1>
          </div>
        )
        :
        (
          <Questions
            key={currentRoundOrder}
            activityID={activityID}
            activityName={activityName}
            round={currentRound}
            data={currentRound?.questions as unknown as IQuestion[]}
            updateRoundAnswers={updateRoundAnswers}
          />
        )
      }

    </div>
  )
}

export default Rounds