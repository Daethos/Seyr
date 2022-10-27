import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'

interface Props {
    ascean?: any;
}

const AsceanAttributeCompiler = ({ ascean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<any>([])

    useEffect(() => {
        asceanAttributeCompiler()
      }, [])

    async function asceanAttributeCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(ascean._id)
            //console.log(response.data.data.attributes, 'Response Compiling Attributes')
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
        {/* <div className="actions">
            <h3>Attributes</h3>
        </div> */}
        <div className="abilities">
        <div className="ability-strength">
            <h4>CON</h4>
                <p className="mt-2" id="con-box">{attributes.totalConstitution}<br /> ({attributes.rawConstitution} + {attributes.equipConstitution})</p>
                <p className="" id="">[ {attributes.totalConstitution < 10 ? '- ' + attributes.constitutionMod : '+ ' + attributes.constitutionMod} ]</p>
        </div>
        <div className="ability-dexterity">
            <h4>STR</h4>
            <p className="mt-2" id="str-box">{attributes.totalStrength}<br /> ({attributes.rawStrength} + {attributes.equipStrength})</p>
            <p className="" id="">[ {attributes.totalStrength < 10 ? '- ' + attributes.strengthMod : '+ ' + attributes.strengthMod} ]</p>
        </div>
        <div className="ability-constitution">
            <h4>AGI</h4>
            <p className="mt-2" id="">{attributes.totalAgility}<br /> ({attributes.rawAgility} + {attributes.equipAgility})</p>
            <p className="" id="">[ {attributes.totalAgility < 10 ? '- ' + attributes.agilityMod : '+ ' + attributes.agilityMod} ]</p>
            
        </div>
        <div className="ability-intelligence">
            <h4>ACH</h4>
            <p className="mt-2" id="ach-box">{attributes.totalAchre}<br /> ({attributes.rawAchre} + {attributes.equipAchre})</p>
            <p className="" id="">[ {attributes.totalAchre < 10 ? '- ' + attributes.achreMod : '+ ' + attributes.achreMod} ]</p>
            
        </div>
        <div className="ability-wisdom">
            <h4>CAER</h4>
            <p className="mt-2" id="caer-box">{attributes.totalCaeren}<br /> ({attributes.rawCaeren} + {attributes.equipCaeren})</p>
            <p className="" id="">[ {attributes.totalCaeren < 10 ? '- ' + attributes.caerenMod : '+ ' + attributes.caerenMod} ]</p>
        </div>
        <div className="ability-wisdom">
            <h4>KYO</h4>
            <p className="mt-2" id="kyo-box">{attributes.totalKyosir}<br /> ({attributes.rawKyosir} + {attributes.equipKyosir})</p>
            <p className="" id="">[ {attributes.totalKyosir < 10 ? '- ' + attributes.kyosirMod : '+ ' + attributes.kyosirMod} ]</p>
        </div>
        </div>
        </>
    )
}

export default AsceanAttributeCompiler