import Right from "../../public/angle-right.svg"
import Set from "../../public/settings.svg"
import Image from "next/image"

const Setting = ({name, img, onclick}) => {
    return(
        <div className="setting" onClick={onclick}>
            <div className="setting-section">
            <Image alt="" src={img} width={20} height={20}/>
            <div>{name}</div>
            </div>
            <Image alt="" src={Right} width={20} height={20}/>
        </div>
    )
}

export default Setting