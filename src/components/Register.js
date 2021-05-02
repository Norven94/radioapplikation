import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider"
import styles from "../css/Register.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Register () {
    const history = useHistory();
    const { registerNewUser, loginState, setLoginState } = useContext(LoginContext)
    const [counties, setcounties] = useState(["Blekinge", "Bohuslän", "Dalarna", "Dalsland", "Gotland", "Gästrikland", "Halland", "Hälsingland", "Härjedalen", "Jämtland", "Lappland", "Medelpad", "Norrbotten", "Närke", "Skåne", "Småland", "Södermanland", "Uppland", "Värmland", "Västerbotten", "Västergötland", "Västmanland", "Ångermanland", "Öland", "Östergötland"])
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [county, setcounty] = useState("Blekinge");
    const [errorMessage, setErrorMessage] = useState(null)

    const changeLoginState = () => {
        setLoginState(!loginState)
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);            
    }

    const handleCountyChange = (e) => {
        setcounty(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            username,
            email,
            password,
            county
        };
        let validPassword = password.includes(password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        if (!validPassword) {   
            setErrorMessage("Lösenord måste innehålla minst 8 tecken samt minst en bokstav, siffra och specialtecken");
        }  else {
            let registerResult = await registerNewUser(newUser)
            console.log(registerResult)
            if (registerResult.success) {
                history.push("/")
            } else {
                setErrorMessage(registerResult.error);
            }
        }        
    }

    let errorContent = ""
    if (errorMessage) {
        errorContent = (
            <p>{errorMessage}</p>
        )
    }

    return (
        <form className={styles.register} onSubmit={handleSubmit}>
            <h1>Register</h1>
            {errorContent}
            <input type="text" placeholder="Användarnamn" onChange={handleUsernameChange}/>
            <input type="email" placeholder="Email" onChange={handleEmailChange}/>
            <div className={styles.passWrapper}>
                <input type={passwordShown ? "text" : "password"} placeholder="Lösenord" onChange={handlePasswordChange}/>
                <i onClick={togglePasswordVisiblity}>{eye}</i>
            </div>
            <select className="county" onChange={handleCountyChange}>
                {counties.map((county,i) => (
                    <option key="i">{county}</option>                    
                ))}
            </select>
            <button className={styles.btnRegister}>Register</button>
            <button className={styles.btnExtra} onClick={changeLoginState}>{loginState ? "Register" : "Login"}</button>
        </form>
    )
}