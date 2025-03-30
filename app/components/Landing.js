"use client"
import { useState } from "react"

const Landing = () => {

    const [search, setSearch] = useState(null)
    const [data, setData] = useState(null)
    
    const searchWeatherData = async (location) => {
        const url = "https://api.weatherapi.com/v1/current.json?q="+location+"&key="+process.env.NEXT_PUBLIC_ANTI;
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
            <input type="search" onChange={handleSearch} placeholder="Search for weather in your area"/>
            <div>Start searching</div>
        </div>
    )
}

export default Landing