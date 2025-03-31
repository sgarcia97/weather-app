"use client"
import Image from "next/image";
import igm from "../public/globe.svg"
import temp from "../public/svg/060-temperature.svg"
import Hourly from "../public/hourly.svg"
import Daily from "../public/daily-calendar.svg"
import Raindrops from "../public/weather/fill/svg/raindrops.svg"
import Moon from "../public/moon-stars.svg"
import Sunrise from "../public/weather/fill/svg/sunrise.svg"
import Sunset from "../public/weather/fill/svg/sunset.svg"
import Moonrise from "../public/weather/fill/svg/moonrise.svg"
import Moonset from "../public/weather/fill/svg/moonset.svg"
import fore from "../public/svg/021-summer.svg"
import location from "../public/location.svg"
import Landing from "./components/Landing"
import Item from "./components/Item"
import PageTemplate from "./components/PageTemplate"
import { weatherIcons } from "./api/weathericons"
import { fData, forecastdat, currentdat } from "./api/weather"
import { useState, useEffect } from "react"

const Page = () => {
  
  const [data, setData] = useState(null)
  const [def, setDef] = useState("Calgary")

  useEffect(()=>{
    fData.then((d)=>setData(d))
  },[])
console.log(data)

            
  //let icon = weatherIcons.find((value)=>{
    //    return value.code === data.current.condition.code
     // })
  
 if(!data) return <div>Loading...</div>

  return (

    
    <>
      <PageTemplate>
        <Landing title="Welcome to ClimApp"/>
        <div className="section-title"><Image alt="weather" width={30} height={30} src={location}/>{data.location.name}, {data.location.country} </div>
        <div className="section">
          <div className="section2">
            <div className="section-title-small"><Image src={temp} width={30} height={30} alt=""/>Today&apos;s Temperature</div>
           <div className={`forecast-img`}></div>
            <div className="highlight-val"><span>{Math.round(data.current.temp_c)}&deg;</span>
            <div className="highlight-desc">
              <div>Feels like {Math.round(data.current.feelslike_c)}&deg;</div>
            <div>Wind Chill {Math.round(data.current.windchill_c)}&deg;</div>
            <div className="highlight-title">{data.current.condition.text}</div>
            </div>
            </div>
            <div className="section-title-small"><Image src={Hourly} width={30} height={30} alt=""/>Hourly Forecast </div>
            <div className="hourly-wrapper">
            {
              
              data.forecast.forecastday[0].hour.map((val,i)=>{
                let h = new Date().getHours()
                if(i >= h){
                let hf = i
                if(i == h){
                  hf = "Now"
                }

                const ico = weatherIcons.find((vall)=>{
                  return vall.code === val.condition.code
                })
                return <div className="hour" key={i}>
                  <div>{hf}</div>
                  <div className={`forecast-img ${ico.icon}`}></div>
                  <div>{Math.round(val.temp_c)}&deg; | <span style={{color:"#999999"}}>{Math.round(val.windchill_c)}&deg;</span></div></div>
              }
              })
            }
            </div>
            <div className="section-title-small"><Image src={Daily} width={30} height={30} alt=""/>Daily Forecast</div>
            <div className="forecast-wrapper">
              {
                data.forecast.forecastday.map((day,i)=>{
                  let n = new Date().getUTCDate()
                  let d = new Date(day.date).getUTCDate()
                  let fday = d
                  if(n == d){
                    fday = "Today"
                  }
                  
                  const ic = weatherIcons.find((val)=>{
                    return val.code === day.day.condition.code
                  })
                
                  return <div key={i} className="forecast">
                    <div>{d}</div>
                    <div>{day.day.condition.code}</div>
                    <div className={`forecast-img-medium ${ic.icon}`} width={25} height={25} unoptimized/>
                    <div className="h-align"><Image alt="" width={20} height={20} src={Raindrops}/>{day.day.daily_chance_of_rain}%</div>
                    <div>{day.day.totalprecip_mm} mm</div>
                    <div className="forecast-temp">
                      <span>{Math.round(day.day.maxtemp_c)}</span>
                      <span>{Math.round(day.day.mintemp_c)}</span></div>
                  </div>
                })
              }
            </div>
            <div className="section-title-small"><Image src={Moon} width={30} height={30} alt=""/>Astronomy Data</div>
            <div>
              <table>
                <tbody>
                <tr>
                  <td><div className="h-align"><Image src={Sunrise} alt="" width={25} height={25}/>Sunrise</div></td>
                  <td></td>
                </tr>
                <tr>
                  <td><div className="h-align"><Image src={Sunset} alt="" width={25} height={25}/>Sunset</div></td>
                  <td></td>
                </tr>
                <tr>
                  <td><div className="h-align"><Image src={Moonrise} alt="" width={25} height={25}/>Moonrise</div></td>
                  <td></td>
                </tr>
                <tr>
                  <td><div className="h-align"><Image src={Moonset} alt="" width={25} height={25}/>Moonset</div></td>
                  <td></td>
                </tr>
                </tbody>
              </table>
           </div>
          </div>
        <div className="section1">
          <Item title="Precipitation" unit="mm" val={data.current.precip_mm}/>

          <Item title="Wind Speed" val={data.current.gsut_kph} unit="km/h"/>
          <Item title="Humidity" val={data.current.humidity} unit="%"/>
          <Item title="Pressure" val={data.current.pressure_mb} unit="hPa"/>
          <Item title="Cloud Cover" val={data.current.cloud} unit="%"/>
          <Item title="UV Index" val={data.current.uv}/>
          <Item title="Visibility" val={data.current.vis_km} unit="km"/>
        </div>
        </div>
      </PageTemplate>
    </>
  )
}

export default Page
