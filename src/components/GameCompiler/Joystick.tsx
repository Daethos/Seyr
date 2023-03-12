import React, { useState, useRef, useEffect } from 'react';

interface Props {
    onDirectionChange: (...args: any[]) => void;
    debouncedHandleDirectionChange: (...args: any[]) => void;
};

const Joystick = ({ onDirectionChange, debouncedHandleDirectionChange }: Props) => {
    const [touchStart, setTouchStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const timerRef = useRef<any>(null);
    const lastDirectionRef = useRef<string>("");

    useEffect(() => {
        console.log(timerRef, "Timer Ref")
    }, [timerRef])

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        // console.log(event.touches[0].clientX, event.touches[0].clientY, "start")
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
        let direction: string = "";

        const angleDegrees = angle * 180 / Math.PI;
        if (angleDegrees >= -22.5 && angleDegrees < 22.5) {
            debouncedHandleDirectionChange("right");
            direction = "right";
        } else if (angleDegrees >= 22.5 && angleDegrees < 67.5) {
            debouncedHandleDirectionChange("downRight");
            direction = "downRight";
        } else if (angleDegrees >= 67.5 && angleDegrees < 112.5) {
            debouncedHandleDirectionChange("down");
            direction = "down";
        } else if (angleDegrees >= 112.5 && angleDegrees < 157.5) {
            debouncedHandleDirectionChange("downLeft");
            direction = "downLeft";
        } else if (angleDegrees >= 157.5 || angleDegrees < -157.5) {
            debouncedHandleDirectionChange("left");
            direction = "left";
        } else if (angleDegrees >= -157.5 && angleDegrees < -112.5) {
            debouncedHandleDirectionChange("upLeft");
            direction = "upLeft";
        } else if (angleDegrees >= -112.5 && angleDegrees < -67.5) {
            debouncedHandleDirectionChange("up");
            direction = "up";
        } else {
            debouncedHandleDirectionChange("upRight");
            direction = "upRight";  
        }

        if (lastDirectionRef.current !== direction) {
            lastDirectionRef.current = direction;
        };

    };
    
    const handleTouchEnd = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setPosition({ x: 0, y: 0 });
        }, 250);
    };

return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className='joystick-outer'
      style={{
        borderRadius: "50%",
        backgroundColor: "purple",
        position: "fixed",
        bottom: "75px",
        right: "75px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "auto",
      }}
    >
      <div
        className='joystick-inner'
        style={{
            borderRadius: "50%",
            backgroundColor: "#fdf6d8",
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
      ></div>
    </div>
  );
}

export default Joystick;