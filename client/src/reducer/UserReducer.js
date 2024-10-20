import cookie from 'react-cookies';

export const initialState = cookie.load("user") || false;
export const reducer = (state = initialState, action) => {

  
  const user_id = cookie.load("user");

  if (action.type === "USER") {
    return action.payload;
  }
  
  return state;
};
