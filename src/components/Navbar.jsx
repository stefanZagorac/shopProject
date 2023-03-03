import "./navbar.css"
import { useState, useContext } from "react"
import Logo from "../images/logo.png"
import {Link, NavLink} from "react-router-dom"
import {links} from "../data"
import {GoThreeBars} from "react-icons/go"
import {FaShoppingCart} from "react-icons/fa"
import { CartContext } from "../pages/cart/CartContext"


export default function Navbar(){
    const [isNavShowing, setIsNavShowing] = useState(false);
    const cart = useContext(CartContext);

    const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav>
            <div className="container nav__container">
                <Link to="/" className="link">
                    <img src={Logo} alt="Nav Logo" className="logo"/>
                </Link>
                <p className="nav__p"> - Shop Website</p>
                <ul className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}>
                    {links.map((obj, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={obj.path} onClick={() => setIsNavShowing(oldVal => false)} className={({isActive}) => isActive ? "active-nav" : ""}>{obj.name}</NavLink>
                            </li>
                        )
                    })}
                </ul>
                <div className="cart__container">
                    <NavLink to="/cart" onClick={() => setIsNavShowing(oldVal => false)} className="cart__btn"><FaShoppingCart /></NavLink>
                    <div className="item__count">{itemsCount}</div>
                </div>
                
                <button onClick={() => setIsNavShowing(oldVal => !oldVal)} className="nav__toggle-btn">
                    <GoThreeBars />
                </button>

            </div>
        </nav>

    )
}