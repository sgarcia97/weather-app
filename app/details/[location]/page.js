"use client";
import moment from "moment";
import Image from "next/image";
import temp from "../../../public/svg/060-temperature.svg";
import fore from "../../../public/svg/021-summer.svg";
import Hourly from "../../../public/hourly.svg";
import Daily from "../../../public/daily-calendar.svg";
import Mist from "../../../public/weather/fill/svg/mist.svg";
import Raindrops from "../../../public/weather/fill/svg/raindrops.svg";
import Cloth from "../../../public/clothes-hanger.svg";
import Refresh from "../../../public/refresh-arrow.svg";
import Cloudy from "../../../public/weather/fill/svg/cloudy.svg";
import Wind from "../../../public/weather/fill/svg/wind.svg";
import UV from "../../../public/weather/fill/svg/uv-index.svg";
import Visibility from "../../../public/weather/fill/svg/fog.svg";
import Rain from "../../../public/weather/fill/svg/raindrops.svg";
import Humidity from "../../../public/weather/fill/svg/humidity.svg";
import Temperature from "../../../public/weather/fill/svg/thermometer.svg";
import Pressure from "../../../public/weather/fill/svg/pressure-low.svg";
import Sunrise from "../../../public/weather/fill/svg/sunrise.svg";
import Sunset from "../../../public/weather/fill/svg/sunset.svg";
import Moonrise from "../../../public/weather/fill/svg/moonrise.svg";
import Moonset from "../../../public/weather/fill/svg/moonset.svg";
import Moon from "../../../public/moon-stars.svg";
import location from "../../../public/location.svg";
import Clothing from "@/app/components/Clothing";
import Astronomy from "@/app/components/Astronomy";
import Marine from "@/app/components/Marine";
import Anchor from "../../../public/anchor.svg"
// import heartFilled from "../../../public/heart-filled.svg";
// import heartInitial from "../../../public/heart-initial.svg";
import { weatherIcons } from "../../api/weathericons";
import Landing from "../../components/Landing";
import { Item, Day, Hour } from "../../components/Item";
import PageTemplate from "../../components/PageTemplate";
import { forecastData, astronomyData, marineData } from "../../api/weather";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/lib/authContext";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "@/app/services/dataServices";
import { Heart } from "react-feather";

