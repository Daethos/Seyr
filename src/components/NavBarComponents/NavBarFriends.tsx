import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import * as friendAPI from '../../utils/friendApi';
import FriendsCarousel from '../../components/FriendsCarousel/FriendsCarousel'
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    user: any;
}

const NavBarFriends = ({ user }: Props) => {
    const [friendState, setFriendState] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
      setIndex(selectedIndex);
  };

  useEffect(() => {
    friends();
  }, [])

async function friends() {
  setLoading(true);
  try {
      const response = await friendAPI.getAllFriends(user._id)
      setFriendState(response.data.user.friends)
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
      friendState.length > 0
      ? 
      <Carousel activeIndex={index} onSelect={handleSelect} id="friend-carousel" className="nav-carousel carousel-fade hover" style={{ maxWidth: 100 + '%' }} indicators={false}>
      {
      friendState.map((fren: any, index: any) => {
        return (
          <Carousel.Item className="d-block w-100" key={index}>
          <FriendsCarousel user={user} key={fren._id} fren={fren}/>
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

export default NavBarFriends