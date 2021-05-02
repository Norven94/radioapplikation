import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider"
import styles from "../css/Navbar.module.css"

export default function Navbar() {
    const history = useHistory()
    const [links, setLinks] = useState([{ name: "Kanaler", url: "/" }, {name: "Program", url:"/program"}, {name: "Min profil", url:"/profile"}]);
    const { logoutUser } = useContext(LoginContext)

    const renderLinks = () => {
        return links.map((link) => (
        <Link className={styles.link} key={link.name} to={link.url}>
            {link.name}
        </Link>
        ));
    };

    const logout = () => {
        logoutUser()
        history.push("/login")
    }

    return (
        <nav className={styles.navbar}>
            {renderLinks()}
            <button className={styles.btnLogout} onClick={logout}>Logout</button>
        </nav>
    )
}