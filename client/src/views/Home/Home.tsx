import React, { useContext, useEffect } from 'react'

import './home.scss'
import { QuizContext, QuizProvider } from '../../context/State';
import { Link } from 'react-router-dom';

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

const renderDummyActivities = (activitiesLength: number) => {
  const dummayActivities = [];

  for (let i = activitiesLength; i < 10; i++) {
    const dummayActivity = <Link className="activity disabled" key={crypto.randomUUID()} to='/' >{dummayActivitiesName[i]}</Link>;
    dummayActivities.push(dummayActivity)
  }

  return (dummayActivities)
}

const Home = () => {
  const { activities, setActivities } = useContext(QuizContext);

  console.log('activities: ', activities);

  useEffect(() => {
    if (setActivities) {
      setActivities()
    }
  }, [])

  return (
    <div className='home'>
        <div className="header">
          <h2>CAE</h2>
          <h1>{activities?.name ?? ''}</h1>
        </div>
        <div className='activities-slot'>
          {activities?.activities ? activities.activities.map(activitiy => (
            <Link className="activity" key={crypto.randomUUID()} to={`activity/${activitiy.order}`}>{activitiy.activity_name}</Link>
          )) : ''}
          {renderDummyActivities(activities?.activities.length as number)}
        </div>
    </div>
  )
}

export default Home