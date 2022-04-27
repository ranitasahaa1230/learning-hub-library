const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuth: action.payload.encodedToken ? true : false,
        user: action.payload.user,
        encodedToken: action.payload.encodedToken,
      };
      case "LOG_OUT":
        return {
          ...state,
          isAuth:null,
          user:null,
          encodedToken:null,
        };
    default:
      throw new Error("Action type not found.");
  }
};

export { authReducer };
