import { createContext, useState, useEffect, useContext } from "react";
import { ChannelsContext } from "./ChannelsProvider"
import { ProgramsContext } from "./ProgramsProvider"

export const ProfileContext = createContext();

const ProfileProvider = (props) => {
    const { channels } = useContext(ChannelsContext);
    const { programs } = useContext(ProgramsContext);
    const [ favoritePrograms, setFavoritePrograms] = useState(null)
    const [ favoriteChannels, setFavoriteChannels] = useState(null)

    const fetchAllFavoritePrograms = async (userId) => {
        let favoriteProgramsToGet = await fetch(`/api/v1/profile/programs/${userId}`);        
        favoriteProgramsToGet = await favoriteProgramsToGet.json();     
        
        console.log(programs)
        let favoritesId = favoriteProgramsToGet.map(favorite => favorite.programId);
        let favorites = programs.filter(program => favoritesId.includes(program.id));            
        setFavoritePrograms(favorites)
    }

    const fetchAllFavoriteChannels = async (userId) => {
        let favoriteChannelsToGet = await fetch(`/api/v1/profile/channels/${userId}`);        
        favoriteChannelsToGet = await favoriteChannelsToGet.json();  
                
        let favoritesId = favoriteChannelsToGet.map(favorite => favorite.channelId);
        let favorites = channels.filter(channel => favoritesId.includes(channel.id));            
        setFavoriteChannels(favorites)
    }

    const addChannelAsFavorite = async (data) => {
        let result = await fetch("/api/v1/profile/channel", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        result = await result.json();
        console.log(result)
        return result;
    };

    const addProgramAsFavorite = async (data) => {
        let result = await fetch("/api/v1/profile/program", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        result = await result.json();
        console.log(result)
        return result;
    };

    const values = {
        favoritePrograms,
        fetchAllFavoritePrograms,
        favoriteChannels,
        fetchAllFavoriteChannels,
        addChannelAsFavorite,
        addProgramAsFavorite
    };    

    return (
    <ProfileContext.Provider value={values}>
        {props.children}
    </ProfileContext.Provider>
    );
}
export default ProfileProvider