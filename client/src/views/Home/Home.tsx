import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { QuizContext } from '../../context/State'

import ErrorView from '../../components/error'
import Spinner from '../../components/spinner'

import './home.scss'

const dummayActivitiesName = [
  'Activity One',
  'Activity Two',
  'Activity Three',
  'Activity Four',
  'Activity Five',
  'Activity Six',
  'Activity Seven',
  'Activity Eight',
  'Activity Nine',
  'Activity Ten',
]

// This is just for the display
const renderDummyActivities = (activitiesLength: number) => {
  const dummayActivities = []

  for (let i = activitiesLength; i < 8; i++) {
    const dummayActivity = <Link className="activity disabled" key={crypto.randomUUID()} to='/' >{dummayActivitiesName[i]}</Link>
    dummayActivities.push(dummayActivity)
  }

  return (dummayActivities)
}

const Home = () => {
  const { activities, error, fetchActivitiesAction } = useContext(QuizContext)

  const [isFecthing, setIsFetching] = useState(false)

  const fetchActivities = () => {
    if (fetchActivitiesAction) {
      fetchActivitiesAction().finally(() => {
        setIsFetching(false)
      })
    }
  }

  useEffect(() => {
    if (!activities) {
      setIsFetching(true)
      fetchActivities()
    }
  }, [])

  if (error) return (
    <ErrorView returnHomeEnabled={false} />
  )

  if (isFecthing) return (
    <div className='home'>
      <div className="spinner-slot">
        <Spinner loadingMessage='Loading...'/>
      </div>
    </div>
  )

  if (activities) return (
    <div className='home'>
      <>
        <header>
          <h3>CAE</h3>
          <h1>{activities?.name ?? ''}</h1>
        </header>
        <div className="activities-slot">
          <div className='activities custom-scroll'>
            {activities?.activities ? activities.activities.map(activitiy => (
              <Link className="activity" key={crypto.randomUUID()} to={`activity/${activitiy.order}`}><h3>{activitiy.activity_name}</h3></Link>
            )) : ''}
            {renderDummyActivities(activities?.activities.length)}
          </div>
        </div>
      </>
    </div>
  )

  return null
}

export default Home