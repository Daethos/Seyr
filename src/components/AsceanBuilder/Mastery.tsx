import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { setAsceanState } from '../../game/reducers/gameState';

interface Props {
  asceanState?: any;
  setState?: React.Dispatch<any>;
};

const Mastery = ({ asceanState, setState }: Props) => {
  const dispatch = useDispatch();
  const masteryState = [
    { name: 'Constitution' },
    { name: 'Strength' },
    { name: 'Agility' },
    { name: 'Achre' },
    { name: 'Caeren' },
    { name: 'Kyosir' },
  ];

  function handleMastery(origin: any) {
    if (setState) {
      setState({
        ...asceanState,
        'mastery': origin.target.value,
      });
    } else {
      dispatch(setAsceanState({
        ...asceanState,
        'mastery': origin.target.value
      }));
    };
  };
  return (
    <div className="actions">
      <h3>Attribute Mastery</h3>
      <Form.Select value={asceanState.mastery} onChange={handleMastery} className="mt-4">
        <option>Armor Selection Here</option>
          {masteryState.map((mastery: any, index: number) => {
              return (
                  <option value={mastery.name} key={index}>{mastery.name}</option>
              )
          })}
      </Form.Select>
    </div>
  );
};

export default Mastery;