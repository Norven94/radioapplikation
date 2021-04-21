import { useContext } from "react";
import { ProgramsContext } from "../contexts/ProgramsProvider"
import styles from "../css/Programs.module.css"
//import { useHistory } from "react-router";

export default function Programs() {
    const { programs, categories } = useContext(ProgramsContext);

    let content = "";
    if (programs && categories) {
        console.log(programs);
        console.log(categories);
        content = (
            <div className="programs">
                <div className="filterContainer">
                    {categories.map(category => {
                        return (
                            <span key={category.id} className={styles.categoryBox}>{category.name}</span>
                        )
                    })}
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