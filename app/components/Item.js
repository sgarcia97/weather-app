import Image from "next/image"

const Item = ({title, unit, val="", img}) => {
    return(
        <div className="item">
            <div className="item-title">{title}
                <Image src={img} alt="" width={40} height={40}/>
            </div>
            <div className="item-val">{val}<span>{unit}</span></div>
        </div>
    )
}

export default Item