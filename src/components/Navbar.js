import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [links, setLinks] = useState([{ name: "Kanaler", url: "/" }, {name: "Program", url:"/program"}]);

    const renderLinks = () => {
        return links.map((link) => (
        <Link key={link.name} to={link.url}>
            {link.name}
        </Link>
        ));
    };

    return <nav className="navbar">{renderLinks()}</nav>;
}