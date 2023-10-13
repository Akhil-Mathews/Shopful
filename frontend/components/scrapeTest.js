/**
 * @file
 * @brief A script that performs a GET request using Axios to scrape data from a specified URL.
 * @module ScrapeScript
 */

import axios from 'axios';

// Import all exports from the 'axios' library and alias it as 'others'
import * as others from 'axios';

// The URL to scrape data from
const url = 'https://example.com';

/**
 * @function start
 * @brief Initiates the scraping process by sending a GET request to the specified URL.
 *
 * This function makes an HTTP GET request to the provided URL using Axios and
 * logs the response data to the console.
 *
 * @see https://github.com/axios/axios
 */
const start = () => {
    console.log("scrapeTest");

    // Send a GET request to the URL using Axios
    axios.get(url)
    .then(response => {
        // Log the response data to the console
        console.log(response.data);
    })
    .catch(error => {
        // Handle and log any errors that occur during the request
        console.log(error);
    });
};

// Export the 'start' function as the default export of this module
export default start;
