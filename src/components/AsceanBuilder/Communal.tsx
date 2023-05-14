import Form from 'react-bootstrap/Form';

interface Props {
  editState: any;
  setEditState: any;
}

const Communal = ({ editState, setEditState }: Props) => {
  function handleVisibility(e: { target: { name: any; value: any; }; }) {
    let { name, value }  = e.target;
    editState[name] = value;
    setEditState({...editState});
    console.log(editState);
  }
  return (
    <> 
    <div className='actions'>
    <h3>Communal Visibility</h3></div>
    <p style={{ color: '#fdf6d8', fontSize: "14px" }}>
    Whether or not you show up in the Community Feed and can be searched for by other users.
    </p>
        <Form.Select onChange={handleVisibility} name="visibility" className="my-3">
            <option value={editState.visibility}>Select Preference</option>
            <option value="public" label="Public">public</option>
            <option value="private" label="Private">private</option>
        </Form.Select>
        {/* <div className='actions'>
    <h3>Communal Sharibility</h3></div>
    <p style={{ color: '#fdf6d8', fontSize: "14px" }}>
    Whether or not other users can clone your character to play with.
    </p>
        <Form.Select onChange={handleVisibility} name="shareable" className="my-3">
            <option value={editState?.shareable}>Select Preference</option>
            <option value="public" label="Public">public</option>
            <option value="private" label="Private">private</option>
        </Form.Select> */}
        </>
  )
}

export default Communal