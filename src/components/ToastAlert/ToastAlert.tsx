// import { useEffect, useState } from 'react'
// import Toast from 'react-bootstrap/Toast';

// interface Props {
//   error: any;
//   setError: React.Dispatch<any>;
// }

// const ToastAlert = ({ error, setError }: Props) => {
//   const [show, setShow] = useState(false);
//   useEffect(() => {
//     setShow(true);
//     if (show) {
//       setTimeout(() => {
//         setShow(false);
//         setError({ title: '', content: '' });
//       }, 3000);
//     }
//   }, [error]);

//   return (
//     <>
//     {
//       error?.title ?
//       <Toast 
//       onClose={() => setShow(false)} show={show} delay={3000} autohide bg='black' style={{ background: 'red', zIndex: 1000 }}
//       >
//         <Toast.Header className='text-danger bg-black'>
//           <img
//             src="holder.js/20x20?text=%20"
//             className="rounded me-2"
//             alt=""
//           />
//           <strong className="me-auto">{error?.title}</strong>
//           <small>Just Now...</small>
//         </Toast.Header>
//         <Toast.Body className='text-danger' style={{ fontWeight: 600 }}>{error?.content}</Toast.Body>
//       </Toast>
//       : ''
//     }
//     </>
//   )
// }

// export default ToastAlert

import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

interface Props {
  error: any;
  setError: any;
}

const ToastAlert = ({ error, setError }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error?.title) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setError({ title: '', content: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleClose = () => {
    setShow(false);
    setError({ title: '', content: '' });
  };

  const renderToast = () => {
    if (error?.title) {
      return (
        <Toast
          onClose={handleClose}
          show={show}
          delay={3000}
          autohide
          bg="black"
          style={{ background: 'red', zIndex: 1000 }}
        >
          <Toast.Header className="text-danger bg-black">
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{error?.title}</strong>
            <small>Just Now...</small>
          </Toast.Header>
          <Toast.Body className="text-danger" style={{ fontWeight: 600 }}>
            {error?.content}
          </Toast.Body>
        </Toast>
      );
    } else {
      return null;
    }
  };

  return <>{renderToast()}</>;
};

export default ToastAlert;
