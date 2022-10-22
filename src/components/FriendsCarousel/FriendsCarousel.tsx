import './FriendsCarousel.css'
import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from '../Loading/Loading';
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import { Link } from "react-router-dom";

interface Props {
    user: any;
    fren: any
}

const FriendsCarousel = ({ user, fren }: Props) => {
    //console.log(fren, '<- What are you, complete friend?')
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [asceanState, setAsceanState] = useState<any>([])
    const [friendProfile, setFriendProfile] = useState<any>([])

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    friends();
  }, [])

  async function friends() {
    setLoading(true);
    try {
        const response = await friendAPI.getOneFriend(fren?.userId._id)
        setLoading(false)
        setAsceanState(response.data.user.friends)
        //console.log(response.data, '<- Your specific friend!')
        setAsceanState(response.data.ascean)
        setFriendProfile(response.data.user)
    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
    }
  }

  if (loading) {
    return (
    <>
        <Loading />
    </>
    );
  }

  return (
    <>
    {
        friendProfile
        ? 
        <Carousel activeIndex={index} onSelect={handleSelect} className="mx-5" indicators={false}>
        {
        asceanState.map((ascean: any) => {
            return (
                
                <Carousel.Item className="my-1 d-block w-100" id="profile-banner">
                <Col className="stat-block wide" id="ascean-banner">
                   
                    <span id='banner-profile-pic'>
                        <Link to={`/${ascean?.user?.username}`} style={{ textDecoration: 'none' }}><img src={friendProfile.photoUrl} alt="" id="nav-pic" className='my-1'/></Link>
                    </span>
                    
                    <div className="creature-heading" id='banner-ascean-pic'>
                        <h1 className='text-danger' style={{ fontSize: '', color: '' }} id='ascean-name'>{ascean.name}</h1>
                        <h2 className="text-white" id="ascean-bio">{ascean.description}</h2>
                    </div>
                    <span id='banner-ascean-profile'>
                        <Link to={`/CommunityFeed/${ascean._id}`} style={{ textDecoration: 'none' }}><img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} id="ascean-banner-pic" className='my-1'/></Link>
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