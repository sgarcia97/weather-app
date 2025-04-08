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

export const Hour = ({date, icon, temp, condition, wind}) => {
    return(
        <div className="hour">
            <div className="hour-sect">
            <div>{date}</div>
            <div className={`forecast-img-medium ${icon}`}></div>
            </div>
            <div className="hour-sect">
            <div className="hour-condition">{condition}</div>
            <div>{Math.round(temp)}&deg; | <span style={{color:"#999999"}}>{Math.round(wind)}&deg;</span></div>
            </div>
        </div>
    )
}

export const Day = ({wdata}) => {
    return(
        <div className="forecast">
            <div className="forecast-sect">
                <div style={{minWidth:60, maxWidth:60}}>{wdata.date}</div>       
                <div className={`forecast-img ${wdata.icon}`}></div>
                <div className="h-align" style={{minWidth:60, maxWidth:60}}><Image alt="" width={20} height={20} src={Raindrops}/>{wdata.chance}%</div>
                <div className="forecast-sect">{wdata.amt}</div>
            </div>
            
            <div className="forecast-temp">
                <span>{Math.round(wdata.max)}&deg;</span>
                <span style={{color:"#999999"}}>{Math.round(wdata.min)}&deg;</span></div>
            </div>
    )
}

