const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const itemDBRoutes = require('./routes/items.js');
const itemViewRoutes = require('./routes/view.js');
const websiteDBRoutes = require('./routes/websites.js');
const cors = require('cors');
const axios = require('axios');

const scrape = require('./controllers/scrape.js');
const places = require('./controllers/places.js');



//trying to fix puppeteer
const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};

// express app
const app = express()

// Set timeout to 5 minutes
const timeoutMs = 5 * 60 * 1000;

app.use(timeout(timeoutMs));
app.use(cors());
// middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
app.get('/google-maps-api', async (req, res) => {
  try {
    const apiKey = 'AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM';
    const { query, latitude, longitude, radius } = req.query;
    console.log("in server:" + query, latitude, longitude, radius);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;
    console.log("in server2:" + url);
    const response = await axios.get(url);
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error searching Google:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Maps API' });
  }
});
// routes
app.use("/db/items", itemDBRoutes)
app.use("/view", itemViewRoutes)
app.use("/db/websites", websiteDBRoutes)

// connect to db
console.log("connecting to database")
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => { //uses the port from the .env file
        console.log('connected to db & listening on port ' + process.env.PORT)
 })
 })
 .catch((error) => {
    console.log(error)
 })

 function availableRoutesString() {
  return app._router.stack
    .filter(r => r.route)
    .map(r => Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path)
    .join("\n")
}

console.log(availableRoutesString());

// ...sandboxing different methods of scraping
scrape.scrapeTest(); 

scrape.scrapeURL('https://example.com');

//scrape.scrapeURLzen('https://example.com');

// ...sandboxing different GOOGLE API functions to get businesses and detailed information
//places.getCoordinates('85029');

//places.placeDetails('ChIJo63O5OVtK4cRY7EoA3RoC-k');

