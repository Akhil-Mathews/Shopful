import React from 'react';
import Geocode from "react-geocode";
import LocationGetter from './LocationGetter';
//function to get the users location & prints it
//may have to change api key
Geocode.setApiKey("AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM");
Geocode.setLanguage("en");
Geocode.setRegion("ca");

const LocationEnabler = () => {
  const { latitude, longitude, addy } = LocationGetter();
  return (
    <div className= "location_enabler">
      <h3>Your Location:</h3>
      {latitude && longitude ? ( //if it has both of them it will show the user their longitude & latitude
        <p>
          Latitude: {latitude}, Longitude: {longitude}<br/>Searching from: {addy}
        </p>
      ) : (  //if it doesn't it will just tell the user that it's loading
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationEnabler;