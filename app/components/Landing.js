"use client"
import { useState } from "react"

const Landing = () => {

    const [search, setSearch] = useState(null)
    const [data, setData] = useState([])
    
    const searchWeatherData = async (location) => {
        const url = "https://api.weatherapi.com/v1/search.json?q="+location+"&key="+process.env.NEXT_PUBLIC_ANTI;
        const options = {
            method: "GET",
        };
    
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setData(result)
        } catch (error) {
        console.error(error);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="landing">
            <div className="landing-title">Climapp</div>
            <input type="search" onChange={(e)=>searchWeatherData(e.target.value)} placeholder="Search for weather in your area"/>
            <div>{data.map((res,i)=>{
                return <div key={i}>{res.name}</div>
            })}</div>
        </div>
    )
}

export default Landing