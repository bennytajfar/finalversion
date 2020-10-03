import React,{useEffect,useState} from 'react'
import './Sidebar.css'
import{firestore} from './config.js'
import User from './User.js'

const Sidebar = ({credemail}) => {
    const[users,setUsers]=useState(null)

    useEffect(()=>{
        let info = firestore.collection(`users`).onSnapshot(
            snp=>{
                setUsers(snp.docs.map(doc => doc.data()))
            }
        )
        return info
    },[credemail])

    return (users && users.map((user)=> (<User  key={user.url} email={user.email} url={user.url}/>))
    )
}

export default Sidebar
