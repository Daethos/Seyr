import './ProfilePage.css'
import React, { useEffect, useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import userService from "../../utils/userService";
import SolaAscean from '../../components/SolaAscean/SolaAscean';
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";


interface ProfileProps {
    user: any;
    handleLogout: () => void;
}

const ProfilePage = ({ user, handleLogout }: ProfileProps) => {
    const [ascean, setAscean] = useState<any>([]);

    const [profileUser, setProfileUser] = useState<any>({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

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
            <h1></h1>
            <h2></h2>
        </div> 
        <svg height="5" width="100%" className="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        </div> 
        <div className="section-right">
            <div className="actions">
                <h3>{profileUser.username}</h3>
                <div className="property-block">
                <h4 className="m-4">{profileUser.bio}</h4>
                </div> 
                
            </div> 
        </div>
        <hr className="orange-border bottom" />
        </Col>
        </Row>

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