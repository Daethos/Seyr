import * as feelingAPI from '../../utils/feelingApi'
import * as asceanAPI from '../../utils/asceanApi'
import { RefAttributes, useEffect, useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import Loading from '../Loading/Loading';

interface Props {
    ascean?: any;
    loggedUser?: any;
}

const FeelingsCard = ({ loggedUser, ascean }: Props) => {
  const [asceanState, setAsceanState] = useState(ascean)
  const [loading, setLoading] = useState<boolean>(false)
  const [asceanFeelings, setAsceanFeelings] = useState(ascean)
  const [likeStat, setLikeStat] = useState<any>([])
  const [dislikeStat, setDislikeStat] = useState<any>([])
  const [doubleDislikeStat, setDoubleDislikeStat] = useState<any>([])

  const renderLikesTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ fontVariant: 'small-caps', color: 'yellow' }}>
        { likeStat.length > 0 ?
          likeStat?.map((like: any, index: number) => 
            <> { index <= 3 ? (likeStat?.length) === (index + 1) ? likeStat?.length === 1 ? 
                <>{like}</> 
            : likeStat?.length === 2 ? 
                <> and {like}</> 
            : likeStat?.length === 3 ? 
                <> and {like}</> 
            : likeStat?.length === 4 ? 
                <>and {like}</> 
            : <>and {like}</> 
            : <>{like}, {' '}</> 
            : index > 3 ? 
                <>{like} and {likeStat?.length - index} more</> 
            : <>and {like}</>
            }</>
          )
          : 'No Likes Yet!'
        }
      </div>
    </Tooltip>
  );

  const renderDislikesTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ fontVariant: 'small-caps', color: 'yellow' }}>
        { dislikeStat.length > 0 ?
       dislikeStat?.map((like: any, index: number) => <>{index < 3 ? (dislikeStat?.length) === (index + 1) ? dislikeStat?.length === 1 ? <>{like}</> : <>and {like}</> : <>{like},{' '}</> : index > 4 ? <>{like} and {dislikeStat?.length - index} more</> : <>and {like}</>}</>
      )
        : 'No Dislikes Yet!'
         }
      </div>
    </Tooltip>
  );

  const renderDoubleDislikesTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props} show={doubleDislikeStat > 0 ? true : false}>
      <div style={{ fontVariant: 'small-caps', color: 'yellow' }}>
        { doubleDislikeStat.length > 0 ? 
       doubleDislikeStat?.map((like: any, index: number) => <>{index < 3 ? (doubleDislikeStat?.length) === (index + 1) ? doubleDislikeStat?.length === 1 ? <>{like}</> : <>and {like}</> : <>{like},{' '}</> : index > 4 ? <>{like} and {doubleDislikeStat?.length - index} more</> : <>and {like}</>}</>
      )
      : 'No Double Dislikes Yet!'
      }
      </div>
    </Tooltip>
  );

  const likedIndex = asceanFeelings.likes.findIndex(
    (like: { username: any; }) => like?.username === loggedUser?.username
  );

  const dislikedIndex = asceanFeelings.dislikes.findIndex(
    (dislike: { username: any; }) => dislike?.username === loggedUser?.username
  );

  const doubleDislikedIndex = asceanFeelings.double_dislikes.findIndex(
    (doubleDislike: { username: any; }) => doubleDislike?.username === loggedUser?.username
  );

  const likeColor = likedIndex > -1 ? "blue" : "blue";
  const dislikeColor = dislikedIndex > -1 ? "red" : "red";
  const doubleDislikeColor = doubleDislikedIndex > -1 ? "red" : "red";

  const getAscean = async () => {
        try {
            const response = await asceanAPI.getOneAscean(ascean._id);
            console.log(response, ' <- the response in getAscean')
            setAsceanState(response.data)
            console.log(ascean, '<- Ascean focused upon.')
        } catch (err: any) {
            setLoading(false)
            console.log(err.message);
        };
   };

  const likeHandler =
    likedIndex > -1
      ? () => removeFeeling(asceanFeelings?.likes[likedIndex]._id, 'like') // user has liked the ascean 
      : () => addFeeling(asceanFeelings?._id, 'like');  // user hasn't liked the ascean

  const dislikeHandler =
    dislikedIndex > -1
      ? () => removeFeeling(asceanFeelings?.dislikes[dislikedIndex]._id, 'dislike') 
      : () => addFeeling(asceanFeelings?._id, 'dislike');  

  const doubleDislikeHandler =
    doubleDislikedIndex > -1
      ? () => removeFeeling(asceanFeelings?.double_dislikes[doubleDislikedIndex]._id, 'doubleDislike') 
      : () => addFeeling(asceanFeelings?._id, 'doubleDislike');  

  useEffect(() => {
    likesArray();
  }, [asceanState]);

  useEffect(() => {
    dislikesArray();
  }, [asceanState]);

  useEffect(() => {
    doubleDislikesArray();
  }, [asceanState]);

  const likesArray = async () => {
    try {
      const response = await asceanState.likes.map((like: { username: string }) => {
        console.log(like.username, 'Like?')
        let newArray: any[] = [];
        newArray = [...newArray, like.username]
        return (
          newArray
        );
      });
      console.log(response, 'Response Finding Likes');
      setLikeStat(response);

    } catch (err: any) {
      console.log(err.message, 'Error Retrieving Feelings');
    };
  };

  const dislikesArray = async () => {
    try {
      const dislikeResponse = await asceanState.dislikes.map((like: { username: string }) => {
        console.log(like.username, 'Dislike?');
        let newArray: any[] = [];
        newArray = [...newArray, like.username];
        return (
          newArray
        );
      });
      console.log(dislikeResponse, 'Response Finding Dislikes');
      setDislikeStat(dislikeResponse);
    } catch (err: any) {
      console.log(err.message, 'Error Retrieving Feelings');
    };
  };

  const doubleDislikesArray = async () => {
    try {
      const doubleDislikeResponse = await asceanState.double_dislikes.map((like: { username: string }) => {
        console.log(like.username, 'Double Dislike?');
        let newArray: any[] = [];
        newArray = [...newArray, like.username];
        return (
          newArray
        );
      });
      console.log(doubleDislikeResponse, 'Response Finding Double Dislikes');
      setDoubleDislikeStat(doubleDislikeResponse);
    } catch (err: any) {
      console.log(err.message, 'Error Retrieving Feelings');
    };
  };

  async function addFeeling(asceanID: any, feeling: string) {
    console.log('Ascean ID: ', asceanID, 'Feeling to Create: ', feeling);
    try {
        const response = await feelingAPI.createFeeling(asceanID, feeling);
        console.log(response.data, 'Response in Adding a Feeling');
        setAsceanFeelings(response.data);
        getAscean();
    } catch (err: any) {
        console.log(err.message, '<- Error adding a feeling!')
    };
  };

  async function removeFeeling(asceanID: any, feeling: string) {
      console.log('Ascean ID: ', asceanID, 'Feeling to Remove: ', feeling)
      try {
          const response = await feelingAPI.removeFeeling(asceanID, feeling);
          console.log(response.data, 'Response in Removing a Feeling');
          setAsceanFeelings(response.data);
          getAscean();
      } catch (err: any) {
          console.log(err.message, '<- Error adding a feeling!')
      };
  };

  if (loading) {
    return (
      <Loading NavBar={true} />
    );
  };

  return (
    <div className="actions">
      <h3 id="feelings" 
        className='svg-wrapper'
        style={{ marginTop: 40 + 'px' }}>

    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderLikesTooltip}>
      <svg onClick={likeHandler} 
        color={likeColor} xmlns="http://www.w3.org/2000/svg" 
        name="like" width="16" height="16" 
        fill="currentColor" 
        className="bi bi-hand-thumbs-up feeling-icon mb-4" 
        id={dislikedIndex > -1 || doubleDislikedIndex > -1 ? 'disable-feeling' : ''}
        viewBox="0 0 16 16">
      { likedIndex > -1
        ? <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
        : <> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/> </>        
      }
      </svg>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderDislikesTooltip}>
      <svg onClick={dislikeHandler} 
        color={dislikeColor} xmlns="http://www.w3.org/2000/svg" 
        name="dislike" width="16" height="16" fill="currentColor" 
        className="bi bi-hand-thumbs-down feeling-icon mb-4" viewBox="0 0 16 16" 
        id={likedIndex > -1 || doubleDislikedIndex > -1 ? 'disable-feeling' : ''}
      >
      { dislikedIndex > -1
          ? <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
          : <> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/> </>
      }
      </svg>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderDoubleDislikesTooltip}>
      <svg onClick={doubleDislikeHandler} 
        color={doubleDislikeColor} xmlns="http://www.w3.org/2000/svg" 
        name="double-dislike" width="16" height="16" fill="currentColor" 
        className="bi bi-hand-thumbs-down feeling-icon mb-4" viewBox="0 0 16 16"
        id={likedIndex > -1 || dislikedIndex > -1 ? 'disable-feeling' : ''}
      >
        { doubleDislikedIndex > -1 
        ? <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5z"/>
          : <> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z"/> </>
        }
      </svg>
      </OverlayTrigger>
      </h3>
      
  </div>
  );
};

export default FeelingsCard;