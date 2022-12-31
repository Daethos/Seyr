import { useState, useEffect, useRef } from 'react';

interface Props {
    gameRef: any;
    text: [];
}

const DialogBox = ({ gameRef, text }: Props) => {

    const containerRef = useRef(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(100);

    useEffect(() => {
        const canvas = gameRef.current;
        if (canvas) {
            console.log(canvas, 'Canvas')
            setX(0);
            setY(canvas.offsetHeight + height);
            setWidth(canvas.offsetWidth);
        }
        const message = text.map((t, i) => {
            console.log(t, 't')
            return (
                <p key={i}>{t}</p>
            )
        })
      }, [gameRef]);

    
    return (
        <div
        ref={containerRef}
        style={{
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height,
            border: '2px solid purple',
        }}
        >
        {text}
        </div>
    );
}

export default DialogBox;