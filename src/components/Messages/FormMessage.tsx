import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
    friendProfile: any;
    handleChange: any;
    handleSubmit: any
    messageDraft: any;
};

const FormMessage = ({ friendProfile, handleChange, handleSubmit, messageDraft }: Props) => {
      
    return (
        <Form onSubmit={handleSubmit} id="chat-form" className=''>
        <InputGroup className="" id="chat-input" size="lg">
            <Form.Control
            as="textarea"
            style={{ maxHeight: 50 + 'px' }}
            className='stat-block wide'
            name='message'
            placeholder={'Text ' + friendProfile.username.charAt(0).toUpperCase() + friendProfile.username.slice(1) + '!'}
            aria-label="Large"
            value={messageDraft.message}
            onChange={handleChange}
            />
        <Button type="submit" variant="" className="text-success">Submit</Button>
        </InputGroup>
        </Form>
    );
};

export default FormMessage;