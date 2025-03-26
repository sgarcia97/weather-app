"use client"
import { useState } from "react"

const Landing = () => {

    const [search, setSearch] = useState("")
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="landing">
            <div className="landing-title">Your Weather Wizard</div>
            <input type="search" onChange={handleSearch} placeholder="Search for weather in your area"/>
        </div>
    )
}

export default Landing