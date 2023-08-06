import React from "react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

type StyleMap = { [key: string]: React.CSSProperties };

const styleMap: StyleMap = {
  rebukeButton: {
    float: "right",
    fontSize: "24px",
    zIndex: 9999,
    marginLeft: "90vw",
    marginTop: "5vh",
    color: "red",
    border: "none",
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  journeyText: {
    marginTop: "5vh",
    color: "#fdf6d8",
    fontSize: "14px",
  },
  whisperText: {
    fontSize: "32px",
  },
  otherText: {
    fontSize: "18px",
    color: "red",
    textShadow: "1.5px 1.5px 1.5px darkred",
  },
  devotedText: {
    fontSize: "18px",
    color: "darkmagenta",
    textShadow: "1.5px 1.5px 1.5px purple",
  },
  adherentText: {
    fontSize: "18px",
    color: "orangered",
    textShadow: "1.5px 1.5px 1.5px red",
  },
  button: {
    zIndex: 9999,
    border: "none",
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  typewriterContainer: {
    color: "gold",
    display: "inline-block",
    textAlign: "center",
    textShadow: "1.5px 1.5px 1.5px darkgoldenrod",
    overflowY: "auto",
    width: "100%",
    fontSize: "16px",
    padding: "10px",
    fontVariant: "small-caps",
  },
  godBorderConstitution: {
    marginBottom: "15%",
    marginTop: "5%",
    borderRadius: "50%",
    maxWidth: "50%",
    border: "2px solid #fdf6d8",
    boxShadow: "0 0 3em #fdf6d8",
  },
  godBorderStrength: {
    marginBottom: "15%",
    marginTop: "5%",
    borderRadius: "50%",
    maxWidth: "50%",
    border: "2px solid #ff0000",
    boxShadow: "0 0 3em #ff0000",
  },
  godBorderAgility: {
    marginBottom: "15%",
    marginTop: "5%",
    borderRadius: "50%",
    maxWidth: "50%",
    border: "2px solid #00ff00",
    boxShadow: "0 0 3em #00ff00",
  },
  godBorderAchre: {
    marginBottom: "15%",
    marginTop: "5%",
    borderRadius: "50%",
    maxWidth: "50%",
    border: "2px solid blue",
    boxShadow: "0 0 3em blue",
  },
  godBorderCaeren: {
    marginBottom: "15%",
    marginTop: "5%",
    borderRadius: "50%",
    maxWidth: "50%",
    border: "2px solid purple",
    boxShadow: "0 0 3em purple",
  },
  godBorderKyosir: {
    marginBottom: "15%",
    marginTop: "5%",
    borderRadius: "50%",
    maxWidth: "50%",
    border: "2px solid gold",
    boxShadow: "0 0 3em gold",
  },
  greenMarkup: {
    color: "#fdf6d8",
    textShadow: "1.5px 1.5px 1.5px green",
    fontSize: "20px",
    fontWeight: 700,
    display: 'inline-block'
  },
  blueMarkup: {
    color: "#fdf6d8",
    textShadow: "1.5px 1.5px 1.5px blue",
    fontSize: "20px",
    fontWeight: 700,
    display: 'inline-block'
  },
  purpleMarkup: {
    color: "#fdf6d8",
    textShadow: "1.5px 1.5px 1.5px purple",
    fontSize: "20px",
    fontWeight: 700,
    display: 'inline-block'
  },
  darkorangeMarkup: {
    color: "#fdf6d8",
    textShadow: "1.5px 1.5px 1.5px darkorange",
    fontSize: "20px",
    fontWeight: 700,
    display: 'inline-block'
  },
  redMarkup: {
    color: "red",
    textShadow: "1.5px 1.5px 1.5px #fdf6d8",
    fontSize: "20px",
    fontWeight: 700,
    display: 'inline-block'
  },
  goldMarkup: {
    color: "gold",
    textShadow: "1.5px 1.5px 1.5px #fdf6d8",
    fontSize: "20px",
    fontWeight: 700,
    display: 'inline-block'
  },
};

interface TypewriterProps {
  stringText: string;
  styling?: React.CSSProperties;
  performAction: (action: string) => void;
};

const Typewriter = ({ stringText, styling, performAction }: TypewriterProps) => {
  const el = useRef<HTMLDivElement | null>(null);

  (window as any).handleButton = (button: string) => {
    console.log(button, "Button Clicked");
    performAction(button);
  };

  const applyStyles = (element: HTMLElement, styles: React.CSSProperties): void => {
    for (const [property, value] of Object.entries(styles)) {
      element.style[property as any] = value;
    };
  };

  const applyEventListeners = (element: HTMLElement): void => {
    const functionName = element?.attributes?.["data-function-name" as any]?.value;
    element.setAttribute('onclick', `handleButton('${functionName}')`);
  };

  const styleHTML = ( html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const traverseElement = (element: any): void => {
      if (element?.attributes?.classname?.value) applyStyles(element as HTMLElement, styleMap[element?.attributes?.classname?.value]);
      
      if (element?.tagName === "BUTTON" && element?.attributes?.["data-function-name"]?.value) applyEventListeners(element as HTMLElement);
      
      for (const child of element.children as any) traverseElement(child);
      
    };
    traverseElement(doc.body);
    return doc.body.innerHTML;
  };

  useEffect(() => {
    const clean = styleHTML(stringText);
    const typedContent = {
      strings: [clean],
      typeSpeed: 10,
      backSpeed: 15,
      showCursor: false,
    };
    const typed = new Typed(el.current, typedContent);
    if (el.current) el.current.scrollTop = el.current.scrollHeight;
    
    return () => {
      typed.destroy();
    };
  }, [stringText]);

  return (
    <div id="typewriter" ref={el} style={styling} />
  );
};

export default Typewriter;