import './ProfilePage.css'
import { useEffect, useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import userService from "../../utils/userService";
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
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

    const getProfile = useCallback(async () => {
        try {
            const response = await userService.getProfile(username);
            setProfileUser(response.data.user);
            setAscean(response.data.ascean);
            setLoading(false)
        } catch (err: any) {
            console.log(err.message);
        };
    }, [username]);

    useEffect(() => {
        getProfile();
    }, [username, getProfile]);

    if (loading) {
        return (
            <Loading />
        );
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
            <Col className="stat-block wide">
            <hr className="orange-border" />
            <div className="section-left">
                <div className="creature-heading">
                    <h3 className='profile-name'>{profileUser.username.charAt(0).toUpperCase() + profileUser.username.slice(1)}</h3>
                    <svg height="5" width="100%" className="tapered-rule my-3">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                    </svg>
                    <img src={profileUser.photoUrl} alt={profileUser.username} id="profile-pic" />
                </div> 
                <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
                <div className="property-block">
                    <h4 className="" style={{ color: "#fdf6d8", marginLeft: "5%" }}>{profileUser.bio}</h4>
                </div> 
            </div> 
            <hr className="orange-border bottom" />
            </Col>
            </Row>
            <SearchCard ascean={ascean} loggedUser={user} key={ascean._id} />
            {ascean.map((a: any) => {
                return (
                    <SolaAscean ascean={a} key={a._id} />
                )
            })}
        </Container>
    );
};

export default ProfilePage;