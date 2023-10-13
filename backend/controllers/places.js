var https = require('follow-redirects').https;

const GOOGLE_apikey = process.env.GOOGLE_API_KEY;

/**
 * @brief This function initializes an empty array of places.
 *
 * This function creates a new object with an empty array of places.
 *
 * @param None.
 *
 * @return None.
 */
var placeDetails = function() {
	this.places = [];
}

/**
 * @brief This function retrieves the coordinates of the specified zip code.
 *
 * This function sends a GET request to the Google Maps Geocoding API to retrieve the latitude and longitude of the specified zip code. 
 * The API key is passed as a parameter in the URL. If the request is successful, it calls the CoordinateResponse function. 
 *
 * @param zipcode The zip code for which to retrieve coordinates.
 *
 * @return None.
 */
function getCoordinates(zipcode) {
	https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/geocode/json?address=' + zipcode + '&key=' + GOOGLE_apikey,
		method: 'GET'},
		CoordinateResponse).end();
}

/**
 * @brief This function searches for nearby places of a specified type.
 *
 * This function sends a GET request to the Google Maps Places API to retrieve a list of nearby places of the specified type based on the specified latitude, longitude, and radius. 
 * The API key is passed as a parameter in the URL. If the request is successful, it calls the PlaceResponse function. 
 *
 * @param latitude The latitude of the location to search.
 * @param longitude The longitude of the location to search.
 * @param placeType The type of place to search for.
 * @param radius The radius (in meters) within which to search for places.
 *
 * @return None.
 */
function placeSearch(latitude, longitude, placeType, radius) {
	https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + placeType + '&key=' + GOOGLE_apikey,
		method: 'GET'},
		PlaceResponse).end();
}

/**
 * @brief This function retrieves the details of a specified place.
 *
 * This function logs the `placeDetails` object to the console and sends a GET request to the Google Maps Places API to retrieve the details of the specified place. 
 * The API key is passed as a parameter in the URL. If the request is successful, it calls the `PlaceResponse` function. 
 *
 * @param place_id The ID of the place for which to retrieve details.
 *
 * @return None.
 */
function placeDetails(place_id) {
    console.log(placeDetails);

    //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJF7QkuDsDLz4R0rJ4SsxFl9w&key=YOUR_KEY
    // walgreens ChIJo63O5OVtK4cRY7EoA3RoC-k

	https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/place/details/json?place_id=' + place_id + '&key=' + GOOGLE_apikey,
        method: 'GET'},
        PlaceResponse).end();
}


/**
 * @brief This function handles the response from a GET request to the Google Maps Geocoding API.
 *
 * This function parses the response data to retrieve the latitude and longitude of the specified location. 
 * It then calls the `placeSearch` function to search for nearby places of a specified type within a specified radius.
 *
 * @param response The response object from the GET request.
 *
 * @return None.
 */
function CoordinateResponse(response) {
	
    var data = "";
	var sdata = "";
	var latitude = "";
	var longitude = "";
    var placeType = "";
    var radius = 1000;

	response.on('data', function(chunk) {
		data += chunk;
	});
	response.on('end', function() {
		sdata = JSON.parse(data);
		latitude = sdata.results[0].geometry.viewport.northeast.lat;
		longitude = sdata.results[0].geometry.viewport.northeast.lng;
		placeSearch(latitude, longitude, placeType, radius);
	});
}

/**
 * @brief This function handles the response from a GET request to the Google Maps Places API.
 *
 * This function parses the response data to retrieve information about nearby places. 
 * If the request is successful, it logs the name, place ID, rating, and vicinity of each place to the console. If there is an error, it logs the error to the console.
 *
 * @param response The response object from the GET request.
 *
 * @return None.
 */
function PlaceResponse(response) {
	var p;
	var data = "";
	var sdata = "";
	var PD = new placeDetails();

    console.log('PlaceResponse');

	response.on('data', function(chunk) {
		data += chunk;
	});

	response.on('end', function() {
        console.log(data);

        sdata = JSON.parse(data);
        
        console.log(sdata);

        if (sdata.status === 'OK') {
			console.log('Status: ' + sdata.status);
			console.log('Results: ' + sdata.results.length);
			for (p = 0; p < sdata.results.length; p++) {
				PD.places.push(sdata.results[p]);
			}
			for (r = 0; r < sdata.results.length; r++) {
				console.log('----------------------------------------------');
				console.log(PD.places[r].name);
				console.log('Place ID (for Place Detail search on Google):' + PD.places[r].place_id);
				console.log('Rating: ' + PD.places[r].rating);
				console.log('Vicinity: ' + PD.places[r].vicinity);
			}
		} else {
			console.log(sdata.status);
		}
	});
}

// Export the 'places' function as the default export of this module
module.exports = { 
    getCoordinates,
    placeDetails
}

