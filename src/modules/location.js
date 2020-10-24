import axios from "axios";

const getCurrentPosition = async () => {
  const country = navigator.geolocation.getCurrentPosition(async (pos) => {
    return await getCountry(pos.coords.longitude, pos.coords.latitude);
  }); 
    return country
};

const getCountry = async (long, lat) => {
  const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
  
  const results = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${long}&language=en&key=${apiKey}` 
  );
 
  return results.data.results[0].components.country; 
};

export { getCurrentPosition };
