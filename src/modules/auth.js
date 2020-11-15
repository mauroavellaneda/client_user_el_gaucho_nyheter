import JtockAuth from "j-tockauth";

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://api-el-gaucho-nyheter.herokuapp.com";
} else {
  apiUrl = "http://localhost:3000";
}

const auth = new JtockAuth({
  host: apiUrl,
  prefixUrl: "/api/v1",
});

const login = async (event, dispatch, history) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await auth.signIn(email, password);
    dispatch({
      type: "AUTHENTICATE",
      payload: {
        authenticated: response.success,
        currentUser: response.data,
      },
    });

    history.replace({ pathname: "/" });
  } catch (error) {
    return error.response.data.errors[0];
  }
};

const signUp = async (event, dispatch, history) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;
    const password_confirmation = event.target.password_confirmation.value;
    const response = await auth.signUp({
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });

    dispatch({
      type: "AUTHENTICATE",
      payload: {
        authenticated: response.data.success,
        currentUser: response.data.data,
      },
    });

    history.push("/", {
      message:
        "Registration successful, now you have access to El-gaucho mobile app. Visit your appstore!",
    });
  } catch (error) {
    return error.response.data.errors.full_messages[0];
  }
};

const getAuthHeaders = () => {
  let headers = sessionStorage.getItem("J-tockAuth-Storage");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };
  return headers;
};
const persistLogin = async (dispatch) => {
  if (localStorage.getItem("J-tockAuth-Storage")) {
    let credentials = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    const response = await auth.validateToken(credentials);

    if (response.success) {
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: response.success,
          currentUser: response.data,
        },
      });
    } else {
      console.log(response);
    }
  }
};

export { login, signUp, getAuthHeaders, persistLogin };
