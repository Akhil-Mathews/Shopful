const websiteController = require('./WebsiteElementsController.js');
const itemController = require('./itemController.js');
const Website = require('../models/websiteModel')
const Item = require('../models/itemModel.js');
//const { search } = require('../routes/view.js');
const {By, Key, Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--ignore-certificate-errors');
chromeOptions.addArguments('--disable-notifications');
chromeOptions.addArguments('--profile-directory=Default');
chromeOptions.addArguments('--disable-popup-blocking');
var websites = []

const start = async (url, lon, lat, radius, store, input, method) =>{
    console.log("start")
    
    websites = await Website.find({}) // get the list of websites from the database
    for (let i = 0; i < websites.length; i++){
        if(websites[i].websiteUrl == url){            
        console.log(websites[i].websiteUrl + "   ==   " + url);
            let addClosed = 0;
            let driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
            console.log("startt")
            try {
                await driver.get(url);
                console.log("At URL");
                let searchBar;
                if (input != undefined) {
                  await driver.sleep(3000);
                    searchBar = await driver.findElement(By.css(websites[i].searchBarElement));
                    console.log(websites[i].searchBarElement); //prints the search bar element thats being used
                    await searchBar.sendKeys(input, Key.RETURN); // puts the keys in the search bar, then hits enter
                    console.log("Searching for " + input); 
                    console.log("Searched");
                    //here
                  } else {
                    // Scroll down to the bottom of the page to load all elements on the home page
                    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                  }
            
                  //lets the new page load
                  await driver.sleep(5000);
                  
                  //if the user makes a search, then the selectors chosen will be the product Elements where if the user hasn't had any input, it makes
                  //it so that it will show the home elements of the page
                  var selectors = [
                    {name: websites[i].productHomeNameElement,price: websites[i].productHomePriceElement,image:websites[i].productHomeImageElement, link:websites[i].productHomeLinkElement}, // home elements
                    {name: websites[i].productNameElement, price: websites[i].productPriceElement,image:websites[i].productImageElement, link:websites[i].productLinkElement} // search elements
                    ]

                    let searchOrHome = 0
                    
                    if (input != undefined){
                        searchOrHome = 1 //means that there was a search criteria
                        console.log("SEARCHING") // console.log in page.evaluate is sent to the web browser console
                    }else{
                        console.log("HOME") //could just be a user that wants to use the homepage
                    }
                    await driver.wait(until.stalenessOf(searchBar));
                    if(websites[i].closeButton != undefined && addClosed == 0){ //to close any popup that happens
                      const closeButton = await driver.findElement(By.css(websites[i].closeButton));
                    await closeButton.click(); //closes the add then waits 5 seconds
                    await driver.sleep(5000);
                    console.log(websites[i].closeButton);
                    console.log("addclosed " + addClosed)
                    }
                    
                  //need to change this to the wanted element based on the site in the database
                //const names = await driver.findElements(By.css(websites[i].productNameElement));
                const names = await driver.findElements(By.css(websites[i].productNameElement));
                const productNames = await Promise.all(names.map(pant => pant.getText()));
                console.log(websites[i].productNameElement);
                const priceElements = await driver.findElements(By.css(websites[i].productPriceElement));
                const productPrices = await Promise.all(priceElements.map(priceElement => priceElement.getText()));
                //gets image url website if src element or data-src
                const imageElements = await driver.findElements(By.css(websites[i].productImageElement));
                const productImages = await Promise.all(imageElements.map( async imageElement => {
                let relativePath = await imageElement.getAttribute('data-src');

                  if(!relativePath || relativePath.trim() === ''){
                    relativePath = await imageElement.getAttribute('src');
                  }
                  const baseUrl = websites[i].websiteUrl;
                  //if the url doesn't start with https, adds the website to make the relative path the proper path
                  const fullUrl = await relativePath.startsWith('https') ? relativePath : baseUrl + relativePath;
                  return fullUrl;
                }));
                const linkElements = await driver.findElements(By.css(websites[i].productLinkElement));
                const productLinks = await Promise.all(linkElements.map(linkElement => linkElement.getAttribute('href')));


                const productInfo = [
                    productNames,
                    productPrices,
                    productImages,
                    productLinks
                  ];

                //   const namess = productInfo[0];
                // console.log(namess);

                productNames.forEach(productName => {
                    console.log(productName); // Print each product name
                  });
                  
                  productPrices.forEach(productPrice => {
                    console.log(productPrice); 
                  });
                  console.log("images");
                  productImages.forEach(productImage => {
                    console.log(productImage); 
                  });
                  console.log("links");
                  productLinks.forEach(productLink => {
                    console.log(productLink); 
                  });
                  //scraped young boy
                var dbProducts = [];

                //Iterate over the productInfo array
                for (let p = 0; p < productInfo[0].length; p++) {
                const newDBProduct = {
                    name: productInfo[0][p],
                    price: productInfo[1][p],
                    image: productInfo[2][p],
                    link: productInfo[3][p],
                    path: {
                    location: {
                        lon: lon,
                        lat: lat
                    },
                    radius: radius,
                    store: store,
                    search: input
                    },
                    method: method
                };
                console.log("before");
                //creates each specific item
               const newItem = await itemController.createItem(newDBProduct); 
              console.log('created item:', newItem);
                dbProducts.push(newDBProduct);
                }
                console.log(dbProducts);
            }catch(error){
                console.log(`ERROR: '${error.message}'`);
            }
        }
        }

    async function addListeners(page) { // listen for errors, popups, and console messages
        // Listen for dialog events
        page.on('dialog', async dialog => {
            console.log(`Popup message: ${dialog}`);
            await dialog.dismiss(); // Dismiss the popup
        });
        page.on('error', async message => {
            console.log(`Error message: ${message}`);
        });
        page.on('pageerror', async message => {
            console.log(`Page Error message: ${message}`);
        });
        page.on('console', async message => {
            console.log(`Console message: ${message.text()}`);
        });
    }

    async function autoScroll(page) { // scroll down to the bottom of the page to load all elements on the home page
        // Get the height of the rendered page
        const bodyHandle = await page.$('body');
        const { height } = await bodyHandle.boundingBox();
        await bodyHandle.dispose();
      
        // Calculate the number of scrolls needed to load all data
        const windowHeight = page.viewport().height;
        const numScrolls = Math.ceil(height / windowHeight);
      
        // Scroll the page in batches of windowHeight
        for (let i = 0; i < numScrolls; i++) {
          await page.evaluate(`window.scrollBy(0, ${windowHeight})`);
          await page.waitForTimeout(500); // adjust this value to suit your needs
        }
      }
      

}

module.exports = { start }