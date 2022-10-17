import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    friends?: any
    user: any
}

const FriendsCarousel = ({ friends, user }: Props) => {
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };


  return (
    <>
    {
        friends
        ? friends.map((fren: any) => {
            return (
                <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            )
        })
        
        : ''
    }
    
  </>
  )
}

export default FriendsCarousel