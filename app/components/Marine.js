import Image from "next/image"
import Hightide from "../../public/weather/fill/svg/tide-high.svg";
import Lowtide from "../../public/weather/fill/svg/tide-low.svg";
import moment from "moment";

const Marine = ({data}) => {
    const imgSize = 50
    if(!data){ return <div>No data</div>} 
    return(
      
        <div>
                        <table>
                          <tbody>
                            {
                              data.error ? <div className="message">Sorry. No data for this location</div> :
                              data.forecast.forecastday[0].day.tides[0].tide.map((item,i) => {
                                
                                return <tr key={i}>
                                <td>
                                  <div className="h-align">
                                    <Image src={item.tide_type == "HIGH" ? Hightide : Lowtide} alt="" width={imgSize} height={imgSize} />
                                  </div>
                                </td>
                                <td>{item.tide_type}</td>
                                <td>{item.tide_time}</td><td>{item.tide_height_mt} meters</td>
                              </tr>
                              })
                            
}
                          </tbody>
                        </table>
                      </div>
    )
}

export default Marine