const Page = () => {
  const [data, setData] = useState(null);
  const [adata, setAData] = useState(null);
  const [mdata, setMData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [degree, setDegree] = useState(false)
  const params = useParams();
  const { user } = useAuth();

  const handleRefresh = async () => {
    await forecastData(params.location).then((d) => setData(d));

    console.log('refreshed')
  }

  const handleDegree = (e) => {
    setDegree(!degree)
   //sessionStorage.setItem('deg',!degree)
  }

  useEffect(() => {
    forecastData(params.location).then((d) => setData(d));
    astronomyData(params.location).then((d) => setAData(d));
    marineData(params.location).then((d) => setMData(d));
  }, [params.location]);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) return;

      const { favorites } = await getFavorites(user.uid);

      console.log("Current location:", data?.location);
      console.log("Saved favorites:", favorites);

      const isLocationFavorite = favorites.some((fav) => {
        console.log("Checking against favorite:", fav);
        const nameMatch = fav.name === data?.location.name;
        const threshold = 0.01;
        const latMatch = Math.abs(fav.lat - data?.location.lat) < threshold;
        const lonMatch = Math.abs(fav.lon - data?.location.lon) < threshold;

        console.log({ nameMatch, latMatch, lonMatch });

        return nameMatch && latMatch && lonMatch;
      });

      console.log("Is favorite?", isLocationFavorite);

      setIsFavorite(isLocationFavorite);
    };

    if (data && user) {
      checkIfFavorite();
    }
  }, [data, user, params]);

  const toggleFavorite = async () => {
    try {
      if (!user) {
        alert("You need to login to add favourites");
      } else {
        if (isFavorite) {
          // remove
          await deleteFavorite(user.uid, params.location);
          console.log("delete");
        } else {
          // add
          await addFavorite(user.uid, {
            name: data.location.name,
            country: data.location.country,
            lat: data.location.lat,
            lon: data.location.lon,
          });
        }
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  if (!data) {
    return (
      <div className="loader">
        <Image src={Mist} alt="" width={50} height={50} />
        Loading weather...
      </div>
    );
  }

  let icon = weatherIcons.find((value) => {
    return value.code === data.current.condition.code;
  });

  return (
    <>
      <PageTemplate>
        <div className="section-title">
          <div className="section-title-sect">
            <Image alt="weather" width={20} height={20} src={location} />
            {data.location.name}, {data.location.country} | Last updated{" "}
            {moment(data.current.last_updated).format("ddd MMM D [at] h:mma")}
          </div>

          <div className="h-align1">
                      
                    <div className="icon-wrapper" onClick={handleRefresh}><Image alt="refresh" width={20} height={20} src={Refresh} /></div>
                    <span style={{color:'var(--blue', fontSize:'var(--medium)'}}>&deg;{degree ? "F" : "C"}</span>
                    <label className="switch"><input type="checkbox" onChange={handleDegree} checked={degree}/><span className="slider round"></span></label>
          {isFavorite ? (
            <div className="icon-wrapper" onClick={toggleFavorite}>
              <Heart size={20} color="red" fill="red" />
            </div>
          ) : (
            <div className="icon-wrapper" onClick={toggleFavorite}>
              <Heart size={20} color="red" />
            </div>
          )}
          </div>
        </div>
        <div className="section">
          <div className="section2">
            <div className="section-title-small">
              <Image src={temp} width={20} height={20} alt="" />
              Today&apos;s Weather
            </div>

            <div className="highlight-val">
              <div
                className={`forecast-img-large ${
                  data.current.is_day == 1 ? icon.icon : icon.iconn
                }`}
              ></div>
              <div className="highlight-info">
                <span>{Math.round(degree ? data.current.temp_f : data.current.temp_c)}&deg;</span>
                <div className="highlight-desc">
                  <div>
                    Feels like {Math.round(degree ? data.current.feelslike_f : data.current.feelslike_c)}&deg;
                  </div>
                  <div>
                    Wind Chill {Math.round(degree ? data.current.windchill_f : data.current.windchill_c)}&deg;
                  </div>
                  <div className="highlight-title">
                    {data.current.condition.text}
                  </div>
                </div>
              </div>
            </div>
            <div className="section-title-small">
              <Image src={Hourly} width={20} height={20} alt="" />
              Hourly Forecast{" "}
            </div>
            <div className="hourly-wrapper">
              <Hour
                date="Now"
                icon={data.current.is_day == 1 ? icon.icon : icon.iconn}
                condition={data.current.condition.text}
                temp={degree ? data.current.temp_f : data.current.temp_c}
                wind={degree ? data.current.windchill_f : data.current.windchill_c}
              />
              {data.forecast.forecastday.map((day, i) =>
                day.hour.map((val, i) => {
                  const cdate = moment(data.current.last_updated).format(
                    "YYYY-MM-DD HH:mm"
                  );
                  const wdate = moment(val.time).format("YYYY-MM-DD HH:mm");
                  const whour = moment(val.time).format("h A");
                  if (wdate >= cdate) {
                    const ico = weatherIcons.find((vall) => {
                      return vall.code === val.condition.code;
                    });
                    return (
                      <Hour
                        key={i}
                        date={whour}
                        icon={val.is_day == 1 ? ico.icon : icon.iconn}
                        condition={val.condition.text}
                        temp={degree ? data.current.temp_f : data.current.temp_c}
                        wind={degree ? data.current.windchill_f : data.current.windchill_c}
                      />
                    );
                  }
                })
              )}
            </div>
             <div className="section-title-small">
                          <Image src={Daily} width={20} height={20} alt="" />
                          Daily Forecast
                        </div>
                        <div className="forecast-wrapper">
                          {data.forecast.forecastday.map((day, i) => {
                            let dd = moment(day.date).format("ddd D");
                            const ic = weatherIcons.find((val) => {
                              return val.code === day.day.condition.code;
                            });
                            const wdata = {
                              date: dd,
                              icon: ic.icon,
                              chance: day.day.daily_chance_of_rain,
                              amt: day.day.condition.text,
                              max: degree ? day.day.maxtemp_f : day.day.maxtemp_c,
                              min: degree ? day.day.mintemp_f : day.day.mintemp_c,
                            };
                            return <Day key={i} wdata={wdata} />;
                          })}
                        </div>
            <div className="section-title-small">
              <Image src={Cloth} width={20} height={20} alt="" />
              Recommended Clothing
            </div>
            <Clothing
              temp={Math.round(data.current.feelslike_c)}
              rain={data.current.precip_mm}
            />
          
          </div>
          <div className="section1">
            <Item
              title="Precipitation"
              unit="mm"
              val={data.current.precip_mm}
              img={Rain}
            />
            <Item
              title="Wind Speed"
              val={data.current.wind_kph}
              unit="km/h"
              img={Wind}
            />
            <Item
              title="Humidity"
              val={data.current.humidity}
              unit="%"
              img={Humidity}
            />
            <Item
              title="Pressure"
              val={data.current.pressure_mb}
              unit="hPa"
              img={Pressure}
            />
            <Item
              title="Cloud Cover"
              val={data.current.cloud}
              unit="%"
              img={Cloudy}
            />
            <Item title="UV Index" img={UV} val={data.current.uv} />
            <Item
              title="Visibility"
              val={data.current.vis_km}
              unit="km"
              img={Visibility}
            />
          </div>
           {/* ASTRONOMY AND MARINE DATA */}
          <div className="section2">
          <div className="section-title-small">
              <Image src={Moon} width={20} height={20} alt="" />
              Look to the Skies
            </div>
            { adata &&
         
            <Astronomy 
            sunrise={adata.astronomy.astro.sunrise}
            sunset={adata.astronomy.astro.sunset}
            moonrise={adata.astronomy.astro.moonrise}
            moonset={adata.astronomy.astro.moonset}
            />
   
            }
            <div className="section-title-small">
              <Image src={Anchor} width={20} height={20} alt="" />
              Sail the Seas
            </div>
            {
              mdata && mdata.error ? <div className="message">No marine data available for this location</div> :
            
            <Marine data={mdata}/>
            
            }
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default Page;
