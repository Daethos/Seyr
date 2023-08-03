import Form from 'react-bootstrap/Form';

interface Props {
  asceanState?: any;
  setAsceanState?: React.Dispatch<any>;
};

const Sex = ({ asceanState, setAsceanState }: Props) => {
  const sex = [
    { name: 'Man' },
    { name: 'Woman' },
  ];

  function handleSex(origin: any) {
    setAsceanState!({
        ...asceanState,
        'sex': origin.target.value,
    });
  };
  return (
    <>
    <div className="actions">
      <Form.Select value={asceanState.sex} onChange={handleSex} className="mt-4">
        <option>Sex Selection Here</option>
          {sex.map((sex: any, index: number) => {
              return (
                  <option value={sex.name} key={index}>{sex.name}</option>
              )
          })}
      </Form.Select>
    </div>
    </>
  );
};

export default Sex;