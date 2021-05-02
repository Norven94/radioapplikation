import { useContext, useEffect, useState } from "react"
import { ChannelsContext } from "../contexts/ChannelsProvider"
import styles from "../css/ChannelPage.module.css"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
const noImage = <FontAwesomeIcon icon={faImage} size="4x" />;

export default function ChannelPage(props) {
    const { getChannelScheduleById, channelSchedule } = useContext(ChannelsContext);
    const { channelId } = props.match.params;
    const [startDate, setStartDate] = useState(new Date());
    const [formatDate, setFormatDate] = useState(new Date().toLocaleDateString())

    const handleDateChange = (date) => {
        setFormatDate(date.toLocaleDateString());
        setStartDate(date)
    }

    useEffect(() => {
        getChannelScheduleById(channelId, formatDate); 
        console.log(formatDate)       
    }, [formatDate]);

    let content = "";
    if (channelSchedule && channelSchedule.length !== 0) {
        content = (
            <div className={styles.schedule}>
                <div className={styles.datepicker}>
                    <DatePicker selected={startDate} onChange={date => handleDateChange(date)} timeFormat={false} />
                </div>
                <div className={styles.scheduleContainer}>
                    {channelSchedule.map((program,i) => {
                        return (
                            <div className={styles.programContainer}>
                                {console.log(program)}
                                {program.imageurl ? <img src={program.imageurl}/> : <i className={styles.noImage}>{noImage}</i>}
                                <div className={styles.programDesc}>
                                    <h3>{program.title}</h3>
                                    <p>{program.description}</p>
                                    <span>{program.starttimeutc.match(/\s.*$/)} -{program.endtimeutc.match(/\s.*$/)}</span>
                                </div>                            
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        content = (<p>Failed to load any channel data...</p>)
    }

    return (
        <div className="channelPage">
            <h1>Tablå</h1>
            {content}
        </div>
    )
}