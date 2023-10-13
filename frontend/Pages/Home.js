import {useEffect, useState} from 'react'
import SearchBar from '../components/SearchBar';
import ItemDetails from '../components/itemDetails'
import LocationEnabler from '../components/LocationEnabler';

const Home = () => {
    const [items, setItems] = useState(null)
    useEffect(() => {
        const fetchItems = async () => {
            //get items, were probably going to want items here instead of items
            const response = await fetch('/db/items')
            const json = await response.json()
            if(response.ok) {
                setItems(json) //this sets the items right here on this page
            }
        }
        fetchItems();
    }, [])

    return (
        <div className="home">
            <SearchBar />
            <LocationEnabler />
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

export default Home
