import React, { useState, useEffect } from 'react'
import './Main.css'
import './Message.css'
import { auth, firestore } from './config.js'

const Message = ({ messageto }) => {
    const [mail, setMail] = useState(null)
    const [url, setUrl] = useState(null)
    const[message,setMessage]= useState(null)
    const wrtie = () =>{
    
    }
    const submit = (e)=>{
        e.preventDefault()
        setMessage('')
    }

    useEffect(() => {
        const user = auth.currentUser
        if (user) {
            setMail(user.email)
        }
        firestore.collection('users').onSnapshot(
            snp => {
                const images = snp.docs.map(doc => (doc.data()))
                const image = images.filter(img => (img.email === messageto))
                console.log(image)
                if (image.length === 1) {
                    const urlBg = image[0].url
                    setUrl(urlBg)
                }
            }
        )
    }, [messageto])


    return (
        <div className='main'>
            <div className='hold'>
            <div className='message' >
                <div className='imageholder'>
                    <div className='holder'>
                        <img className='img' src={url} alt={messageto} />
                    </div>
                    <div className='name'>
                        {messageto}message to
                    </div>
                </div>
                <div className='canvas'>
                    canvas
                </div>
            </div>
            <div className='inputcontainer'>
                <div className='inputholder'>
                    <form onSubmit={submit}>
                    <input className='input' value={message} onChange={wrtie}placeholder='wrtie youe message here...'/>
                    </form>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default Message
