import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        ...action.payload,
      };
    case "USER_IS_SUBSCRIBER":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          role: action.payload.role,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
