import { useContext, useEffect } from "react"
import { ChannelsContext } from "../contexts/ChannelsProvider"

export default function ChannelPage(props) {
    const { getChannelScheduleById, channelSchedule } = useContext(ChannelsContext);
    const { channelId } = props.match.params;

    useEffect(() => {
        getChannelScheduleById(channelId);        
    }, []);

    let content = "";
    if (channelSchedule && channelSchedule.length !== 0) {
        console.log(channelSchedule)
        content = (
            <div className="scheduleContainer">
                {channelSchedule.map((program,i) => {
                    return (
                        <div className="programContainer">
                            <h3>{program.title}</h3>
                            <p>{program.description}</p>
                            <span>Börjar:{program.starttimeutc}</span>
                            <span>Slutar:{program.endtimeutc}</span>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        content = (<p>Failed to load any channel data...</p>)
    }

    return (
        <div className="channelPage">
            {content}
        </div>
    )
}