import { useContext, useEffect, useState } from "react";
import { ProgramsContext } from "../contexts/ProgramsProvider"
import { ChannelsContext } from "../contexts/ChannelsProvider"
import styles from "../css/Programs.module.css"

export default function Programs() {
    const { programs, categories, fetchAllPrograms } = useContext(ProgramsContext);
    const { channels } = useContext(ChannelsContext);
    const [category, setCategory] = useState("")
    const [channel, setChannel] = useState("")

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const handleChannelChange = (e) => {
        setChannel(e.target.value)
    }

    useEffect(() => {
        setCategory(2);
        setChannel(132);
    },[])

    useEffect(() => {
        fetchAllPrograms(channel, category);
    },[channel, category])

    let content = "";
    if (programs && categories && channels) {
        content = (
            <div className="programs">
                <div className="filterContainer">
                    <select className="categories" onChange={handleCategoryChange}>
                    {categories.map(category => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                    </select>
                    <select className="channels" onChange={handleChannelChange}>
                    {channels.map(channel => {
                        return (
                            <option key={channel.id} value={channel.id}>{channel.name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className={styles.programsContainer}>
                    {programs.map(program => {
                        return (
                            <div className={styles.programBox}>
                                <img src={program.programimage}/>
                                <div className={styles.programDesc}>
                                    <h3>{program.name}</h3>
                                    <p>{program.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        content = (
            <p>Unable to fetch any data...</p>
        )
    }

    return (
        <div>
            <h1>Programs</h1>
            {content}
        </div>
    )
}