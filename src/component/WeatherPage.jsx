import React, { useEffect } from 'react'
import axios from 'axios'
import cloudy from '../assets/cloudy.png'
import loading from '../assets/loading.gif'
import rainy from '../assets/rainy.png'
import snowy from '../assets/snowy.png'
import sunny from '../assets/sunny.png'
import API_KEY from './API_KEY'
import { useState } from 'react'
import './WeatherPage.css'
import dayjs from 'dayjs'
import { IconDropletHalfFilled, IconMapPinFilled, IconSearch, IconWind } from '@tabler/icons-react'
const API_URL = `https://api.openweathermap.org/data/2.5/weather`

const WeatherPage = () => {

  const [city, setCity] = useState("Surat")
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(false)

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const backgroundImages = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #f71eec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY, units: "Metric"
      }
    })
    console.log(response.data)
    if (response?.data) { setData(response.data) }
    else {
      setData({ notFound: 'Not Found' })
    }
    setLoading(false)
  }

  const handleInput = (e) => {
    setCity(e.target.value);
  };


  const onSearch = () => {
    if (city.trim() !== "") {
      fetchData()
    }
  }

  const weatherName = data?.weather?.[0]?.main

  const backgroundImage = data.weather ? backgroundImages[weatherName] : backgroundImages['Clear']

  // const today = new Date()
  const date = dayjs().format('DD MMM YYYY')
  return (
    <div className='container' style={{ background: backgroundImage || backgroundImages['Clear'] }}>
      <div className='weather-app'>
        <div className="serach">
          <div className='serach-top'>
            <IconMapPinFilled />
            {city && <p>{city}</p>}
          </div>
          <div className="search-bar">
            <input className='searchInput' type="text" onChange={handleInput} placeholder='Enter Loaction' onKeyDown={(e) => e.key === "Enter" && onSearch()} />
            {/* <IconSearch/> */}
            <button
              onClick={onSearch}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center"
              }}
            >
              <IconSearch />
            </button>
          </div>
        </div>
        {isLoading ? (<img className='loader' src={loading} alt="loader" />
        ) : data.notFound ? (<p>Not Found</p>) : (

          <>
            <div className="weather">
              <img src={weatherImages[weatherName ?? "Clear"]} alt="" />
              <div className="weather-type">
                {weatherName && <p>{weatherName}</p>}
              </div>
              <div className="weather-temp">
                {weatherName && <p>{Math.floor(data.main.temp)}</p>}
              </div>
            </div>
            <div className="weather-date">
              <p>{date}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <h4>Humidity</h4>
                {data?.main?.humidity && <p>{data.main.humidity} %</p>}
                <IconDropletHalfFilled />
              </div>
              <div className="wind">
                <h4>wind</h4>
                <IconWind />
                {data.wind && <p>{data.wind.speed} km/h</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherPage
