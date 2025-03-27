"use client"
import Image from "next/image";
import igm from "../public/globe.svg"
import Landing from "./components/Landing"
import Item from "./components/Item"
import PageTemplate from "./components/PageTemplate"
import { weatherData } from "./api/weather"
import { useState, useEffect } from "react"

const Page = () => {
  const [data, setData] = useState(null)
  useEffect(()=>{
    weatherData.then((d)=>setData(d))
  },[])

 if(!data) return <div>Loading...</div>
  return (

    
    <>
      <PageTemplate>
        <Landing/>
        <div className="section-title"><Image alt="weather" width={30} height={30} src={igm}/>{data.location.name}, {data.location.region} </div>
        <div className="section">
          <div className="section2">
            <div >Today&apos;s Temperature</div>
            <div className="highlight-val">{Math.round(data.current.temp_c)}&deg;</div>
            <div className="highlight-title">{data.current.condition.text}</div>
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
          
          <Item title="Feels like" unit="Celcius" val={Math.round(data.current.feelslike_c)}/>
          <Item title="Precipitation" unit="mm" val={data.current.precip_mm}/>
          <Item title="Wind Chill" val={Math.round(data.current.windchill_c)} unit="Celcius"/>
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
