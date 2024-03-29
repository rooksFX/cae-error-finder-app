import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import QuestionCard from '../Question/QuestionCard'
import { QuizContext } from '../../context/State'
import { ActivityNumberDisplay } from '../../constants'

import './activityCard.scss'
import Rounds from '../Round/Rounds'
import Questions from '../Question/Questions'
import { IActivity, IQuestion, IRound } from '../../context/types'

const ActivityCard = () => {
  const navigate = useNavigate()

  const { activitiyID = 0} : { activitiyID?: number} = useParams()

  const { activities } = useContext(QuizContext)

  const [activity, setActivity] = useState<IActivity | null>(null)
  const [hasRounds, setHasRounds] = useState(false)
  const [data, setData] = useState<IQuestion[] | IRound[] | null>(null)
  const [currentRoundOrder, setCurrentRoundOrder] = useState(1)

  useEffect(() => {
    if (!activities) {
      navigate('/')
    } else {
      const activity = activities.activities[activitiyID - 1]
      setActivity(activity)
      const questions = activity?.questions
      const hasRounds = questions?.length ? 'questions' in questions[0] : false
      setHasRounds(hasRounds)
      const data = questions
      setData(data)
    }
  }, [activities, activitiyID, navigate])

  if (!activity) return null

  return (
    <div className='activity-card'>
      <div className="header">
        <h3>{activity?.activity_name} {hasRounds ? ` / ROUND ${currentRoundOrder}` : ''}</h3>
      </div>
      <div className="content-slot">
        {/* Render questions or rounds */}
        {hasRounds ?
          (
            <Rounds 
              currentRoundOrder={currentRoundOrder}
              activityID={activitiyID}
              activityName={activity.activity_name}
              updateRound={() => setCurrentRoundOrder(currentRoundOrder + 1)}
              data={data as unknown as IRound[]}
            />
          )
          :
          (
            <Questions
              activityID={activitiyID}
              activityName={activity.activity_name}
              round={null}
              data={data as unknown as IQuestion[]}
            />
          )
        }
      </div>
    </div>
  )
}

export default ActivityCard