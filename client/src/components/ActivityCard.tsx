import './activity-card.scss';

const ActivityCard = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='activity-card'>
      {children}
    </div>
  )
}

export default ActivityCard