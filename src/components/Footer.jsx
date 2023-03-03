import "./footer.css"
import { Link } from "react-router-dom"

export default function Footer(){
    return (
        <footer>
            <ul className="permalinks">
                <li><Link to="/" className="footer__a">Home</Link></li>
                <li><Link to="/products" className="footer__a">Products</Link></li>
            </ul>

            <div className="footer__copyright">
                <small>&copy; Stefan Zagorac. All rights reserved.</small>
            </div>
        </footer>
    )
}