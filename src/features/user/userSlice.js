import { createSlice } from "@reduxjs/toolkit";

// Creating initial state for the redux store
const initialState = {
  username: "",
};

// Creating the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

// Exporting the action creators
export const { updateName } = userSlice.actions;

// Exporting the reducers as default
export default userSlice.reducer;

// Selector functions to get the data from the Redux
//// "reselect" library can be used here to optimize these selectors in the larger apps

// Getting the username
export const getUsername = (state) => state.user.username;

/******************************************* */
/*
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
*/
