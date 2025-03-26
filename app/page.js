"use client"
import Image from "next/image";
import igm from "../public/globe.svg"
import Landing from "./components/Landing"
import Item from "./components/Item"
import PageTemplate from "./components/PageTemplate"
import { cdata } from "./api/weather"
import { useState, useEffect } from "react"

const Page = () => {
  const [data, setData] = useState({})
  useEffect(()=>{cdata.then(d => {setData(d); })},[])
  console.log(data)
  return (

    <>
     
      <PageTemplate>
        <Landing/>
        <div className="section-title"><Image alt="weather" width={30} height={30} src={igm}/>{data.location.name}, {data.location.region} </div>
        <div className="section">
          <div className="section2">
            <div >Today&apos;s Temperature</div>
            <div className="highlight-val">{data.current.temperature}&deg;</div>
            <div className="highlight-title">{data.current.weather_descriptions}</div>
            <div>
              <table>
                <tr>
                  <td>Sunrise</td>
                  <td>{data.current.astro.sunrise}</td>
                </tr>
                <tr>
                  <td>Sunset</td>
                  <td>{data.current.astro.sunset}</td>
                </tr>
                <tr>
                  <td>Moonrise</td>
                  <td>{data.current.astro.moonrise}</td>
                </tr>
                <tr>
                  <td>Moonset</td>
                  <td>{data.current.astro.moonset}</td>
                </tr>
              </table>
           </div>
          </div>
        <div className="section1">
          
          <Item title="Feels like" unit="Celcius" val={data.current.feelslike}/>
          <Item title="Precipitation" unit="mm" val={data.current.precip}/>
          <Item title="Wind Speed" val={data.current.wind_speed} unit="km/h"/>
          <Item title="Humidity" val={data.current.humidity} unit="%"/>
          <Item title="Pressure" val={data.current.pressure} unit="hPa"/>
          <Item title="Cloud Cover" val={data.current.cloudcover}/>
          <Item title="UV Index" val={data.current.uv_index}/>
          <Item title="Visibility" val={data.current.visibility} unit="km"/>
        </div>
        </div>
      </PageTemplate>
    </>
  )
}

export default Page
