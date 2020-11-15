import axios from "axios";

const getCurrentPosition = async (dispatch) => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const country = await getCountry(pos.coords.latitude, pos.coords.longitude);

    dispatch({
      type: "SET_LOCATION",
      payload: {
        country: country,
      },
    });
  });
};
const getCountry = async (latitude, longitude) => {
  const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;

  try {
    const result = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&language=en&key=${apiKey}`
    );

    return result.data.results[0].components.country;
  } catch (error) {
    console.log(error);
  }
};

export { getCurrentPosition };
