import React, { useState } from 'react';
import './FriendsList.css'
import { Link } from "react-router-dom";

interface Props {
    user: any;
    friend: any
    handleClose: () => void;
}

const FriendsList = ({ user, friend, handleClose }: Props) => {



    return (

        <div className="friend-block mb-2">
        <div className="actions">
            <Link to={'/Messages/' + friend.userId._id} className='btn' onClick={handleClose}>
            <span id="friend-pic"><h3 style={{ fontWeight: 500, fontSize: 25 + 'px' }}>
            <img 
                    src={friend.userId.photoUrl} 
                    alt={friend.username} 
                    style={{ 
                        maxWidth: 20 + '%', 
                        textDecoration: 'none', 
                        borderRadius: 50 + '%', 
                        marginLeft: -15 + 'px',
                        marginRight: 50 + 'px' 
                    }} 
                    className=""
                />
                {friend.username}</h3>
            </span> 
        </Link>
        </div>
        </div>
        
    )
}

export default FriendsList