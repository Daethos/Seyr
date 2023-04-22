
import * as asceanAPI from '../utils/asceanApi'

export const storyAscean = async (asceanID: string) => {
    try {
        const response = await asceanAPI.getOneAscean(asceanID);
        const stats = await asceanAPI.getAsceanStats(asceanID);
        console.log(response, ' Response', stats, ' Stats');
        return (
            { response, stats }
        );
    } catch (err: any) {
        console.log(err.message, 'Error Getting Ascean');
    };
};
