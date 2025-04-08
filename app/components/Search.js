"use client";
import { useState, useEffect } from "react";
import location from "../../public/location.svg";
import { searchWeather } from "../api/weather";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Search = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const router = useRouter();


    const handleSearch = async (search) => {
        if(search != ''){
        await searchWeather(search).then(d=>setData(d))
        }else{
          setData(null)
      }
    }


  return (
    <div className="search-wrapper">
      <input
        type="search"
        autoFocus
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for Cities"
      />
      <div className="s-results">
        {data && data.map((res, i) => {
          return (
            <div
              onClick={() => router.push(`/details/${res.name}`)}
              className="search-item"
              key={i}
            >
              <Image alt="" src={location} width={15} height={15} />
              <div>
                {res.name}, {res.country}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
