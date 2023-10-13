import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import LocationGetter from './LocationGetter';

const searchGoogle = async ( item, latitude, longitude, radius) => {

  try{ //getting sent to server.js
    const response = await fetch(`/view?query=${item}&radius=${radius}&lat=${latitude}&lon=${longitude}`);
    const stores = await response.json();
    for (const store of stores) {
      console.log(store); //prints out the stores that it tried to search
    }
    
    return stores;
  }catch(error){
    console.error('Error fetching items:', error);
    return [];
  }
  
};

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [radius, setRadius] = useState(10000); //sets default to 10km
  const { latitude, longitude, addy } = LocationGetter();
  const navigate = useNavigate();

  const searchItems = async (e) => {
  e.preventDefault();
  //  const results = await fetchWebsitess( "heyyy",longitude, latitude, search);
    const stores = await searchGoogle( search, latitude, longitude, radius); //OG
    console.log(stores);
    // console.log(results); // Do something with the search results //OG
    console.log("your search: " + search+ " lat: " + latitude + " lon: " + longitude+ " radius: " + radius/1000 + "km");
    navigate('/search', { state:  {stores} }); //sends user to search page innstead of regular page
  };
  

  return ( 
    <form className="search search-form" onSubmit={(e) => {searchItems(e)}}>
      <div className="search-container">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={`Searching from: ${addy}`}
      />
      <button type="submit">SEARCH</button>
      </div>
      <input
          type="range"
          min="3000"
          max="50000" 
          step="1000" 
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value, 10))}
        />
        <span>Radius: {radius/1000} kilometers</span> 
    </form>
  );
};

export default SearchBar;