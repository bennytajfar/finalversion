import React, { useState } from 'react'
import './Sidebar.css'
import { Avatar } from '@material-ui/core'
import './Sidebar.css'
import { auth } from './config.js'
import Message from './Message'

const User = ({ email ,url}) => {
    const [lastseen, setLastseen] = useState(null)
    const [done,setDone]=useState(null)
    const [messageto,setMessageto]=useState(null)

    const message= (e)=>{
        console.log(e.target.id)
        setMessageto(e.target.id)
        if(messageto){setDone(true)}
    }

    auth.onAuthStateChanged(
        (user) => {
            if (user) {
                setLastseen(user.metadata.lastSignInTime)

            } else {
                console.log('nobody is here')
            }
        })

    return (<>
        {(!done) && <div className='sidebar'>
            <div onClick={message} id={email}className='titlenamesidebar'>
                <Avatar src={url} className='avatarsidebar' />
                <div className='spansidebar'>
                    <span className='namesidebar'>{email}</span>
                    <span className='lastseensidebar'>{lastseen}</span>
                </div>
            </div>
        </div>}
        {done && <Message messageto={messageto}/>}
        </>
    )
}

export default User
