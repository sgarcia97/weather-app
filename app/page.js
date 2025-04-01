"use client"
import Image from "next/image";
import igm from "../public/globe.svg"
import temp from "../public/svg/060-temperature.svg"
import Hourly from "../public/hourly.svg"
import Daily from "../public/daily-calendar.svg"
import Raindrops from "../public/weather/fill/svg/raindrops.svg"
import Cloudy from "../public/weather/fill/svg/cloudy.svg"
import Wind from "../public/weather/fill/svg/wind.svg"
import UV from "../public/weather/fill/svg/uv-index.svg"
import Visibility from "../public/weather/fill/svg/fog.svg"
import Rain from "../public/weather/fill/svg/raindrops.svg"
import Mist from "../public/weather/fill/svg/mist.svg"
import Moon from "../public/moon-stars.svg"
import Sunrise from "../public/weather/fill/svg/sunrise.svg"
import Sunset from "../public/weather/fill/svg/sunset.svg"
import Moonrise from "../public/weather/fill/svg/moonrise.svg"
import Moonset from "../public/weather/fill/svg/moonset.svg"
import Humidity from "../public/weather/fill/svg/humidity.svg"
import Temperature from "../public/weather/fill/svg/thermometer.svg"
import Pressure from "../public/weather/fill/svg/pressure-low.svg"
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

            
  
  
 if(!data) return <div className="loader"><Image src={Mist} alt="" width={50} height={50} />Loading weather...</div>
 let icon = weatherIcons.find((value)=>{
  return value.code === data.current.condition.code
})

  return (

    
    <>
      <PageTemplate>
        <Landing title="Welcome to ClimApp"/>
        <div className="section-title"><Image alt="weather" width={20} height={20} src={location}/>{data.location.name}, {data.location.country} | Last updated {data.current.last_updated}</div>
        <div className="section">
          <div className="section2">
            <div className="section-title-small"><Image src={temp} width={20} height={20} alt=""/>Today&apos;s Temperature</div>
           
            <div className="highlight-val">
            <div className={`forecast-img-large ${icon.icon}`}></div>
              <span>{Math.round(data.current.temp_c)}&deg;</span>
            <div className="highlight-desc">
              <div>Feels like {Math.round(data.current.feelslike_c)}&deg;</div>
            <div>Wind Chill {Math.round(data.current.windchill_c)}&deg;</div>
            <div className="highlight-title">{data.current.condition.text}</div>
            </div>
            </div>
            <div className="section-title-small"><Image src={Hourly} width={20} height={20} alt=""/>Hourly Forecast </div>
            <div className="hourly-wrapper">
            {
              data.forecast.forecastday.map((day,i)=>(
              day.hour.map((val,i)=>{
                let h = new Date().getHours()
                //let dd = new Date().getDate()
                //if(i >= h){
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
              //}
              })
              ))
            }
            </div>
            <div className="section-title-small"><Image src={Daily} width={20} height={20} alt=""/>Daily Forecast</div>
            <div className="forecast-wrapper">
              {
                data.forecast.forecastday.map((day,i)=>{
                  let n = new Date().getUTCDate()
                  const pattern = 'EEE dd'
                  let d = new Date(day.date).getUTCDate({weekday:'short', day:'numeric'})
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
                    <div className={`forecast-img-medium ${ic.icon}`}></div>
                    <div className="h-align"><Image alt="" width={20} height={20} src={Raindrops}/>{day.day.daily_chance_of_rain}%</div>
                    <div>{day.day.totalprecip_mm} mm</div>
                    <div className="forecast-temp">
                      <span>{Math.round(day.day.maxtemp_c)}</span>
                      <span>{Math.round(day.day.mintemp_c)}</span></div>
                  </div>
                })
              }
            </div>
            <div className="section-title-small"><Image src={Moon} width={20} height={20} alt=""/>Astronomy Data</div>
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
          <Item title="Precipitation" unit="mm" val={data.current.precip_mm} img={Rain}/>

          <Item title="Wind Speed" val={data.current.wind_kph} unit="km/h" img={Wind}/>
          <Item title="Humidity" val={data.current.humidity} unit="%" img={Humidity}/>
          <Item title="Pressure" val={data.current.pressure_mb} unit="hPa" img={Pressure}/>
          <Item title="Cloud Cover" val={data.current.cloud} unit="%" img={Cloudy}/>
          <Item title="UV Index" img={UV} val={data.current.uv}/>
          <Item title="Visibility" val={data.current.vis_km} unit="km" img={Visibility}/>
        </div>
        </div>
      </PageTemplate>
    </>
  )
}

export default Page
