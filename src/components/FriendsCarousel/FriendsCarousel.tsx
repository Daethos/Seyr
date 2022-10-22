import './FriendsCarousel.css'
import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi';
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../Loading/Loading';
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import { Link } from "react-router-dom";

interface Props {
    user: any;
    fren: any
}

const FriendsCarousel = ({ user, fren }: Props) => {
    console.log(fren, '<- What are you, complete friend?')
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
        console.log(response.data, '<- Your specific friend!')
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

//   <Carousel.Caption>
//                     <h3>{friendProfile.username}</h3>
//                     <p>{friendProfile.bio}</p>
//                 </Carousel.Caption>
  return (
    <>
    {
        friendProfile
        ? 
        <Carousel activeIndex={index} onSelect={handleSelect} className="" indicators={false}>
           
         
        {
        asceanState.map((ascean: any) => {
            return (
                
                <Carousel.Item>
                <Col className="stat-block wide my-1" id="ascean-banner">
                    {/* <hr className="orange-border" /> */}
                    <Link to={`/${ascean?.user?.username}`} style={{ textDecoration: 'none' }}>
                    <span id='banner-profile-pic'><img src={friendProfile.photoUrl} alt="" id="nav-pic" className='my-1'/></span>
                    </Link>
                    
                    <span id='banner-ascean-profile'>
                    <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} id="ascean-pic" className='my-1'/>
                    </span>
                    <div className="creature-heading" id='banner-ascean-pic'>
                    
                        {/* <h1>{friendProfile.username}</h1> */}
                        
                    <Link to={`/CommunityFeed/${ascean._id}`} style={{ textDecoration: 'none' }}><h1>{ascean.name}</h1></Link>
                    <h2 className="text-white">{ascean.description}</h2>
                    
                    </div>
                    
                    <div className="top-stats">
                    
                    </div>
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