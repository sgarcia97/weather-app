
const currentData = async () => {
    const url = "https://api.weatherapi.com/v1/current.json?q=auto:ip&key="+process.env.NEXT_PUBLIC_ANTI;
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

  const forecastData = async () => {
    const url = "https://api.weatherapi.com/v1/forecast.json?q=auto:ip&days=3&aqi=yes&alerts=yes&key="+process.env.NEXT_PUBLIC_ANTI;
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

const astronomyData = async () => {
    const d = new Date('Y-m-d')
    const url = "https://api.weatherapi.com/v1/astronomy.json?q=auto:ip&dt="+d+"&key="+process.env.PUBLIC_NEXT_ANTI;
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

export const cData = currentData()
export const fData = forecastData()
//export const aData = astronomyData()

