import React from 'react';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

type StyleMap = { [key: string]: React.CSSProperties };

const styleMap: StyleMap = {
  rebukeButton: {
    float: "right",
    fontSize: "24px",
    zIndex: 9999,
    marginLeft: "90vw",
    marginTop: "5vh",
    color: "red",
    border: 'none',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  journeyText: {
    marginTop: "10vh",
    color: "#fdf6d8",
    fontSize: "14px"
  },
  whisperText: {
    fontSize: "24px"
  },
  otherText: {
    fontSize: "20px",
    color: "red",
    textShadow: '1.5px 1.5px 1.5px darkred',
  },
  devotedText: {
    fontSize: "20px",
    color: "darkmagenta",
    textShadow: '1.5px 1.5px 1.5px purple',
  },
  adherentText: {
    fontSize: "20px",
    color: "orangered",
    textShadow: '1.5px 1.5px 1.5px red',
  },
  button: {
    zIndex: 9999,
    border: 'none',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  typewriterContainer: {
    color: "gold",
    display: 'inline-block',
    textAlign: 'center',
    textShadow: '1.5px 1.5px 1.5px darkgoldenrod',
    overflowY: 'auto',
    width: '100%',
    fontSize: "16px",
    padding: "10px",
  },
  godBorderConstitution: {
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: '50vw',
    border: '2px solid #fdf6d8',
    boxShadow: '0 0 2em #fdf6d8',
  },
  godBorderStrength: {
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: '50vw',
    border: '2px solid #ff0000',
    boxShadow: '0 0 2em #ff0000',
  },
  godBorderAgility: {
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: '50vw',
    border: '2px solid #00ff00',
    boxShadow: '0 0 2em #00ff00',
  },
  godBorderAchre: {
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: '50vw',
    border: '2px solid blue',
    boxShadow: '0 0 2em blue',
  },
  godBorderCaeren: {
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: '50vw',
    border: '2px solid purple',
    boxShadow: '0 0 2em purple',
  },
  godBorderKyosir: {
    marginTop: "15%",
    borderRadius: "50%",
    maxWidth: '50vw',
    border: '2px solid gold',
    boxShadow: '0 0 2em gold',
  }
};
  
const applyStyles = (element: HTMLElement, styles: React.CSSProperties) => {
    for (const [property, value] of Object.entries(styles)) {
        element.style[property as any] = value;
    };
};
  
const applyClassStyles = (element: Element, className: string, styles: React.CSSProperties) => {
    if (element.classList.contains(className)) {
      applyStyles(element as HTMLElement, styles);
    };
    for (const child of element.children as any) {
      applyClassStyles(child, className, styles);
    };
};
  
const styleHTML = (html: string, styles: Record<string, React.CSSProperties>) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const traverseElement = (element: any) => {
        if (element?.attributes?.classname?.value) {
            applyStyles(element as HTMLElement, styleMap[element?.attributes?.classname?.value]);
        };
        for (const child of element.children as any) {
            traverseElement(child);
        };
    };    
    traverseElement(doc.body);
    return doc.body.innerHTML;
};
  
const createStyledText = (text: string, classNames: string[]): string => {
    let styledText = text;
    classNames.forEach((className) => {
        const styles = styleMap[className];
        if (styles) {
            styledText = styleHTML(styledText, { [className]: styles });
        };
    });
    return styledText;
};
  

interface TypewriterProps {
    stringText: string;
    styling?: React.CSSProperties;
};

const Typewriter = ({ stringText, styling }: TypewriterProps) => {
    const el = useRef(null);

    useEffect(() => {
        const classNames = ["typewriterContainer", "rebukeButton", "journeyText", "whisperText", "devotedText", "adherentText", "button"];
        const cleanString = createStyledText(stringText, classNames);

        const typedContent = {
            strings: [cleanString],
            typeSpeed: 10,
            backSpeed: 10, 
            showCursor: false,
            autoInsertCss: true,
            // smartBackspace: false,
            // preStringTyped: (arrayPos: any, self: any) => {
            //     // scroll to bottom before typing each line
            //     const element = document.getElementById('typewriter');
            //     let scrollTop: number | undefined;
            //     if (element instanceof HTMLElement) {
            //         scrollTop = element.scrollHeight;
            //     }
            //     if (el && element) {
            //         (el.current as any).scrollTop = scrollTop;
            //     }
                  
                  
            // },
            // onStringTyped: (arrayPos: any, self: any) => {
            //     const typedTextEl = self.el;
            //     const typedTextContainer = typedTextEl.parentNode;
            //     const styleString = typedTextEl.getAttribute('style');
            //     const style = document.createElement('style');
            //     style.textContent = styleString;
            //     typedTextContainer.appendChild(style);
            //     console.log(typedTextEl, "typedTextEl")
            //     const line = self.el.querySelector('last-child');
            //     console.log(line, "line")
            //     const lineHeight = parseInt(getComputedStyle(line).lineHeight, 10);
            //     // const lineHeight = 20;
            //     if (el.current) {
            //         (el.current as any).scrollTop  += lineHeight;
            //     } ;
            // },
        };
        const typed = new Typed(el.current, typedContent);
        return () => typed.destroy();
    }, [stringText]);
    
    return (
            <div id='typewriter' ref={el} style={styling} />
    );
};

export default Typewriter;