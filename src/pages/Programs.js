import { useContext, useEffect, useState } from "react";
import { ProgramsContext } from "../contexts/ProgramsProvider"
import { ChannelsContext } from "../contexts/ChannelsProvider"
import styles from "../css/Programs.module.css";
import ProgramCard from "../components/ProgramCard"

export default function Programs() {
    const { programs, categories, fetchFilteredPrograms, filteredPrograms } = useContext(ProgramsContext);
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
        fetchFilteredPrograms(channel, category);
    },[channel, category])

    let contentPrograms = [];
    if (filteredPrograms) {
        contentPrograms = filteredPrograms
    } else {
        contentPrograms = programs
    }

    let content = "";
    if (programs && categories && channels) {
        content = (
            <div className="programs">
                <div className={styles.filterContainer}>
                    <select className={styles.categories} onChange={handleCategoryChange}>
                    {categories.map(category => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                    </select>
                    <select className={styles.channels} onChange={handleChannelChange}>
                    {channels.map(channel => {
                        return (
                            <option key={channel.id} value={channel.id}>{channel.name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className={styles.programsContainer}>
                    {contentPrograms.map((program, i) => {
                        return (
                            <ProgramCard key={i} program={program} />                            
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