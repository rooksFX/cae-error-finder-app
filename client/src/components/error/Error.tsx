import { useContext } from 'react';
import { Link } from 'react-router-dom'

import { QuizContext } from '../../context/State';

import './error.scss'

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