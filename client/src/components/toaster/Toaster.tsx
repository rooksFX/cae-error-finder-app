  import { useEffect, useState } from 'react'
  import './toaster.scss'
  
  const Toaster = ({ message } : { message: string }) => {
    const [isDisplayed, setIsDisplayed] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsDisplayed(true);
        }, 500)
        setTimeout(() => {
            setIsDisplayed(false);
        }, 2500)
    }, [])
    

    return (
        <div className={`toaster ${isDisplayed? 'open' : ''}`}>
            {message}
        </div>
    )
  }
  
  export default Toaster