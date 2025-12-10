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
  }, [city])

  const fetchData = async () => {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY
      }
    })
    console.log(response.data)
    setData(response.data)
  }

  const handleInput = (e) => {
    let value = e.target.value
    if (value.trim() !== 0)
    {
      setCity(value)
    }
  }

  const weatherName =  data?.weather?.[0]?.main

  const backgroundImage = data.weather ? backgroundImages[weatherName] : backgroundImages['Clear']
    
  return (
    <div className='container' style={{ background: backgroundImage || backgroundImages['Clear'] }}>
      <div className='weather-app'>
        {data?.weather?.[0]?.main && <p>{data.weather[0].main}</p>}
        <input className='search-bar' type="text" onChange={handleInput} />
        <img src={weatherImages[weatherName ?? "Clear"]} alt="" />
      </div>
    </div>
  )
}

export default WeatherPage
