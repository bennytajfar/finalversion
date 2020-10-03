import React, { useEffect, useState } from 'react'
import { auth, firestore, storage } from './config.js'
import Header from './Header.js'
import './Home.css'
import { Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from './Sidebar'
import { Redirect } from 'react-router-dom'

const Home = () => {
    const [credemail, setCredemail] = useState(null)
    const [credlastseen, setCredlastseen] = useState(null)
    const [profilepicture, setProfilepicture] = useState(null)
    const [id, setId] = useState(null)
    const [done, setDone] = useState(null)

    useEffect(() => {
        let info = firestore.collection(`users`).onSnapshot(
            snp => {
                if (snp.docs) {
                    const images = snp.docs.map(doc => (doc.data()))
                    const image = images.filter(image => image.id === id)
                    if (image[0]) {
                        setProfilepicture(image[0].url)
                    }
                }
            }
        )
        return info
    }, [credemail, id])

    const uploadprofilepicture = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        storage.ref(`profilepictureof${credemail}`).put(file).on('state_changed', snap => { }, err => {
            console.log(err)
        }, async () => {
            const url = await storage.ref(`profilepictureof${credemail}`).getDownloadURL()
            firestore.collection('users').doc(id).set({
                url, id, email: credemail
            })
        })
    }
    auth.onAuthStateChanged(
        (user) => {
            if (user) {
                setCredemail(user.email)
                setCredlastseen(user.metadata.lastSignInTime)
                setId(user.uid)
            }
            else {
                console.log('nobody is here')

            }
        }
    )
    const logout = () => {
        auth.signOut()
        setId(null)
        setProfilepicture(null)
        setCredlastseen(null)
        setCredemail(null)
        setDone(true)
    }

    return (
        <>
            { !done && <div className='home'>
                <Header />
                <div className='title'>
                    <div className='titlename'>
                        <label>
                            <Avatar className='avatar' src={profilepicture} />
                            <input type='file' className='inputavatar' onChange={uploadprofilepicture} />
                        </label>
                        <div className='span'>
                            <span className='name'>{credemail}</span>
                            <span className='lastseen'>{credlastseen}</span>
                        </div>
                    </div>
                    <div className='burger'>
                        <MenuIcon className='burgericon' />
                    </div>
                </div>
                <div className='container'>
                    <div className='sidebarcontainer'>
                        <Sidebar credemail={credemail} />
                    </div>

                </div>
                <div className='signout'>
                    <div className='logout' onClick={logout}>Log Out</div>
                </div>
            </div>}
            {done && <Redirect to='/logout' />}
        </>
    )
}

export default Home
