import { useContext, useEffect } from 'react'

import './home.scss'
import { QuizContext } from '../../context/State';
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

  for (let i = activitiesLength; i < 8; i++) {
    const dummayActivity = <Link className="activity disabled" key={crypto.randomUUID()} to='/' >{dummayActivitiesName[i]}</Link>;
    dummayActivities.push(dummayActivity)
  }

  return (dummayActivities)
}

const Home = () => {
  const { activities, fetchActivities } = useContext(QuizContext);

  useEffect(() => {
    if (fetchActivities) {
      void fetchActivities()
    }
  }, [])

  return (
    <div className='home'>
        {activities ?
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
        :
          null
        }
    </div>
  )
}

export default Home