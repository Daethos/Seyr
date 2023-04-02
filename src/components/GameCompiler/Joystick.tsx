import React, { useState, useRef, useEffect } from 'react';

type Direction = "up" | "down" | "left" | "right" | "upLeft" | "upRight" | "downLeft" | "downRight";

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
        const handleKeyDown = (event: KeyboardEvent) => {
            const keyDirectionMap: Record<string, Direction> = {
                ArrowUp: "up",
                KeyW: "up",
                ArrowDown: "down",
                KeyS: "down",
                ArrowLeft: "left",
                KeyA: "left",
                ArrowRight: "right",
                KeyD: "right",
                KeyQ: "upLeft",
                KeyE: "upRight",
                KeyZ: "downLeft",
                KeyC: "downRight",
            };  
      
            const direction = keyDirectionMap[event.code];
            console.log(direction, "direction");
            if (direction) {
                let dx = 0;
                let dy = 0;
        
                switch (direction) {
                case "up":
                    dy = -1;
                    break;
                case "down":
                    dy = 1;
                    break;
                case "left":
                    dx = -1;
                    break;
                case "right":
                    dx = 1;
                    break;
                }
      
            // Check for diagonal movement
                if (dx !== 0 && dy !== 0) {
                    console.log(dx, dy, "dx, dy");  
                    let diagonalDirection = "";
                    if (dx === 1 && dy === -1) {
                        diagonalDirection = "upRight";
                    } else if (dx === 1 && dy === 1) {
                        diagonalDirection = "downRight";
                    } else if (dx === -1 && dy === 1) {
                        diagonalDirection = "downLeft";
                    } else if (dx === -1 && dy === -1) {
                        diagonalDirection = "upLeft";
                    }
                    if (diagonalDirection) {
                        console.log(diagonalDirection, "diagonalDirection");
                        onDirectionChange(diagonalDirection);
                        lastDirectionRef.current = diagonalDirection;
                    };
                } else {
                    console.log(direction, "direction in else");
                    onDirectionChange(direction);
                    lastDirectionRef.current = direction;
                };
            };
        };
      
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onDirectionChange]);
      
    
    const handleKeyUp = () => {
        lastDirectionRef.current = "";
    };


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
        // onKeyUp={handleKeyUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className='joystick-outer'
        style={{
            borderRadius: "50%",
            backgroundColor: "black",
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
            backgroundColor: "black",
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
      ></div>
    </div>
  );
}

export default Joystick;