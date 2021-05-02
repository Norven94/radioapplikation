import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { ProfileContext } from "../contexts/ProfileProvider";
import { LoginContext } from "../contexts/LoginProvider";
import ChannelCard from "../components/ChannelCard";
import ProgramCard from "../components/ProgramCard";
import styles from "../css/ProfilePage.module.css";

export default function Profile () {
    const history = useHistory()
    const { favoritePrograms, fetchAllFavoritePrograms, favoriteChannels, fetchAllFavoriteChannels, changeUserDetails } = useContext(ProfileContext);
    const { currentUser, deleteUser } = useContext(LoginContext);
    const [counties, setcounties] = useState(["Blekinge", "Bohuslän", "Dalarna", "Dalsland", "Gotland", "Gästrikland", "Halland", "Hälsingland", "Härjedalen", "Jämtland", "Lappland", "Medelpad", "Norrbotten", "Närke", "Skåne", "Småland", "Södermanland", "Uppland", "Värmland", "Västerbotten", "Västergötland", "Västmanland", "Ångermanland", "Öland", "Östergötland"])
    const [county, setCounty] = useState("")
    const [userName, setUserName] = useState(currentUser.userName)

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }
    const handleCountyChange = (e) => {
        setCounty(e.target.value)
    }

    const saveSettings = (e) => {
        e.preventDefault()
        let newDetails = {
            userName,
            county
        }
        changeUserDetails(newDetails);
    }

    const removeAccount = () => {
        deleteUser()
        history.push("/login")
    }

    useEffect(() => {
        if(currentUser) {
            fetchAllFavoritePrograms(currentUser.id);
            fetchAllFavoriteChannels(currentUser.id);            
        }     
    },[currentUser])

    let contentPrograms = "";
    if (favoritePrograms) {
        contentPrograms = (
            <div className={styles.programsContainer}>
                {favoritePrograms.map((program, i) => (
                    <ProgramCard key={i} program={program}/>
                ))}
            </div>
        );
    } else {
        contentPrograms = (
            <p>No current favorite programs</p>
        );
    }

    let contentChannels = "";
    if (favoriteChannels) {
        contentChannels = (
            <div className={styles.channelsContainer}>
                {favoriteChannels.map((channel,i) => (
                    <ChannelCard key={i} channel={channel}/>
                ))}
            </div>
        );
    } else {
        contentChannels = (
            <p>No current favorite programs</p>
        );
    }

    return (
        <div className={styles.profilePage}>
            <h1>Min profil</h1>
            <p className={styles.userIntro}>Hej {currentUser.userName} här kan du se dina favorit kanaler/program samt ändra dina uppgifter</p>
            <h2>Favorit program</h2>
            {contentPrograms}
            <h2>Favorit kanaler</h2>
            {contentChannels}
            <h2>Användar inställningar</h2>
            <form onSubmit={saveSettings}>
                <div className={styles.settingsContainer}>
                    <select className="county" onChange={handleCountyChange}>
                        {counties.map((county,i) => {
                            if (currentUser.county === county) {
                                return (
                                    <option key="i" selected>{county}</option>                    
                                )
                            }
                            return (
                                <option key="i">{county}</option>                    
                            )
                        })}
                    </select>
                    <input placeholder="Nytt användarnamn..." onChange={handleUserNameChange}/>                
                    <button className={styles.btnSave}>Spara</button>
                </div>
            </form>
            <button className={styles.btnRemove} onClick={removeAccount}>Ta bort konto</button>
        </div>
    )
}