import './ProfilePage.css'
import { useEffect, useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import userService from "../../utils/userService";
import * as friendAPI from '../../utils/friendApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean';
import SearchCard from '../../components/SearchCard/SearchCard'
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";


interface ProfileProps {
    user: any;
}

// TODO: Fix Friend Request Check, someone friended can still send a request

const ProfilePage = ({ user }: ProfileProps) => {
    const [ascean, setAscean] = useState<any>([]);
    const [profileUser, setProfileUser] = useState<any>({});

    const [friendState, setFriendState] = useState<any>([])

    const [friendRequest, setFriendRequest] = useState<boolean>(false)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

    const [yourRequests, setYourRequests] = useState<any>(0)
    const [yourFriends, setYourFriends] = useState<any>(0)
    const [profileRequests, setProfileRequests] = useState<any>(0)

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

    async function friends() {
        setLoading(true);
        try {
            const response = await friendAPI.getAllFriends(user._id)
            console.log(response.data.user.friends, '<- Response Finding a Friend on a Profile')
            setFriendState(response.data.user.friends)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error Fetch Friends in Friend Card')
        }
    }

    useEffect(() => {queryProfile()}, [profileUser, friendRequest])

    async function queryProfile() {
        setLoading(true)
        try {
            const yourFriendIndex = profileUser?.friends.findIndex(
                (friend: { username: any }) => friend?.username === user.username
            );
            const yourRequestIndex = profileUser?.requests.findIndex(
                (request: { username: any }) => request?.username === user.username
            );
            const profileRequestIndex = user?.requests.findIndex(
                (request: { username: any }) => request?.username === profileUser?.username
            );
            setYourRequests(yourRequestIndex)
            setYourFriends(yourFriendIndex)
            setProfileRequests(profileRequestIndex)
            setFriendRequest(false)
        } catch (err: any) {
            console.log(err.message, '<- Error querying profile for friends / requests')
        }
    }

    if (loading) {
        return (
            <Loading />
        );
    }

  return (
    <Container className="my-5">
        <Row className="justify-content-center">
        <Col className="stat-block wide">
        <hr className="orange-border" />
        
        <div className="section-left">
        <div className="creature-heading">
        <svg height="5" width="100%" className="tapered-rule my-3">
        <polyline points="0,0 550,2.5 0,5"></polyline>
        </svg>
        <img src={profileUser.photoUrl} id="profile-pic" />
        </div> 
        <svg height="5" width="100%" className="tapered-rule">
        <polyline points="0,0 550,2.5 0,5"></polyline>
        </svg>
        </div> 
        <div className="section-right">
            <div className="actions">
                <h3>{profileUser.username}
                </h3>
                <div className="property-block">
                <h4 className="m-4">{profileUser.bio}</h4>
                </div> 
            </div>
        </div>
        {
            yourFriends > -1
            ? <h3 
            className="my-3"
            style={{ color: 'green', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
            >You are friends with {profileUser.username} !
            </h3>
            : yourRequests > -1 
                ? <h3 
                    className="my-3"
                    style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                    >Friend request sent to {profileUser.username} !
                    </h3>
                : profileRequests > -1
                    ? <h3 
                        className="my-3"
                        style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                        >{profileUser.username} has sent you a friend request !
                        </h3>
                    : <button 
                        className="btn my-3"
                        onClick={sendFriendRequest}
                        style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 20 + 'px' }}
                        >Send friend request to {profileUser.username} ?
                        </button>
        }

        <hr className="orange-border bottom" />
        </Col>
        </Row>
        <SearchCard ascean={ascean} loggedUser={user} key={ascean._id} />
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