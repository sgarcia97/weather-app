'use client'
import Location from "../../public/marker.svg"
import Image
 from "next/image"
const Favourite = ({name, country}) => {
    return(
        <div className="fav">
            <Image alt="" src={Location} width={20} height={20}/>
            <div>{name}, {country}</div>
        </div>
    )
}

export default Favourite