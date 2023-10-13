import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import ItemDetails from '../components/itemDetails'
import Sorter from '../components/sorter';

const Search = () => {
    const [items, setItems] = useState(null)
    const location = useLocation();
    const { state } = location;
    const stores = state ? state.stores : [];
    
    useEffect(() => {
        const fetchItems = async () => {
            //get items, were probably going to want items here instead of items
            const response = await fetch('/db/items')
            const json = await response.json()
            if(response.ok) {
                setItems(json) 
            }
        }
        fetchItems();
    }, [])
    useEffect(() => {
      var yuhh = 0;
      for (const store of stores) {
        console.log("store:" + yuhh + store); //prints out the stores that it tried to search
        yuhh += 1;
      }
    }, [stores]); // Run this effect only when 'stores' change

    return (
        <div className="search-page">
          <div className="store-boxes">
            <h3> Searching from:</h3>
        {stores.map((store) => (
          <div key={store} className="store-box">
            <h3>{ " " + store + ", "}</h3>
          </div>
        ))}
        </div>
      <table className="items-table">
      <tbody>
        {items &&
          items.reduce((rows, item, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(
              <td key={item.id}>
                <ItemDetails itemModel={item} />
              </td>
            );
            return rows;
          }, []).map((row, rowIndex) => (
            <tr key={rowIndex}>{row}</tr>
          ))}
      </tbody>
    </table>
  </div>
    )  
}

export default Search