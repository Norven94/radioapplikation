import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/Login.module.css"
import { LoginContext } from "../contexts/LoginProvider"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Login () {
    const history = useHistory();
    const { loginUser, loginState, setLoginState } = useContext(LoginContext)
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeLoginState = () => {
        setLoginState(!loginState)
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {  
        e.preventDefault();             
        let user = {
            email,
            password
        }
        let loginResult = await loginUser(user)
        if (loginResult.success) {
            history.push("/")
        }
        console.log(loginResult)
    }

    return (
        <form className={styles.login} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={handleEmailChange}/>
            <div className={styles.passWrapper}>
                <input type={passwordShown ? "text" : "password"} placeholder="Lösenord" onChange={handlePasswordChange}/>
                <i onClick={togglePasswordVisiblity}>{eye}</i>
            </div>
            <button className={styles.btnLogin}>Login</button>
            <button onClick={changeLoginState}>{loginState ? "Register" : "Login"}</button>
        </form>
    )
}