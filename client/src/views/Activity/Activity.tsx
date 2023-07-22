import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizContext } from '../../context/State'

import './activity.scss'
import Rounds from '../Round/'
import Questions from '../Question/'
import { IActivity, IQuestion, IRound } from '../../context/types'
import Spinner from '../../components/spinner/Spinner'
import ErrorView from '../../components/error/Error'

const ActivityCard = () => {
  const navigate = useNavigate()

  const { activitiyID = 0} : { activitiyID?: number} = useParams()

  const { activities, error, fetchActivitiesAction } = useContext(QuizContext)

  const [activity, setActivity] = useState<IActivity | null>(null)
  const [hasRounds, setHasRounds] = useState(false)
  const [data, setData] = useState<IQuestion[] | IRound[] | null>(null)
  const [currentRoundOrder, setCurrentRoundOrder] = useState(1)
  const [IsFetching, setIsFetching] = useState(false);

  const fetchActivities = () => {
      if (fetchActivitiesAction) {
        setIsFetching(true);
        void fetchActivitiesAction().finally(() => {
          setIsFetching(false);
        })
      }
  }

  useEffect(() => {
    if (!activities) {
      // navigate('/')
      fetchActivities();
    } else {
      const selectedActivity = activities.activities[activitiyID - 1]
      setActivity(selectedActivity)
      const questions = selectedActivity?.questions
      const hasRounds = questions?.length ? 'questions' in questions[0] : false
      setHasRounds(hasRounds)
      const data = questions
      setData(data)
    }
  }, [activities, activitiyID, navigate])

  if (error) return (
    <ErrorView />
  )

  if (!activity) return null

  if (IsFetching) return (
              <div className="spinner-slot">
                <Spinner loadingMessage='Loading...'/>
              </div>
            )

  return (
    <>
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
    </>
  )
}

export default ActivityCard