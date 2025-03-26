
export const currentWeatherData = async () => {
    const url = "https://api.weatherstack.com/current?access_key="+process.env.PUBLIC_NEXT_ANTI+"&query=fetch:ip";
    const options = {
        method: "GET",
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
    console.error(error);
    }
}

export const searchWeatherData = async (location) => {
    const url = "https://api.weatherstack.com/current?access_key="+process.env.PUBLIC_NEXT_ANTI+"&query="+location;
    const options = {
        method: "GET",
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
    console.error(error);
    }
}

export const data = {
    "request": {
        "type": "IP",
        "query": "50.99.179.137",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Calgary",
        "country": "Canada",
        "region": "Alberta",
        "lat": "51.083",
        "lon": "-114.083",
        "timezone_id": "America/Edmonton",
        "localtime": "2025-03-26 00:32",
        "localtime_epoch": 1742949120,
        "utc_offset": "-6.0"
    },
    "current": {
        "observation_time": "06:32 AM",
        "temperature": 5,
        "weather_code": 116,
        "weather_icons": [
            "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
        ],
        "weather_descriptions": [
            "Partly cloudy"
        ],
        "astro": {
            "sunrise": "07:25 AM",
            "sunset": "08:00 PM",
            "moonrise": "06:37 AM",
            "moonset": "04:29 PM",
            "moon_phase": "Waning Crescent",
            "moon_illumination": 16
        },
        "air_quality": {
            "co": "444",
            "no2": "52.17",
            "o3": "34",
            "so2": "17.76",
            "pm2_5": "14.245",
            "pm10": "16.465",
            "us-epa-index": "1",
            "gb-defra-index": "1"
        },
        "wind_speed": 12,
        "wind_degree": 65,
        "wind_dir": "ENE",
        "pressure": 1018,
        "precip": 0,
        "humidity": 61,
        "cloudcover": 75,
        "feelslike": 3,
        "uv_index": 0,
        "visibility": 24,
        "is_day": "no"
    }
}