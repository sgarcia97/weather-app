"use client"
import { useState } from "react"
import location from "../../public/location.svg"
import Image from "next/image"
import Link from "next/link"

const Landing = () => {

    const [search, setSearch] = useState(null)
    const [data, setData] = useState([])

    const searchWeatherData = async (location) => {
        if(location != ""){
            const url = "https://api.weatherapi.com/v1/search.json?q="+location+"&key="+process.env.NEXT_PUBLIC_ANTI;
            const options = {
            method: "GET",
            };
    
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setData(result)
        } catch (error) {
            alert("Error getting search results")
        }
        }
    }

    return (
        <div className="landing">
            <div className="landing-title">ClimApp</div>
            <input type="search" onChange={(e)=>searchWeatherData(e.target.value)} placeholder="Search for weather in your area"/>
            <div className="search-results">{data.map((res,i)=>{
                return <div className="search-item" key={i}><Link href={`/details/${res.name}`}><Image alt="" src={location} width={20} height={20}/>{res.name}, {res.region}, {res.country}</Link></div>
            })}</div>
        </div>
    )
}

export default Landing