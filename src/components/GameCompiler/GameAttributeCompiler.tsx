import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'

interface Props {
    ascean: any;
}

const GameAttributeCompiler = ({ ascean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<any>([])

    useEffect(() => {
        asceanAttributeCompiler()
      }, [])

    async function asceanAttributeCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(ascean._id)
            setAttributes(response.data.data.attributes)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
        }
    }

    if (loading) {
        return (
            <Loading NavBar={true} />
        )
    }
    return (
        <>
        <div className="game-attributes" style={{  }}>
        <div className="game-constitution" style={{ marginTop: -25 + 'px' }}>
            <h4>CON</h4>
                <p className="mt-2" id="con-box">{attributes.totalConstitution}
                </p>
                <p className="" id="">
                    [ {attributes.totalConstitution < 10 ? '- ' + attributes.constitutionMod : '+ ' + attributes.constitutionMod} ]</p>
        </div>
        <div className="game-strength" style={{ marginTop: -25 + 'px' }}>
            <h4>STR</h4>
            <p className="mt-2" id="str-box">{attributes.totalStrength}</p>
            <p className="" id="">[ {attributes.totalStrength < 10 ? '- ' + attributes.strengthMod : '+ ' + attributes.strengthMod} ]</p>
        </div>
        <div className="game-agility" style={{ marginTop: -25 + 'px' }}>
            <h4>AGI</h4>
            <p className="mt-2" id="">{attributes.totalAgility}</p>
            <p className="" id="">[ {attributes.totalAgility < 10 ? '- ' + attributes.agilityMod : '+ ' + attributes.agilityMod} ]</p>
            
        </div>
        <div className="game-achre">
            <h4>ACH</h4>
            <p className="mt-2" id="ach-box">{attributes.totalAchre}
            </p>
            <p className="" id="">
                [ {attributes.totalAchre < 10 ? '- ' + attributes.achreMod : '+ ' + attributes.achreMod} ]</p>
            
        </div>
        <div className="game-caeren">
            <h4>CAER</h4>
            <p className="mt-2" id="caer-box">{attributes.totalCaeren}</p>
            <p className="" id="">[ {attributes.totalCaeren < 10 ? '- ' + attributes.caerenMod : '+ ' + attributes.caerenMod} ]</p>
        </div>
        <div className="game-kyosir">
            <h4>KYO</h4>
            <p className="mt-2" id="kyo-box">{attributes.totalKyosir}</p>
            <p className="" id="">[ {attributes.totalKyosir < 10 ? '- ' + attributes.kyosirMod : '+ ' + attributes.kyosirMod} ]</p>
        </div>
        </div>
        </>
    )
}

export default GameAttributeCompiler