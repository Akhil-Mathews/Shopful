import { useEffect, useState } from 'react';
import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM");
Geocode.setLanguage("en");
Geocode.setRegion("ca");

//function that gets the users location and returns their latitude, longitude, addy
const LocationGetter = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [addy, setAddy] = useState(null);
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          
          // this section requires $$$ 
          //
          // Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          //   (response) => {
          //     console.log(response);
          //     let city, state, country;
          //     for (let i = 0; i < response.results[0].address_components.length; i++) {
          //       for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
          //         switch (response.results[0].address_components[i].types[j]) {
          //           case "locality":
          //             city = response.results[0].address_components[i].long_name;
          //             break;
          //           case "administrative_area_level_1":
          //             state = response.results[0].address_components[i].long_name;
          //             break;
          //           case "country":
          //             country = response.results[0].address_components[i].long_name;
          //             break;
          //           default: //comes through here like 40 times because there is a big response 
          //           console.log('1');
          //             break;
          //         }
          //          
          //       }
          //     }
          //     setAddy(city + ", " + state + " " + country);
          //   },
          //   (error) => {
          //     //console.log(error);
          //     //console.log(error.message);
          //     console.error(error);
          //   }
          // );
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);
  return { latitude, longitude, addy} ;
};

export default LocationGetter;
