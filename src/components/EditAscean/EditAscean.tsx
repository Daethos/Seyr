import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../Loading/Loading'; 
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Character from '../AsceanBuilder/Character';
import Communal from '../AsceanBuilder/Communal'
import Origin from '../AsceanBuilder/Origin';
import Sex from '../AsceanBuilder/Sex';

interface Props {
    editAscean: (vaEsai: Object) => Promise<void>;
    createSuccess: boolean;
    setCreateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditAscean = ({ editAscean, createSuccess, setCreateSuccess }: Props) => {
    const [ascean, setAscean] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const { asceanID } = useParams();
    const [originModalShow, setOriginModalShow] = React.useState<boolean>(false);
    const [editState, setEditState] = useState<any>({});

    const getAscean = useCallback(async () => {
        setLoading(true);
        try {
            const response = await asceanAPI.getOneAscean(asceanID);
            setAscean(response.data);
            setEditState(response.data);
            setCreateSuccess(false);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit');
            setLoading(false);
        };
    }, [asceanID]);

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean, createSuccess]);
   
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        async function asceanVaEsai() {
            try {
                await editAscean(editState);
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit')
            };
        };
        asceanVaEsai();
    };


    if (loading) {
        return (
            <Loading />
        );
    };

    return (
        <Row className="justify-content-center my-3">
            <h3 style={{ color: '#fdf6d8', textAlign: 'center' }}>Edit Character</h3>
        <Form className="stat-block wide my-3" id="new-ascean" onSubmit={handleSubmit}>
        <hr className="orange-border" />
        <div className="section-left">
            <Character asceanState={editState} setAsceanState={setEditState} key={ascean._id} />
            <Sex asceanState={editState} setAsceanState={setEditState} /> 
            <div className="top-stats">
            <svg height="5" width="100%" className="tapered-rule mt-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <Origin asceanState={editState} setAsceanState={setEditState} originModalShow={originModalShow} setOriginModalShow={setOriginModalShow} />
            <img src={process.env.PUBLIC_URL + '/images/' + editState.origin + '-' + editState.sex + '.jpg'} id="ascean-pic" />
            </div>
        </div>
        <div className="section-right">
            <div className="actions">
                <h3>Eccentricities & Equipment</h3>
                <div className='property-block'>
                { ascean && (
                    <AsceanImageCard
                        weapon_one={ascean?.weapon_one}
                        weapon_two={ascean?.weapon_two}
                        weapon_three={ascean?.weapon_three}
                        shield={ascean?.shield}
                        helmet={ascean?.helmet}
                        chest={ascean?.chest}
                        legs={ascean?.legs}
                        amulet={ascean?.amulet}
                        ring_one={ascean?.ring_one}
                        ring_two={ascean?.ring_two}
                        trinket={ascean?.trinket}
                        key={ascean._id}
                    />
                ) }
                </div>
            </div>
            <div className="actions">
                <div className='property-block'>
                <Communal editState={editState} setEditState={setEditState} />
                </div>
            </div>
        </div>
        <button 
            className="btn" 
            value={editState} 
            style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: '25px' }}
            type="submit">
                Update {ascean.name}
        </button>
        <hr className="orange-border bottom" />
    </Form>
    </Row>
    );
};

export default EditAscean;