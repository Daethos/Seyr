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
    fontSize: "24px",
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
    width: "100vw",
    fontSize: "16px",
    padding: "10px",
  },
  godBorderConstitution: {
    marginBottom: "15%",
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: "50vw",
    border: "2px solid #fdf6d8",
    boxShadow: "0 0 2em #fdf6d8",
  },
  godBorderStrength: {
    marginBottom: "15%",
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: "50vw",
    border: "2px solid #ff0000",
    boxShadow: "0 0 2em #ff0000",
  },
  godBorderAgility: {
    marginBottom: "15%",
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: "50vw",
    border: "2px solid #00ff00",
    boxShadow: "0 0 2em #00ff00",
  },
  godBorderAchre: {
    marginBottom: "15%",
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: "50vw",
    border: "2px solid blue",
    boxShadow: "0 0 2em blue",
  },
  godBorderCaeren: {
    marginBottom: "15%",
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: "50vw",
    border: "2px solid purple",
    boxShadow: "0 0 2em purple",
  },
  godBorderKyosir: {
    marginBottom: "15%",
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: "50vw",
    border: "2px solid gold",
    boxShadow: "0 0 2em gold",
  },
};

interface TypewriterProps {
  stringText: string;
  styling?: React.CSSProperties;
  performAction: (action: string) => void;
};

const Typewriter = ({ stringText, styling, performAction }: TypewriterProps) => {
  const el = useRef(null);

  (window as any).handleButton = (button: string) => {
    console.log(button, "Button Clicked")
    performAction(button);
  };

  const applyStyles = (element: HTMLElement, styles: React.CSSProperties) => {
    for (const [property, value] of Object.entries(styles)) {
      element.style[property as any] = value;
    };
  };

  const applyEventListeners = (element: HTMLElement) => {
    const functionName = element?.attributes?.["data-function-name" as any]?.value;
    element.setAttribute('onclick', `handleButton('${functionName}')`);
  };

  const styleHTML = ( html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const traverseElement = (element: any) => {
      if (element?.attributes?.classname?.value) {
        applyStyles(element as HTMLElement, styleMap[element?.attributes?.classname?.value]);
      };
      if (element?.tagName === "BUTTON" && element?.attributes?.["data-function-name"]?.value) {
        applyEventListeners(element as HTMLElement);
      };
      for (const child of element.children as any) {
        traverseElement(child);
      };
    };
    traverseElement(doc.body);
    return doc.body.innerHTML;
  };

  useEffect(() => {
    const clean = styleHTML(stringText);
    const typedContent = {
      strings: [clean],
      typeSpeed: 20,
      backSpeed: 20,
      showCursor: false,
    };
    const typed = new Typed(el.current, typedContent);

    return () => {
      typed.destroy();
    };
  }, [stringText, el]);

  return (
    <div id="typewriter" ref={el} style={styling} />
  );
};

export default Typewriter;