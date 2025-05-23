"use client";
import { format } from "date-fns";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import igm from "../public/globe.svg";
import temp from "../public/svg/060-temperature.svg";
import Hourly from "../public/hourly.svg";
import Cloth from "../public/clothes-hanger.svg";
import Refresh from "../public/refresh-arrow.svg";
import Daily from "../public/daily-calendar.svg";
import Cloudy from "../public/weather/fill/svg/cloudy.svg";
import Wind from "../public/weather/fill/svg/wind.svg";
import UV from "../public/weather/fill/svg/uv-index.svg";
import Visibility from "../public/weather/fill/svg/fog.svg";
import Rain from "../public/weather/fill/svg/raindrops.svg";
import Mist from "../public/weather/fill/svg/mist.svg";
import Moon from "../public/moon-stars.svg";
import Humidity from "../public/weather/fill/svg/humidity.svg";
import Temperature from "../public/weather/fill/svg/thermometer.svg";
import Clothing from "./components/Clothing";
import Pressure from "../public/weather/fill/svg/pressure-low.svg";
import Anchor from "../public/anchor.svg";
import fore from "../public/svg/021-summer.svg";
import location from "../public/location.svg";
import Landing from "./components/Landing";
import { Item, Hour, Day } from "./components/Item";
import PageTemplate from "./components/PageTemplate";
import { weatherIcons } from "./api/weathericons";
import { forecastData, astronomyData, marineData } from "./api/weather";
import { useState, useEffect } from "react";
import { useAuth } from "./lib/authContext";
import Astronomy from "./components/Astronomy";
import Marine from "./components/Marine";

const Page = () => {

  const [data, setData] = useState(null)
  const [adata, setAData] = useState(null)
  const [mdata, setMData] = useState(null)
  const [degree, setDegree] = useState(false)
  const [deg, setDeg] = useState("C")
  const { user, userProfile } = useAuth();

  useEffect(() => {
    const checkDegree = () => {
      if(!localStorage.deg){
        localStorage.deg = "C"
        setDegree(false)
        setDeg(localStorage.deg)
      }else{
        if(localStorage.deg == "C"){
          setDegree(false)
        }else{
          setDegree(true)
        }
        setDeg(localStorage.deg)
        console.log('set',localStorage.deg)
      }
    }
    checkDegree()
    forecastData().then((d) => setData(d));
    astronomyData().then((d) => setAData(d));
    marineData().then((d) => {
      setMData(d);
    });
  }, []);

  const handleRefresh = async () => {
    await forecastData().then((d) => setData(d));

    console.log("refreshed");
  };

  const handleDegree = (e) => {
    setDegree(!degree)
    let test = !degree ? "F" : "C"
    localStorage.setItem('deg',test)
  }

  if (!data)
    return (
      <div className="loader">
        <Image src={Mist} alt="" width={50} height={50} />
        Loading weather...
      </div>
    );
  let icon = weatherIcons.find((value) => {
    return value.code === data.current.condition.code;
  });

  const displayName = userProfile?.displayName || user?.email || "User";

  return (
    <>
      <PageTemplate>
        {user ? (
          <Landing
            title={`Welcome back, ${displayName}!`}
            desc={`Here's your weather forecast for today.`}
          />
        ) : (
          <Landing
            title="Welcome to ClimApp!"
            desc={`Sign-in to save locations.`}
          />
        )}

        <div className="section-title">
          <div className="section-title-sect">
          <Image alt="weather" width={20} height={20} src={location} />
          {data.location.name}, {data.location.country} | {deg} Last updated {moment(data.current.last_updated).format("ddd MMM D [at] h:mma")}
          </div>
          <div className="h-align1">
            <div className="icon-wrapper" onClick={handleRefresh}>
              <Image alt="refresh" width={20} height={20} src={Refresh} />
            </div>
            <span style={{ color: "var(--blue", fontSize: "var(--medium)" }}>
              &deg;{degree ? "F" : "C"}
            </span>
            <label className="switch">
              <input type="checkbox" onChange={handleDegree} checked={degree} />
              <span className="slider round"></span>
            </label>
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
                <span>
                  {Math.round(
                    degree ? data.current.temp_f : data.current.temp_c
                  )}
                  &deg;
                </span>
                <div className="highlight-desc">
                  <div>
                    Feels like{" "}
                    {Math.round(
                      degree
                        ? data.current.feelslike_f
                        : data.current.feelslike_c
                    )}
                    &deg;
                  </div>
                  <div>
                    Wind Chill{" "}
                    {Math.round(
                      degree
                        ? data.current.windchill_f
                        : data.current.windchill_c
                    )}
                    &deg;
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
                wind={
                  degree ? data.current.windchill_f : data.current.windchill_c
                }
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
                        icon={val.is_day == 1 ? ico.icon : ico.iconn}
                        temp={degree ? val.temp_f : val.temp_c}
                        condition={val.condition.text}
                        wind={degree ? val.windchill_f : val.windchill_c}
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
            {adata && (
              <Astronomy
                sunrise={adata.astronomy.astro.sunrise}
                sunset={adata.astronomy.astro.sunset}
                moonrise={adata.astronomy.astro.moonrise}
                moonset={adata.astronomy.astro.moonset}
              />
            )}
            <div className="section-title-small">
              <Image src={Anchor} width={20} height={20} alt="" />
              Sail the Seas
            </div>

            {
             // mdata && mdata.error ? <div className="message">No marine data available for this location</div> :
            
            //<Marine data={mdata}/>
            
            }
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default Page;
