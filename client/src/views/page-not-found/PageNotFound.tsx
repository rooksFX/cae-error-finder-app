import { Link } from 'react-router-dom'
import './pagenotfound.scss'

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
        <h1>PAGE NOT FOUND</h1>
        <Link to='/'><h2>HOME</h2></Link>
    </div>
  )
}

export default PageNotFound