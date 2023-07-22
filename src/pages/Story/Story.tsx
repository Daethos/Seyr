import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as eqpAPI from '../../utils/equipmentApi';
import HostScene from '../../game/scenes/HostScene';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFetch } from '../../game/reducers/gameState';

const Story = () => {
    const { asceanID } = useParams();
    const ascean = useSelector((state: any) => state.game.player);
    const dispatch = useDispatch();
    const [assets, setAssets] = useState([]);
    const [gameChange, setGameChange] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                dispatch(getGameFetch(asceanID));
                const assetResponse = await eqpAPI.index();
                const sanitizedAssets = await sanitizeAssets(assetResponse.data);
                setAssets(sanitizedAssets);
                setGameChange(true);
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        }; 
        fetchData(); 
    }, [asceanID, dispatch]); 

    const sanitizeAssets = async (assets: any): Promise<[]> => {
        const fields = ['weapons', 'shields', 'helmets', 'chests', 'legs', 'rings', 'amulets', 'trinkets'];
        const newAssets: any = [];
        const imageSprite = async (image: any) => {
            return image.imgURL.split('/')[2].split('.')[0];
        };

        await Promise.all(fields.map(async (field: string) => {
            await Promise.all(assets[field].map(async (item: any) => {
                const sprite = await imageSprite(item);
                newAssets.push({
                    sprite: sprite,
                    imgURL: item.imgURL,
                });
            })); 
        })); 
        return newAssets;
    }; 
        
    return (
        <div>
        { !gameChange ? ( '' ) : ( 
            <HostScene assets={assets} ascean={ascean} /> 
        ) }
        </div>
    );
};

export default Story;