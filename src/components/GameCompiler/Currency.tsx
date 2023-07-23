import { Player } from "./GameStore";

interface CurrencyProps {
    ascean: Player;
};
const Currency = ({ ascean }: CurrencyProps) => {
    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
            <br /><br />
        </div>
    );
};

export default Currency;