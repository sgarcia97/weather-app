
import moment from "moment";

export const forecastData = async (location='auto:ip') => {
    const url = `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=7&aqi=yes&alerts=yes&key=${process.env.NEXT_PUBLIC_ANTI}`;
    const options = {
        method: "GET",
    };
        
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    }catch(error) {
       return error.message
    }
  }

export const searchWeather = async (search) => {
    if(location != ""){
        const url = `https://api.weatherapi.com/v1/search.json?q=${search}&key=${process.env.NEXT_PUBLIC_ANTI}`;
        const options = {
        method: "GET",
        };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        alert("Error getting search results")
    }
    }
}

export const astronomyData = async (location='auto:ip') => {
    const d = new Date()
    const url = `https://api.weatherapi.com/v1/astronomy.json?q=${location}&dt=${moment(d).format('YYYY-MM-DD')}&key=${process.env.NEXT_PUBLIC_ANTI}`;
    const options = {
        method: "GET",
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return result
    } catch (error) {
        return error.message
    }
}

