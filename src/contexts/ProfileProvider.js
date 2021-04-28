import { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

const ProfileProvider = (props) => {
    const [ favoritePrograms, setFavoritePrograms] = useState(null)
    const [ favoriteChannels, setFavoriteChannels] = useState(null)

    const fetchAllFavoritePrograms = async (userId) => {
        let programsToGet = await fetch(`/api/v1/profile/programs/${userId}`);        
        programsToGet = await programsToGet.json();               
        setFavoritePrograms(programsToGet)
    }

    const fetchAllFavoriteChannels = async (userId) => {
        let channelsToGet = await fetch(`/api/v1/profile/channels/${userId}`);        
        channelsToGet = await channelsToGet.json();  
        console.log(channelsToGet)                
        setFavoriteChannels(channelsToGet)
    }

    const values = {
        favoritePrograms,
        fetchAllFavoritePrograms,
        favoriteChannels,
        fetchAllFavoriteChannels,
    };    

    return (
    <ProfileContext.Provider value={values}>
        {props.children}
    </ProfileContext.Provider>
    );
}
export default ProfileProvider