"use client"
import { useState } from "react"
import location from "../../public/location.svg"
import { searchWeather } from "../api/weather"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

const Landing = ({title, desc}) => {

    const [data, setData] = useState([])
    const router = useRouter()

    const handleSearch = async (search) => {
        if(search != ''){
        await searchWeather(search).then(d=>setData(d))
        }
    }

    return (
        <div className="landing">
            <div className="landing-title">{title}</div>
            <div style={{color:'#999'}}>{desc}</div>
            <div className="landing-section-search">
            <input type="search" onChange={(e)=>handleSearch(e.target.value)} placeholder="Search for weather in your area"/>
            <div className="search-results">{data.map((res,i)=>{
                return <div onClick={()=>router.push(`/details/${res.name}`)} className="search-item" key={i}><Image alt="" src={location} width={20} height={20}/>{res.name}, {res.region}, {res.country}</div>
            })}</div>
            </div>
        </div>
    )
}

export default Landing