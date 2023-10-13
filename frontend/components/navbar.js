import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { RxPerson } from 'react-icons/rx'
import { BsSearch } from 'react-icons/bs';
import shopfulLogo from './pictures/shopful.png';

const Navbar = () => {

    return (
        <header> 
            <div className="container">
                <div className="navbar_left">
                <Link to="/"> 
                    <img className="logo-image" src={shopfulLogo} alt="Shopful" />
                </Link>
                <a href="/">Home</a>
                <a href="/">Shop</a>
                <a href="/AboutUs">About Us</a>
                <a href="/Blog">Blog</a>
                <a href="/Contact">Contact Us</a>
                </div>
                <div className="navbar_right">
                <a href="/#">Cart</a>
                <a href="/#"><FaRegHeart/></a>
                <a href="/#"><RxPerson/></a>
                <a href="/#">Search Bar<BsSearch/></a> 
                </div>
            </div>
        </header>
    )
}

export default Navbar