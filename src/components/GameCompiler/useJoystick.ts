import { useState, useRef } from "react";

type JoystickPosition = {
  x: number;
  y: number;
};

type LowPassFilter = {
  prevValue: number;
  alpha: number;
};

const useJoystick = () => {
  const [position, setPosition] = useState<JoystickPosition>({ x: 0, y: 0 });
    const lowPassFilterX = useRef<LowPassFilter>({ prevValue: 0, alpha: 0.2 });
    const lowPassFilterY = useRef<LowPassFilter>({ prevValue: 0, alpha: 0.2 });

    const handleJoystickMove = (x: number, y: number) => {
        const filteredX =
        lowPassFilterX.current.prevValue +
        lowPassFilterX.current.alpha * (x - lowPassFilterX.current.prevValue);
        lowPassFilterX.current.prevValue = filteredX;

        const filteredY =
        lowPassFilterY.current.prevValue +
        lowPassFilterY.current.alpha * (y - lowPassFilterY.current.prevValue);
        lowPassFilterY.current.prevValue = filteredY;

        setPosition({ x: filteredX, y: filteredY });
    };

    return { position, handleJoystickMove };
};

export default useJoystick;