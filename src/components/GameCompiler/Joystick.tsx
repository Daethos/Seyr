import React, { useState, useEffect } from 'react';

interface Props {
    onDirectionChange: (...args: any[]) => void;
}

const Joystick = ({ onDirectionChange }: Props) => {
    const [touchStart, setTouchStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });



    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(event.touches[0].clientX, event.touches[0].clientY, "start")
        setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        const touchMove = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        const dx = touchMove.x - touchStart.x;
        const dy = touchMove.y - touchStart.y;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 50);
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);
        setPosition({ x, y });
        console.log(dx, dy, "x, y")

  

        if (dx > 5 && dy < -5) {
            onDirectionChange("upRight");
        }
        if (dx < 5 && dy > 5) {
            onDirectionChange("downLeft");
        };
        if (dx > 5 && dy > 5) {
            onDirectionChange("downRight");
        };
        if (dx < 5 && dy < -5) {
            onDirectionChange("upLeft");
        };
        if (dx > 5) {
            onDirectionChange("right");
        } 
        if (dx < -5) {
            onDirectionChange("left");
        }
        if (dy > 5) {
            onDirectionChange("down");
        } 
        if (dy < -5) {
            onDirectionChange("up");
        }
      };
    
      const handleTouchEnd = () => {
        setPosition({ x: 0, y: 0 });
    };

return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        backgroundColor: "purple",
        border: "3px solid black",
        position: "fixed",
        bottom: "250px",
        right: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "auto",
      }}
    >
      <div
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid black",
            backgroundColor: "#fdf6d8",
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.2s',
        }}
      ></div>
    </div>
  );
}

export default Joystick;