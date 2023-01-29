import { useState } from "react";
import Form from 'react-bootstrap/Form'

interface CreateProps {
    ascean?: any;
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
}

const CreateAscean = ({ ascean, handleAsceanCreate }: CreateProps) => {
    const [saveState, setSaveState] = useState<boolean>(false)

    function handleSubmit(e: any) {
        e.preventDefault();
        async function createAscean() {
            try {
                handleAsceanCreate(ascean);
                setSaveState(true);
                } catch (err) {
                    console.log(err, '%c <- You have an error in creating a character', 'color: red')
                }
            }
            createAscean(); 
        }
  return (
    <>
    {
        saveState
        ? <h3 className="mt-3 mb-4" style={{ color: 'indigo', fontWeight: 450, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>Enjoy the Land of Hush and Tendril</h3>
        : ascean?.shareable === 'public'
            ? <Form onSubmit={handleSubmit}><button className="btn btn-lg" style={{ color: 'green', fontWeight: 450, fontVariant: 'small-caps', fontSize: 25 + 'px' }} value={ascean} type="submit" >Play as {ascean?.name}?</button></Form>
            : ''
    }
    </>
  )
}

export default CreateAscean