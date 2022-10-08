import Placeholder from 'react-bootstrap/Placeholder';
import './Loading.css';

export default function Loading() {
    // Try a different size than xs={12} for perhaps more interesting resutls! Maybe other colors
    return (
        <div className="" id="placeholder"> 
        <Placeholder as="h1" animation="glow">
            <Placeholder className="" xs={12} bg="danger" size="lg"  />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="warning" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="success" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="primary" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="info" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="danger" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="warning" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="success" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="primary" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="info" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="danger" size="lg"  />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="warning" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="success" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="primary" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="info" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="danger" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="warning" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="mt-1" xs={12} bg="success" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="glow">
            <Placeholder className="mt-1" xs={12} bg="primary" size="lg" />
        </Placeholder>
        <Placeholder as="h1" animation="wave">
            <Placeholder className="" xs={12} bg="info" size="lg" />
        </Placeholder>
        {/* <Placeholder as="h1" animation="glow">
            <Placeholder xs={12} bg="danger" size="lg"  />
        </Placeholder> */}
        {/* <Placeholder as="h1" animation="wave">
            <Placeholder xs={12} bg="warning" size="lg" />
        </Placeholder> */}
        </div>
    );
}