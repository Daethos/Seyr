import Form from 'react-bootstrap/Form';

interface Props {
    asceanState: any;
    setAsceanState: any;
  }

const Hardcore = ({ asceanState, setAsceanState }: Props) => {
    function handleHardcore(e: { target: { name: any; value: any; }; }) {
        let { name, value }  = e.target;
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        console.log(value,typeof value, '<- Name and Value in Visibility / Shareable Handler');
        asceanState[name] =  value;
        setAsceanState({...asceanState});
        console.log(asceanState);
      }
  return (
    <>
    <div className='actions'>
    <h3>Hardcore</h3></div>
    <p style={{ color: 'purple', fontSize: "14px" }}>
        Whether or not you're toggled hardcore. This wildly affects the game and is not recommended for new players. If it was implemented. Soon to come.
    </p>
    <Form.Select onChange={handleHardcore} name="hardcore" className="my-3">
        <option value={asceanState?.hardcore}>Select Preference</option>
        <option value='true' label="True">{true}</option>
        <option value='false' label="False">{false}</option>
    </Form.Select>
    </>
  )
}

export default Hardcore