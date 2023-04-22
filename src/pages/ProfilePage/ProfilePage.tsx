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
};

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
        setProfileUser(response.data.user);
        setAscean(response.data.ascean);
        setLoading(false)
        } catch (err: any) {
        console.log(err.message);
        setError("Profile does not exist! You are in the wrong in place"); 
        }
    }, [username]);

    useEffect(() => {
        getProfile();
    }, [username, getProfile, friendRequest]);

    async function sendFriendRequest() {
        setLoading(true);
        try {
            const response = await friendAPI.friendRequest(profileUser._id, user._id)
            setFriendRequest(true)
            setLoading(false)
        } catch (err: any) {
            setFriendRequest(true)
            console.log(err.message, '<- Error handling Friend Request')
        };
    };

    async function friends() {
        setLoading(true);
        try {
            const response = await friendAPI.getAllFriends(user._id)
            setFriendState(response.data.user.friends)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error Fetch Friends in Friend Card')
        };
    };

    async function queryProfile() {
        console.log('Querying Profile For Friends / Requests')
        setLoading(true)
        try {
            const yourFriendIndex = await profileUser?.friends.findIndex(
                (friend: { username: any }) => friend?.username === user.username
            );
            const yourRequestIndex = await profileUser?.requests.findIndex(
                (request: { username: any }) => request?.username === user.username
            );
            const profileRequestIndex = await user?.requests.findIndex(
                (request: { username: any }) => request?.username === profileUser?.username
            );
            console.log('Querying Profile For Friends / Requests',
                yourFriendIndex, '<- Are you Friends?', 
                yourRequestIndex, '<- Have you sent this Profile a Request?', 
                profileRequestIndex, '<- Has this Profile Sent you a Request?')
            setYourRequests(yourRequestIndex)
            setYourFriends(yourFriendIndex)
            setProfileRequests(profileRequestIndex)
            setFriendRequest(false)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error querying profile for friends / requests')
        };
    };

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
            <img src={profileUser.photoUrl} alt={profileUser.username} id="profile-pic" />
            </div> 
            <svg height="5" width="100%" className="tapered-rule my-3">
            <polyline points="0,0 550,2.5 0,5"></polyline>
            </svg>
            </div> 
            <div className="section-right">
                <div className="actions">
                <h3 className='profile-name'>{profileUser.username}</h3>
                <div className="property-block">
                    <h4 className="m-4">{profileUser.bio}</h4>
                </div> 
                </div>
            </div>
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
    );
};

export default ProfilePage;