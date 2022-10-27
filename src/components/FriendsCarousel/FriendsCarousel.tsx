import './FriendsCarousel.css'
import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col'
import Loading from '../Loading/Loading';
import { Link } from "react-router-dom";

interface Props {
    user: any;
    fren: any;
    carouselUpdate: boolean;
    setCarouselUpdate: any;
}

const FriendsCarousel = ({ user, fren, carouselUpdate, setCarouselUpdate }: Props) => {
    //console.log(fren, '<- What are you, complete friend?')
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [asceanState, setAsceanState] = useState<any>([])
    const [friendProfile, setFriendProfile] = useState<any>(fren)

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getFriend();
  }, [])

  async function getFriend() {
    setLoading(true);
    try {
        const response = await friendAPI.getOneFriend(fren?.userId._id)
        setAsceanState(response.data.user.friends)
        setAsceanState(response.data.ascean)
        setFriendProfile(response.data.user)
        setLoading(false)

    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
    }
  }

  if (loading) {
    return (
    <>
        <Loading NavBar={true} />
    </>
    );
  }

  return (
    <>
    {
        friendProfile && asceanState
        ? 
        <Carousel activeIndex={index} onSelect={handleSelect} className="" id='friend-inside-carousel' indicators={false}>
        {
        asceanState.map((ascean: any, index: number) => {
            return (
                
                <Carousel.Item className="my-1 d-block w-100 justify content center" id="profile-banner" key={index}>
                <Col className="stat-block wide" id="ascean-banner">
                   
                    <span id='banner-profile-pic'>
                        <Link to={`/${ascean?.user?.username}`} style={{ textDecoration: 'none' }}><img src={friendProfile.photoUrl} alt={friendProfile.username} id="profile-banner-pic" className='my-1'/></Link>
                    </span>
                    
                    <div className="creature-heading" id='banner-ascean-pic'>
                        <h1 className='' style={{ fontSize: '', color: 'purple' }} id='ascean-name'>{ascean.name}</h1>
                        <h2 className="" id="ascean-bio">{ascean.description}</h2>
                    </div>
                    <span id='banner-ascean-profile'>
                        <Link to={`/CommunityFeed/${ascean._id}`} style={{ textDecoration: 'none' }}><img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ' ' + ascean.sex} id="ascean-banner-pic" className='my-1'/></Link>
                    </span>
                </Col>
                </Carousel.Item>
            )
        })
        }
        </Carousel> 
        : ''
    }
  </>
  )
}

export default FriendsCarousel