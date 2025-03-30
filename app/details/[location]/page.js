"use client"
import Image from "next/image"
import temp from "../../../public/svg/060-temperature.svg"
import fore from "../../../public/svg/021-summer.svg"
import location from "../../../public/location.svg"
import Landing from "../../components/Landing"
import Item from "../../components/Item"
import PageTemplate from "../../components/PageTemplate"
import { fData, forecastdat, currentdat } from "../../api/weather"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

const Page = () => {
    const [data, setData] = useState(null)
    const params = useParams()
    useEffect(()=>{
        const forecastData = async () => {
            const url = "https://api.weatherapi.com/v1/forecast.json?q="+params.location+"&days=3&aqi=yes&alerts=yes&key="+process.env.NEXT_PUBLIC_ANTI;
            const options = {
                method: "GET",
            };
                
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result)
            }catch(error) {
               return error.message
            }
          }
        forecastData()
    },[params])
   
  return (

   <>
      <PageTemplate>
        <Landing/>
        <div className="section-title"><Image alt="weather" width={30} height={30} src={location}/>{data.location.name}, {data.location.region} </div>
        <div className="section">
          <div className="section2">
            <div className="section-title-small"><Image src={temp} width={30} height={30} alt=""/>Today&apos;s Temperature</div>
            <div className="highlight-val"><span>{Math.round(data.current.temp_c)}&deg;</span>
            <div className="highlight-desc">
              <div>Feels like {Math.round(data.current.feelslike_c)}&deg;</div>
            <div>Wind Chill {Math.round(data.current.windchill_c)}&deg;</div>
            <div className="highlight-title">{data.current.condition.text}</div>
            </div>
            </div>
            
            <div className="section-title-small"><Image src={fore} width={30} height={30} alt=""/>Forecast for the next 3 days</div>
            <div className="forecast-wrapper">
              {
                data.forecast.forecastday.map((day,i)=>{
                  let n = new Date().getUTCDate()
                  let d = new Date(day.date).getUTCDate()
                  let fday = d
                  if(n == d){
                    fday = "Today"
                  }
                  return <div key={i} className="forecast">
                    <div>{d}</div>
                    <div>{day.day.daily_chance_of_rain}%</div>
                    <div>{day.day.totalprecip_mm}</div>
                    <div className="forecast-temp">
                      <span>{Math.round(day.day.maxtemp_c)}</span>
                      <span>{Math.round(day.day.mintemp_c)}</span></div>
                  </div>
                })
              }
            </div>
            <div>
              <table>
                <tbody>
                <tr>
                  <td>Sunrise</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Sunset</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Moonrise</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Moonset</td>
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
