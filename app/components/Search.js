"use client"
import { useState } from "react"
import location from "../../public/location.svg"
import { searchWeather } from "../api/weather"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

const Search = ({title}) => {

    const [data, setData] = useState([])
    const router = useRouter()

    const handleSearch = async (search) => {
        await searchWeather(search).then(d=>setData(d))
    }

    return (
        <div className="search-wrapper">
            <input type="search" autoFocus onChange={(e)=>handleSearch(e.target.value)} placeholder="Search for Cities"/>
            <div className="s-results">{data.map((res,i)=>{
                return <div onClick={()=>router.push(`/details/${res.name}`)} className="search-item" key={i}><Image alt="" src={location} width={15} height={15}/><div>{res.name}, {res.country}</div></div>
            })}</div>
        </div>
    )
}

export default Search