import styles from "../css/ChannelCard.module.css"

export default function ChannelCard (props) {
    return (
        <div className={styles.channelCard}>
            <img src={props.channel.image} />
            <p>{props.channel.tagline}</p>
        </div>
    )
}