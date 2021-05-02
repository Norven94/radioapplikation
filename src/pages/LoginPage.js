import { useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginProvider"
import styles from "../css/LoginPage.module.css"
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginPage () {
    const { loginState } = useContext(LoginContext); 

    return (
        <div className={styles.loginPage}>
            {loginState ? <Login /> : <Register />}            
        </div>
    )
}