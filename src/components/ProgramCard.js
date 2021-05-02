import { useContext } from "react";
import { LoginContext } from "../contexts/LoginProvider"
import { ProfileContext } from "../contexts/ProfileProvider"
import styles from "../css/Programs.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
const heart = <FontAwesomeIcon icon={faHeart} />;

export default function ProgramCard(props) {
    const { currentUser } = useContext(LoginContext)
    const { addProgramAsFavorite } = useContext(ProfileContext)

    const addToFavorites = (e) => {
        e.stopPropagation()
        let data = {
            programsId: props.program.id, 
            usersId: currentUser.id,
            name: props.program.name
        }
        addProgramAsFavorite(data)
    }

    return (
        <div className={styles.programBox}>
            <img src={props.program.programimage} />
            <div className={styles.programDesc}>
                <h3>{props.program.name}</h3>
                <p>{props.program.description}</p>
                <i onClick={addToFavorites} className={styles.heartIcon}>{heart}</i>            
            </div>
        </div>
    )
}