import Form from 'react-bootstrap/Form';

interface Props {
  asceanState?: any;
  setAsceanState?: React.Dispatch<any>;
};

const Preference = ({ asceanState, setAsceanState }: Props) => {
  const preferenceState = [
    { name: 'Plate-Mail' },
    { name: 'Chain-Mail' },
    { name: 'Leather-Mail' },
    { name: 'Leather-Cloth' },
  ];
  function handlePreference(origin: any) {
    setAsceanState!({
        ...asceanState,
        'preference': origin.target.value,
    });
  };
  return (
    <div className="actions">
      <h3>Armor Preference</h3>
      <Form.Select value={asceanState.preference} onChange={handlePreference} className="mt-4">
        <option>Armor Selections Here</option>
          {preferenceState.map((preference: any, index: number) => {
              return (
                  <option value={preference.name} key={index}>{preference.name}</option>
              )
          })}
      </Form.Select>
    </div>
  );
};

export default Preference;