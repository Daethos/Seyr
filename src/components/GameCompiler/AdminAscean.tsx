import AsceanImageCard from "../AsceanImageCard/AsceanImageCard"
import GamePlayerStats from "./GamePlayerStats"

interface AdminAsceanProps {
    ascean: any;
    loading: boolean;
}

const AdminAscean = ({ ascean, loading }: AdminAsceanProps) => {
    
    return (
        <div  style={{ marginTop: 0 + '%' }} >
            <div className="game-block-top">
                <GamePlayerStats attributes={ascean.attributes} player={ascean.ascean} magicalDefense={ascean.defense.magicalDefenseModifier} magicalPosture={ascean.defense.magicalPosture} physicalDefense={ascean.defense.physicalDefenseModifier} physicalPosture={ascean.defense.physicalPosture} />
            </div>
            <div style={{ marginTop: 10 + '%' }}>
            <AsceanImageCard
                weapon_one={ascean.combat_weapon_one}
                weapon_two={ascean.combat_weapon_two}
                weapon_three={ascean.combat_weapon_three}
                shield={ascean.ascean.shield}
                helmet={ascean.ascean.helmet}
                chest={ascean.ascean.chest}
                legs={ascean.ascean.legs}
                amulet={ascean.ascean.amulet}
                ring_one={ascean.ascean.ring_one}
                ring_two={ascean.ascean.ring_two}
                trinket={ascean.ascean.trinket}
                gameDisplay={true}
                loading={loading}
                key={ascean.ascean._id}
                />
            </div>
            <div className="actions">
            </div>
        </div>
    )
}

export default AdminAscean