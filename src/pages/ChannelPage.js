import { useContext, useEffect, useState } from "react"
import { ChannelsContext } from "../contexts/ChannelsProvider"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ChannelPage(props) {
    const { getChannelScheduleById, channelSchedule } = useContext(ChannelsContext);
    const { channelId } = props.match.params;
    const [startDate, setStartDate] = useState(new Date());
    const [formatDate, setFormatDate] = useState(new Date().toLocaleDateString())

    const handleDateChange = (date) => {
        setFormatDate(date.toLocaleDateString());
        //let val = date.format('YYYY-MM-DD')
        setStartDate(date)
    }

    useEffect(() => {
        getChannelScheduleById(channelId, formatDate); 
        console.log(formatDate)       
    }, [formatDate]);

    let content = "";
    if (channelSchedule && channelSchedule.length !== 0) {
        console.log(channelSchedule)
        content = (
            <div className="scheduleContainer">
                <DatePicker selected={startDate} onChange={date => handleDateChange(date)} timeFormat={false} />
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