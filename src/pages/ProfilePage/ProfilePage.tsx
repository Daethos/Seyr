import './ProfilePage.css'
import React, { useEffect, useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import userService from "../../utils/userService";
import * as friendAPI from '../../utils/friendApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import SearchCard from '../../components/SearchCard/SearchCard'
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";


interface ProfileProps {
    user: any;
    friends?: any
}

const ProfilePage = ({ user }: ProfileProps) => {
    const [ascean, setAscean] = useState<any>([]);
    //const [communityFeed, setcommunityFeed] = useState<boolean>(false)

    const [profileUser, setProfileUser] = useState<any>({});
    const [friendState, setFriendState] = useState<any>([])
    const [friendRequest, setFriendRequest] = useState<boolean>(false)
    const [friendStatus, setFriendStatus] = useState<any>(false)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    let yourFriend: any = ''


    const getProfile = useCallback(async () => {
        try {
        const response = await userService.getProfile(username);
        setLoading(false);
        setProfileUser(response.data.user);
        setAscean(response.data.ascean);
        console.log(response);
        } catch (err: any) {
        console.log(err.message);
        setError("Profile does not exist! You are in the wrong in place"); 
        }
    }, [username]);

    useEffect(() => {
        getProfile();
    }, [username, getProfile]);

    async function sendFriendRequest() {
        try {
            const response = await friendAPI.friendRequest(profileUser._id, user._id)
            console.log(response, '<- Response in Friend Request')
            setFriendRequest(true)
        } catch (err: any) {
            setFriendRequest(true)
            console.log(err.message, '<- Error handling Friend Request')
        }
    }

    useEffect(() => {
        friends();
      }, [username, getProfile])

    // useEffect (() => {
    //     friendChecker()
    // }, [])

    async function friends() {
        setLoading(true);
        try {
            const response = await friendAPI.getAllFriends(user._id)
            console.log(response.data.friends, '<- Response Finding a Friend on a Profile')
            setFriendState(response.data.friends)
            // let friends: string = ''
            // const areWeFriends = response?.data?.friends.map((friend: any) => {
            //     console.log(friend.username, '<- Who are you, friend?')
            //     friend.username.includes(profileUser?.username)
            //     ? friends = (friend.username)
            //     : friends = ('Not Friends')
            //     return (
            //         friends
            //     )
            // })
            //console.log(areWeFriends, '<- So, are we friends?')
            setLoading(false)
            //setFriendStatus(areWeFriends)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error Fetch Friends in Friend Card')
        }
      }

    async function friendChecker() {
        setLoading(true);
        try {
            let friends: string = ''
            const areWeFriends = await friendState.map((friend: any) => {
                console.log(friend.username, '<- Who are you, friend?')
                friend.username.includes(profileUser?.username)
                ? friends = (friend.username)
                : friends = ('Not Friends')
                return (
                    friends
                )
            })
            setFriendStatus(areWeFriends)
            console.log(areWeFriends, '<- So, are we friends?')
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error Checking Friendship')
        }
    }
    

    if (loading) {
        return (
            <Loading />
        );
    }

  return (
    <Container className="my-5">
        
        <Row 
            className="justify-content-center" 
            // xs={1 | 'auto'} sm={1 | 'auto'} md={2 | 'auto'} lg={2 | 'auto'} xl={2 | 'auto'} xxl={3 | 'auto'}
        >
        <Col className="stat-block wide">
        <hr className="orange-border" />
        
        <div className="section-left">
        <div className="creature-heading">
        <svg height="5" width="100%" className="tapered-rule my-3">
        <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        <img src={profileUser.photoUrl} id="profile-pic" />
            {/* <h1></h1>
            <h2></h2> */}
        </div> 
        <svg height="5" width="100%" className="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        </div> 
        <div className="section-right">
            <div className="actions">
                <h3>{profileUser.username}
                {/* <span style={{ float: 'right' }}>
                    <button 
                    className="btn" 
                    style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                    >Send Friend Request</button>
                </span> */}
                </h3>
                
                <div className="property-block">
                <h4 className="m-4">{profileUser.bio}</h4>
                </div> 
                
            </div>
             
        </div>
        {/* <span style={{ float: 'right' }}> */}
        {
            friendState 
            ? 
                <>
                {
                friendState.map((friend: any) => { friend.username.includes(profileUser?.username) 
                    ? yourFriend = friend.username 
                    : yourFriend = null })}
                {
                yourFriend
                ? 
                <h3 
                className="my-3"
                style={{ color: 'green', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                >You're friends with {profileUser?.username}</h3>
                : friendRequest 
                    ? 
                    <h3 
                    className="my-3"
                    style={{ color: 'yellow', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                    >Sent to {profileUser.username} !
                    </h3>
                    :    
                    <button 
                    className="btn"
                    onClick={sendFriendRequest}
                    style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                    >Friend {profileUser.username} ?
                    </button>
                }

                </> 
            : ''
            ? <h3 
            className="my-3"
            style={{ color: 'green', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
            >You're friends with {profileUser?.username}</h3>
            : 
                friendRequest 
                ? <h3 
                className="my-3"
                style={{ color: 'yellow', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                >Sent to {profileUser.username} !
                </h3>
                :    
                <button 
                className="btn"
                onClick={sendFriendRequest}
                style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                >Friend {profileUser.username} ?
                </button>
        }

                    {/* <button 
                    className="btn" 
                    style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                    >Friend {profileUser.username} ?</button> */}
                {/* </span> */}
        <hr className="orange-border bottom" />
        </Col>
        </Row>
        <SearchCard ascean={ascean} key={ascean._id} />
        {ascean.map((a: any) => {
            return (
                <SolaAscean
                    ascean={a}
                    key={a._id}
                />
            )
        })}
    </Container>
  )
}

export default ProfilePage