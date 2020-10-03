import React from 'react'
import Header from './Header'
import Logo from './logo.png'
import './Main.css'
import './Logout.css'

const Logout = () => {
    return (
        <div className='main'>
            <Header/>
            <div className='skul'>
                <img className='skullogo' src={Logo} alt='logo'/>
            </div>
            <div className='end'>
               Thanks for choosing us!
            </div>
        </div>
    )
}

export default Logout
