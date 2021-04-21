import { useContext } from "react";
import { ChannelsContext } from "../contexts/ChannelsProvider"
import ChannelCard from "../components/ChannelCard"
import styles from "../css/Channels.module.css"
import { useHistory } from "react-router";

export default function Channels () {
    const history = useHistory()
    const { channels } = useContext(ChannelsContext);

    const handleClick = (channelId) => {
        history.push(`/channels/${channelId}`);
    };

    let content = "";
    if (channels) {
        content = (
        <div className={styles.channelsContainer}>
            {channels.map((channel, i) => {
                return (
                    <div className="channelContainer" onClick={() => handleClick(channel.id)}>
                        <ChannelCard key={i} channel={channel} />
                    </div>
                )                
            })}            
        </div>
        );
    } else {
        content = <p>Failed to load channels to page...</p>
    }

    return (
        <div className="channels">
            <h1>Channels</h1>
            {content}
        </div>
    )
}