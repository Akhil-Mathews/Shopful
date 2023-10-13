/**
 * @file
 * @brief A script that performs a GET request using Axios to scrape data from a specified URL.
 * @module ScrapeScript
 */

const axios = require('axios');

/**
 * @function scrapeTest
 * @brief Initiates the scraping process by sending a GET request to the specified URL.
 *
 * This function makes an HTTP GET request to the provided URL using Axios and
 * logs the response data to the console.
 *
 * @see https://github.com/axios/axios
 */
const scrapeTest = () => {
    console.log("scrapeTest");

    // The URL to scrape data from
    const url = 'https://example.com';

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

/**
 * @brief This function scrapes the specified URL.
 *
 * This function logs "scrapeURL" and the URL to the console. It then sends a GET request to the specified URL using Axios. 
 * If the request is successful, it logs the response data to the console. If there is an error, it logs the error to the console.
 *
 * @param url The URL to scrape.
 *
 * @return None.
 */
const scrapeURL = async (url) =>{

    console.log("scrapeURL");
    console.log(url);

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
   
}

/**
 * @brief This function scrapes the specified URL.
 *
 * This function logs "scrapeURLzen" and the URL to the console. It then sends a GET request to the specified URL using Axios. 
 * If the request is successful, it logs the response data to the console. If there is an error, it logs the error to the console.
 *
 * @param url The URL to scrape.
 *
 * @return None.
 */
const scrapeURLzen = async (url) =>{

    //url = 'https://httpbin.io/anything';
    const ZENROWS_apikey = process.env.ZENROWS_apikey;

    axios({
        url: 'https://api.zenrows.com/v1/',
        method: 'GET',
        params: {
            'url': url,
            'apikey': ZENROWS_apikey,
        },
    })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
}

// Export the 'scraperTest' function as the default export of this module
module.exports = { 
    scrapeTest,
    scrapeURL,
    scrapeURLzen
}
