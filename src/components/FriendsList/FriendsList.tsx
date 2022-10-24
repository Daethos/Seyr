import React, { useState } from 'react';
import './FriendsList.css'
import { Link } from "react-router-dom";

interface Props {
    user: any;
    friend: any
}

const FriendsList = ({ user, friend }: Props) => {



    return (

        <div className="friend-block mb-2">
        <div className="actions">
            
            <Link to={'/Messages/' + friend.userId._id} className='btn'>
            <span id="friend-pic"><img src={friend.userId.photoUrl} alt={friend.username} style={{ maxWidth: 10 + '%', textDecoration: 'none' }} /></span> <h3 style={{ fontWeight: 500, fontSize: 25 + 'px' }}>{friend.username}</h3>
        </Link>
        </div>
        </div>
        
    )
}

export default FriendsList