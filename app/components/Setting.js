import Right from "../../public/angle-right.svg"
import Set from "../../public/settings.svg"
import Image from "next/image"

const Setting = ({name, img={Right}}) => {
    return(
        <div className="setting">
            <div className="setting-section">
            <Image alt="" src={img} width={20} height={20}/>
            <div>{name}</div>
            </div>
            <Image alt="" src={Right} width={20} height={20}/>
        </div>
    )
}

export default Setting