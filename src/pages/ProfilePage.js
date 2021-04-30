import { useEffect, useContext } from "react";
import { ProfileContext } from "../contexts/ProfileProvider";
import { LoginContext } from "../contexts/LoginProvider";
import ChannelCard from "../components/ChannelCard";
import ProgramCard from "../components/ProgramCard";

export default function Profile () {
    const { favoritePrograms, fetchAllFavoritePrograms, favoriteChannels, fetchAllFavoriteChannels } = useContext(ProfileContext);
    const { currentUser } = useContext(LoginContext);

    useEffect(() => {
        if(currentUser) {
            fetchAllFavoritePrograms(currentUser.id);
            fetchAllFavoriteChannels(currentUser.id);
        }     
    },[currentUser])

    let contentPrograms = "";
    if (favoritePrograms) {
        contentPrograms = (
            <div>{favoritePrograms.map((program, i) => (
                <ProgramCard key={i} program={program}/>
            ))}</div>
        );
    } else {
        contentPrograms = (
            <p>No current favorite programs</p>
        );
    }

    let contentChannels = "";
    if (favoriteChannels) {
        contentChannels = (
            <div>{favoriteChannels.map((channel,i) => (
                <ChannelCard key={i} channel={channel}/>
            ))}</div>
        );
    } else {
        contentChannels = (
            <p>No current favorite programs</p>
        );
    }

    return (
        <div className="Profile">
            <h1>Min profil</h1>
            <h2>Favorit program</h2>
            {contentPrograms}
            <h2>Favorit kanaler</h2>
            {contentChannels}
        </div>
    )
}