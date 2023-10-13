const Item = require('../models/itemModel.js');
const mongoose = require('mongoose');
const { getPlaces } = require('../controllers/StoreFinder.js');
const { start } = require('./updatedScraper.js');

var patt = new RegExp(/^(?:https?:\/\/)?([^/]+)\//);

const getViews = async (req, res) =>{ 
    console.log("in getViews")
    var { query, lon, lat, radius, store } = req.query;
    var dbProducts = [];
    const apiKey = 'AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM';
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    console.log("qwy: "+query + "lon: " + lon+ "lat: " + lat + "rad: " + radius, store) // log to console before setting default
    if (!query){
        query = "pants"
    }else if (/[^a-zA-Z0-9\s]/.test(query)) {
        query = "pants";
    }
    if (!radius){
        radius = 10000
    }
    if (lon == "null"){
        lon = -75.6923751 //rideau center lon
    }
    if (lat == "null"){
        lat = 45.4254461 //rideau center lat
    }
    if (!store){
        store = "mall"
    }
    console.log("qweriey: "+query + "lon: " + lon+ "lat: " + lat + "rad: " + radius, store)// log to console after setting default
    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&location=${lat},${lon}&radius=${radius}&key=${apiKey}`;
      
      console.log("in server3:" + url);
      //sent to StoreFinder.js  
      const [ badWebsites, names ] = await getPlaces(url);
      console.log("printing websites array");

    console.log(badWebsites);
    console.log(names);
    var website = [];
    var websites = [];
    try{

        //Formats the websites recieved from the webscraper into a more readable url
        console.log("bad");
        console.log(badWebsites)
        // console.log(names)
        for (let i = 0; i < badWebsites.length; i++){
            website.push(patt.exec(badWebsites[i])) //cleans each website and adds them to website array
        }
        for (let i = 0; i < website.length; i++){
            websites.push(website[i][0]) //website array is an array of multiple things so it only takes away the clean website
            // names.push(website[i][0]) //puts the websites in the names array to send it back with an array of 1 response
        }
        console.log("good");
        console.log(websites) //shows each of the clean websites in the websites array
        }catch(error){
        console.log(error.message)
    }

        var products = [];
        
         //For each website, if the call had a search term in it or not add it to the results to be pushed to products array
        for (let i = 0; i < websites.length; i++){       
            console.log("running web scraper with: " + websites[i])
            if (query){
                result = await start(url = websites[i], lon = lon, lat = lat, radius = radius, store = store, input = query, method = req.method)
            }else{
                result = await start(url = websites[i], lon = lon, lat = lat, radius = radius, store = store, input = undefined, method = req.method)
            }
            
        }
        res.json(names); //returns the first 10 elements as names, the last 10 elements as websites
        return
        // console.log(products);

}

// create a new View
const createView = async (req, res) => {
    return res.status(400).json({error: 'Cannot Create View'})
}

// delete an View
const deleteView = async (req, res) => {
    return res.status(400).json({error: 'Cannot Delete View'})
}

const deleteViews = async (req, res) => {
    console.log("in deleteViews");
    const dateStr = req.params.date;
    const targetDate = new Date(dateStr);
    // const targetDate = new Date(req.params.date);
    console.log(targetDate);
    try {
        // Retrieve items with the specified createdAt date.
        const items = await Item.find({ createdAt: { $lt: targetDate } }).exec();
        res.json(items);
        console.log(items)
        
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      return 
}


// update an View
const updateView = async (req, res) => {
    return res.status(400).json({error: 'Cannot Update View'})
}

//exports all of these methods to view.js
module.exports =  {
    createView,
    getViews,
    deleteView,
    deleteViews,
    updateView
}