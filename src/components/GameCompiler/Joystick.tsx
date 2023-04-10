import React, { useState, useRef, useEffect } from 'react';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, MapData, debounce, getAsceanCoords, getAsceanGroupCoords } from './WorldStore';
import { throttle } from 'lodash';
type Direction = "up" | "down" | "left" | "right" | "upLeft" | "upRight" | "downLeft" | "downRight";

interface Props {
    mapState: MapData;
    onDirectionChange: (...args: any[]) => void;
    debouncedHandleDirectionChange: (...args: any[]) => void;
    joystickDisabled: boolean;
    isBlocked?: boolean;
};

const Joystick = ({ mapState, onDirectionChange, debouncedHandleDirectionChange, joystickDisabled, isBlocked }: Props) => {
    const [mobileDisabled, setMobileDisabled] = useState<boolean>(false);
    const [touchStart, setTouchStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const lastDirectionRef = useRef<string>("");
    const throttledSetPosition = throttle(setPosition, 150);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (joystickDisabled || isBlocked || mapState.joystickDisabled) return;
            const keyDirectionMap: Record<string, Direction> = {
                ArrowUp: "up",
                ArrowDown: "down",
                ArrowLeft: "left",
                ArrowRight: "right",
                
                // KeyW: "up",
                // KeyS: "down",
                // KeyA: "left",
                // KeyD: "right",
                // KeyQ: "upLeft",
                // KeyE: "upRight",
                // KeyZ: "downLeft",
                // KeyC: "downRight",
            };  
            const direction = keyDirectionMap[event.code];
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
                };
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
                    };
                    if (diagonalDirection) {
                        onDirectionChange(diagonalDirection, mapState);
                        lastDirectionRef.current = diagonalDirection;
                    };
                } else {
                    onDirectionChange(direction, mapState);
                    lastDirectionRef.current = direction;
                };
            };
        };
      
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onDirectionChange, mapState]);

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        if (joystickDisabled || isBlocked) return;
        event.preventDefault();
        setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (joystickDisabled || isBlocked) {
            handleTouchEnd();
            return;
        };
        event.preventDefault();
        const touchMove = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        const dx = touchMove.x - touchStart.x;
        const dy = touchMove.y - touchStart.y;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 50);
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);
        throttledSetPosition({ x, y });
        let direction: string = "";

        const angleDegrees = angle * 180 / Math.PI;
        if (angleDegrees >= -22.5 && angleDegrees < 22.5) {
            debouncedHandleDirectionChange("right", mapState);
            direction = "right";
        } else if (angleDegrees >= 22.5 && angleDegrees < 67.5) {
            debouncedHandleDirectionChange("downRight", mapState);
            direction = "downRight";
        } else if (angleDegrees >= 67.5 && angleDegrees < 112.5) {
            debouncedHandleDirectionChange("down", mapState);
            direction = "down";
        } else if (angleDegrees >= 112.5 && angleDegrees < 157.5) {
            debouncedHandleDirectionChange("downLeft", mapState);
            direction = "downLeft";
        } else if (angleDegrees >= 157.5 || angleDegrees < -157.5) {
            debouncedHandleDirectionChange("left", mapState);
            direction = "left";
        } else if (angleDegrees >= -157.5 && angleDegrees < -112.5) {
            debouncedHandleDirectionChange("upLeft", mapState);
            direction = "upLeft";
        } else if (angleDegrees >= -112.5 && angleDegrees < -67.5) {
            debouncedHandleDirectionChange("up", mapState);
            direction = "up";
        } else {
            debouncedHandleDirectionChange("upRight", mapState);
            direction = "upRight";  
        }
        if (lastDirectionRef.current !== direction && !joystickDisabled && !isBlocked) {
            lastDirectionRef.current = direction;
        };
    };
    
    const handleTouchEnd = () => {
        throttledSetPosition.cancel();
        setPosition({ x: 0, y: 0 });
    };

    const handleBlockJoystick = (shouldBlock: boolean) => {
        setMobileDisabled(shouldBlock);
    };

    return (
        <div
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
};

// export default Joystick;

const withJoystickBlocker = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return class extends React.Component<P & Props> {
      shouldJoystickBeBlocked = () => {
        // console.log(this.props.joystickDisabled, "joystickDisabled")
        if (this.props.joystickDisabled) {
            return true;
        } else {
            return false;
        };
    };
  
      render() {
        const isBlocked = this.shouldJoystickBeBlocked();
        
        const blockedStyle = {
            zIndex: 1,
            borderRadius: "50%",
            backgroundColor: "black",
            height: "100px",
            gridColumnStart: 3,
            gridRowStart: 9,
            width: "100px",
            marginLeft: "47.5%",
            marginTop: "5%",
        };

        return (
          <>
            {isBlocked && <div className="joystick-blocked" style={blockedStyle} />}
            <WrappedComponent {...this.props} isBlocked={isBlocked} />
          </>
        );
      }
    };
  };
  
  export default withJoystickBlocker(Joystick);