import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { QuizContext } from '../../context/State';
import { IQuestion, IRound, IRoundAnswers } from '../../context/types'

import Questions from '../question'
import Modal from '../../components/modal';

import './rounds.scss';

interface IRoundProps {
    currentRoundOrder: number
    activityID: number
    activityName: string
    updateRound: () => void
    data: IRound[]
}

const Round = ({ currentRoundOrder, activityID, activityName, updateRound, data: rounds } : IRoundProps) => {
  const { setResultsAction } = useContext(QuizContext);

  const [displayRoundPage, setDisplayRoundPage] = useState(true)
  const [roundAnswers, setRoundAnswers] = useState<IRoundAnswers[]>([]);
  const [isNextRoundPrompt, setIsNextRoundPrompt] = useState(false)
  const [quetionsKey, setQuetionsKey] = useState(0)

  const currentRound = rounds.find(round => round.order === currentRoundOrder) as IRound;

  const isLastRound = () => currentRoundOrder + 1 > rounds.length;

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
    const roundAnswersExist = roundAnswers.find(round => round.order === currentRound.order)

    // If Round has been previously answered already
    // update the answers of the registered Round
    if (roundAnswersExist) {
      newRoundAnswers[currentRound.order-1] = newRoundAnswer
    }
    else {
      newRoundAnswers.push(newRoundAnswer)
    }
    setRoundAnswers(newRoundAnswers)
    if (currentRoundOrder + 1 > rounds.length) {
      // Exit Questions
      // Trigger prompt...
      if (setResultsAction) {
        setResultsAction({
          activityID: activityID,
          activityName: activityName,
          answers: newRoundAnswers,
        });
      }
      setIsNextRoundPrompt(true);
    }
    else {
      setIsNextRoundPrompt(true);
    }
  }

  const handleClick = () => {
    setDisplayRoundPage(false)
  }

  const handleNextRoundPrompt = () => {
    if (isLastRound()) {
      navigate('/results')
    }
    else {
      updateRound();
      setIsNextRoundPrompt(false)
    }
  }

  const restartRound = () => {
    setIsNextRoundPrompt(false)
    setQuetionsKey(key => key + 1)
  }

  const renderNextRoundPromptModal = () => {
    const content = isLastRound() ? (<h2>View results?</h2>) : (<h2>Move to the next round?</h2>)
    const footer = (
      <>
        <button onClick={restartRound}><h4>RESTART ROUND</h4></button>
        <button onClick={handleNextRoundPrompt}><h4>PROCEED</h4></button>
      </>
    )
    return {
      content,
      footer
    }
  }

  return (
    <div className='rounds-slot' onClick={handleClick}>
      {isNextRoundPrompt &&
        (
          <Modal key={crypto.randomUUID()} content={renderNextRoundPromptModal()} />
        )
      }
      {displayRoundPage ? 
        (
          <div className='round-landing-view'>
            <header>
              <h3>{activityName}</h3>
              <h1>ROUND {currentRound.order}</h1>
            </header>
          </div>
        )
        :
        (
          <Questions
            key={quetionsKey}
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

export default Round