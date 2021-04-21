import { createContext, useState, useEffect } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {
    const [ channels, setChannels] = useState(null)
    const [ channelSchedule, setChannelSchedule] = useState(null)

    const fetchAllChannels = async () => {
        let channelsToGet = await fetch("/api/v1/channels");        
        channelsToGet = await channelsToGet.json();                 
        setChannels(channelsToGet.channels)
    } 

    useEffect(() => {
        fetchAllChannels();              
    },[]);

    const getChannelScheduleById = async (channelId) => {
        let channel = await fetch(`/api/v1/channels/schedule/${channelId}`);
        channel = await channel.json();
        console.log(channel);
        setChannelSchedule(channel);
      };

    const values = {
        channels,
        channelSchedule,
        getChannelScheduleById
    };

    return (
    <ChannelsContext.Provider value={values}>
        {props.children}
    </ChannelsContext.Provider>
    );
}

export default ChannelsProvider;