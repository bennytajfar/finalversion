import React,{useEffect,useState} from 'react'
import {auth, firestore} from './config.js'
import './Home.css'

const Feed = ({credemail}) => {
    const[users,setUsers]=useState(null)
    
    useEffect(()=>{
        console.log(credemail)
        firestore.collection(`users`).onSnapshot(
            snp=>{
                setUsers(snp.docs.map(doc => doc.data()))
            }
        )
    },[credemail])
    auth.onAuthStateChanged(
        (user) => {
            if (user) {
            
             
            } else {
                console.log('nobody is here')
            }
        })

    return (
        <div className='feed'>
           feed
        </div>
    )
}

export default Feed
