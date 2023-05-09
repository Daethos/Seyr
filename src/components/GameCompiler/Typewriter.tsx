import React from 'react';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';


// interface Props {
//     text: string;
// };
  
// const formatText = (text: string) => {
//     const formattedText: React.ReactNode[] = [];
//     const chunks = text.split(/(<[^>]+>)/g);
//     let currentTag: string | undefined;
  
//     chunks.forEach((chunk, index) => {
//       if (chunk.startsWith('<')) {
//             currentTag = chunk;
//       } else if (currentTag) {
//             const tag = currentTag.substring(1, currentTag.length - 1);
//             let style: React.CSSProperties = {};
//             if (tag === 'h6') {
//                 style = { fontSize: '24px', fontWeight: 'bold' };
//             } else if (tag === 'p') {
//                 style = { fontSize: '16px' };
//             } else if (tag === 'span') {
//                 style = { color: 'red' };
//             };
//             formattedText.push( React.createElement( tag, { key: index, style }, chunk ) );
//             currentTag = undefined;
//         } else {
//             formattedText.push(chunk);
//         }
//     });
  
//     return formattedText;
// };
  
// const TypewriterText: React.FC<Props> = ({ text }) => {
//     const formattedText = formatText(text);
//     return (
//       <>
//         {formattedText.map((text, index) => (
//           <span key={index}>{text}</span>
//         ))}
//       </>
//     );
// };

type StyleMap = { [key: string]: React.CSSProperties };

const styleMap: StyleMap = {
  rebukeButton: {
    float: "right",
    fontSize: "24px",
    zIndex: 9999,
    marginLeft: "90vw",
    color: "red"
  },
  journeyText: {
    color: "#fdf6d8",
    fontSize: "14px"
  },
  whisperText: {
    fontSize: "24px"
  },
  otherText: {
    color: "red",
    textShadow: '1.5px 1.5px 1.5px darkred',
  },
  devotedText: {
    color: "darkmagenta",
    textShadow: '1.5px 1.5px 1.5px purple',
  },
  adherentText: {
    color: "orangered",
    textShadow: '1.5px 1.5px 1.5px red',
  },
  button: {
    zIndex: 9999,
    border: 'none',
    textDecoration: 'none',
  },
  typewriterContainer: {
    marginTop: "50%",
    color: "gold",
    display: 'inline-block',
    textAlign: 'center',
    textShadow: '1.5px 1.5px 1.5px darkgoldenrod',
    overflowY: 'auto',
    width: '100%',
  },
};
  
const applyStyles = (element: HTMLElement, styles: React.CSSProperties) => {
    for (const [property, value] of Object.entries(styles)) {
        element.style[property as any] = value;
    };
};
  
const applyClassStyles = (element: Element, className: string, styles: React.CSSProperties) => {
    if (element.classList.contains(className)) {
      applyStyles(element as HTMLElement, styles);
    }
    for (const child of element.children as any) {
      applyClassStyles(child, className, styles);
    }
};
  
const styleHTML = (html: string, styles: Record<string, React.CSSProperties>) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const traverseElement = (element: any) => {
        if (element?.attributes?.classname?.value) {
            applyStyles(element as HTMLElement, styleMap[element?.attributes?.classname?.value]);
        }
        for (const child of element.children as any) {
          traverseElement(child);
        }
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
      }
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
            smartBackspace: false, // don't delete characters as user types
            startDelay: 1000, // delay before typing starts
            preStringTyped: (arrayPos: any, self: any) => {
                // scroll to bottom before typing each line
                const element = document.getElementById('typewriter');
                let scrollTop: number | undefined;
                if (element instanceof HTMLElement) {
                    scrollTop = element.scrollHeight;
                }
                if (el && element) {
                    (el.current as any).scrollTop = scrollTop;
                }
                  
                  
            },
            onStringTyped: (arrayPos: any, self: any) => {
                const typedTextEl = self.el;
                const typedTextContainer = typedTextEl.parentNode;
                const styleString = typedTextEl.getAttribute('style');
                const style = document.createElement('style');
                style.textContent = styleString;
                typedTextContainer.appendChild(style);
                console.log(typedTextEl, "typedTextEl")
                const line = self.el.querySelector('.typed-line:last-child');
                console.log(line, "line")
                // const lineHeight = parseInt(getComputedStyle(line).lineHeight, 10);
                const lineHeight = 20;
                if (el.current) {
                    (el.current as any).scrollTop  += lineHeight;
                } ;
            },
        };
        const typed = new Typed(el.current, typedContent);
        return () => typed.destroy();
    }, [stringText]);
    
    return (
            <div id='typewriter' ref={el} style={styling} />
    );
};

export default Typewriter;