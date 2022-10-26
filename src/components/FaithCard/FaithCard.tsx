import './FaithCard.css'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface FaithProps {
    faith?: any;
}

const FaithCard = ({ faith }: FaithProps) => {

    const faithPopover = (
        <Popover className="origin-popover" id="popover">
            <Popover.Header id="popover-header" className="header" as="h2"> 
            {faith.name}
            <span id="popover-image"><img src={faith.iconography} alt={faith.name} id="origin-pic" /></span>
            </Popover.Header>
            <Popover.Body id="popover-body" className="body">
            {faith.origin}
            </Popover.Body>
        </Popover>
    )

  return (
        <OverlayTrigger trigger="click" placement="auto-start" overlay={faithPopover}>
            <Button 
                variant="" 
                className="m-2 p-2 faith-button btn btn-outline"
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                >{faith.name}</Button>
        </OverlayTrigger>
  )
}

export default FaithCard