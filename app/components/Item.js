import Image from "next/image"
import Raindrops from "../../public/weather/fill/svg/raindrops.svg"

export const Item = ({title, unit, val="", img}) => {
    return(
        <div className="item">
            <div className="item-title">{title}
                <Image src={img} alt="" width={40} height={40}/>
            </div>
            <div className="item-val">{val}<span>{unit}</span></div>
        </div>
    )
}

export const Hour = ({date, icon, temp, wind}) => {
    return(
        <div className="hour">
            <div>{date}</div>
            <div className={`forecast-img ${icon}`}></div>
            <div>{Math.round(temp)}&deg; | <span style={{color:"#999999"}}>{Math.round(wind)}&deg;</span></div>
        </div>
    )
}

export const Day = ({wdata}) => {
    return(
        <div className="forecast">
                            <div>{wdata.date}</div>
                        
                            <div className={`forecast-img-medium ${wdata.icon}`}></div>
                            <div className="h-align"><Image alt="" width={20} height={20} src={Raindrops}/>{wdata.chance}%</div>
                            <div>{wdata.amt} mm</div>
                            <div className="forecast-temp">
                              <span>{Math.round(wdata.max)}</span>
                              <span>{Math.round(wdata.min)}</span></div>
                          </div>
    )
}

