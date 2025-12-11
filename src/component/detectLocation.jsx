// detectLocation.jsx

const detectLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url =
          `https://nominatim.openstreetmap.org/reverse?format=json` +
          `&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=en`;

        const res = await fetch(url, {
          headers: { "User-Agent": "react-weather-app/1.0" },
        });

        const data = await res.json();
        const a = data.address;

        const city =
          a.city ||
          a.town ||
          a.village ||
          a.district ||
          a.state_district ||
          null;

        if (!city) return reject("City not found");

        resolve(city);
      } catch (err) {
        reject(err.message);
      }
    }, (err) => reject(err.message), {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });
  });
};

export default detectLocation;
