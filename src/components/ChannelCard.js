import { useContext } from "react";
import { LoginContext } from "../contexts/LoginProvider"
import { ProfileContext } from "../contexts/ProfileProvider"
import styles from "../css/ChannelCard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
const heart = <FontAwesomeIcon icon={faHeart} />;

export default function ChannelCard (props) {
    const { currentUser } = useContext(LoginContext)
    const { addChannelAsFavorite } = useContext(ProfileContext)

    const addToFavorites = (e) => {
        e.stopPropagation()
        let data = {
            channelsId: props.channel.id, 
            usersId: currentUser.id,
            name: props.channel.name
        }
        addChannelAsFavorite(data)
    }

    return (
        <div className={styles.channelCard}> 
            <i onClick={addToFavorites} className={styles.heartIcon}>{heart}</i>           
            <img src={props.channel.image} />
            <div>
            <h2>{props.channel.name}</h2>
            <p>{props.channel.tagline}</p>
            </div>           
        </div>
    )
}

