
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

export const astronomyData = async (location = 'auto:ip') => {
    const url = `https://api.weatherapi.com/v1/astronomy.json?q=${location}&dt=${moment().format('YYYY-MM-DD')}&key=${process.env.NEXT_PUBLIC_ANTI}`;
    const options = { method: "GET" };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.astronomy;
    } catch (error) {
      return error.message;
    }
  };
  
  
   export const marineData = async (location = 'auto:ip') => {
    const url = `https://api.weatherapi.com/v1/marine.json?q=${location}&key=${process.env.NEXT_PUBLIC_ANTI}`;
    const options = { method: "GET" };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.forecast;
    }  catch (error) {
      return error.message;
    }
  };
  export const parseAstronomyData = (data) => {
    const astro = data.astro || {};
     return {
      sunrise: astro.sunrise || "N/A",
      sunset: astro.sunset || "N/A",
      moonrise: astro.moonrise || "N/A",
      moon_phase: astro.moon_phase || "N/A",
    };
  };
  
  export const parseMarineData = (data) => {
    const marineHour = data.forecastday?.[0]?.hour?.[0] || {};
      return {
      waterTemp: marineHour.water_temp_c ? `${marineHour.water_temp_c}°C` : "N/A",
      waveHeight: marineHour.swell_height_m ? `${marineHour.swell_height_m} m` : "N/A",
      windSpeed: marineHour.wind_kph ? `${marineHour.wind_kph} km/h` : "N/A",
    };
  };
  