Here is a **clean, professional, no-nonsense README** for your WeatherApp.
No “how to use”, no boring instructions, no installation steps.

---

# **WeatherApp**

A modern weather application built with **React + Vite**, featuring dynamic backgrounds, real-time weather data, manual search, and location auto-detection. The interface includes transparent glass-style cards, a large weather illustration, and a clean, minimal layout.

---

## **Features**

* Dynamic background gradient based on weather condition
* Manually triggered weather search
* Auto-detect location using browser geolocation
* Large animated weather illustration
* Humidity and wind widgets with glass UI
* Default city: Surat
* Smooth loading indicator
* Clean and responsive interface

---

## **Core Technologies**

* React (Vite)
* Axios (API requests)
* OpenWeather API
* Day.js (date formatting)
* Tabler Icons
* Custom location detection using Nominatim API

---

## **Project Structure**

```
src/
  ├── assets/
  ├── detectLocation.jsx
  ├── WeatherPage.jsx
  ├── WeatherPage.css
  ├── API_KEY.jsx
public/
  └── favicon.jpg
```

---

## **APIs Used**

* **OpenWeather Current Weather Data API**
* **Nominatim Reverse Geocoding API** (for auto location)

---

## **Key Highlights**

* Fully controlled input field synced with live city updates
* Auto location detection immediately updates UI & weather
* Reusable `detectLocation.jsx` utility for detecting user city
* No auto-fetch on typing — search is user-controlled
* Custom gradients for Clear, Rain, Cloudy, Haze, Snow, Mist, Smoke

---



