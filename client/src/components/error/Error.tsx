import { Link } from 'react-router-dom'
import './error.scss'
import { useContext } from 'react';
import { QuizContext } from '../../context/State';

const Error = ({ returnHomeEnabled = true } : { returnHomeEnabled?: boolean }) => {
  const { error } = useContext(QuizContext);

  return (
    <div className='error'>
        <img src='/this-is-fine-fire.gif' />
        <h1>{ error || 'PAGE NOT FOUND' }</h1>
        { returnHomeEnabled && <Link to='/'><h2>HOME</h2></Link> }
    </div>
  )
}

export default Error