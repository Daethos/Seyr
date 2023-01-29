import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import * as friendAPI from '../../utils/friendApi';
import FriendsCarousel from '../../components/FriendsCarousel/FriendsCarousel'
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    user: any;
    friendState: any
    friendAccept: boolean;
    setFriendAccept: any;
}

const NavBarFriends = ({ user, friendState, friendAccept, setFriendAccept }: Props) => {
    const [friendCarousel, setFriendCarousel] = useState<any[]>(friendState)
    const [loading, setLoading] = useState<boolean>(false);
    const [carouselUpdate, setCarouselUpdate] = useState<boolean>(false)
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };

  useEffect(() => {
    friends();
  }, [friendAccept])

async function friends() {
  setLoading(true);
  try {
      const response = await friendAPI.getAllFriends(user._id)
      setFriendCarousel(response.data.user.friends)
      setFriendAccept(false)
      setCarouselUpdate(true)
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

  if (friendAccept) {
    friends()
  }

  return (
    <>
    {
      friendCarousel.length > 0
      ? 
      <Carousel activeIndex={index} onSelect={handleSelect} id="friend-carousel" className="nav-carousel carousel-fade hover" 
      indicators={false}>
      {
      friendCarousel.map((fren: any, index: any) => {
        return (
          <Carousel.Item className="d-block w-100" key={index}>
            <FriendsCarousel user={user} key={fren._id} fren={fren} carouselUpdate={carouselUpdate} setCarouselUpdate={setCarouselUpdate} />
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