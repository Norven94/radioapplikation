import { createContext, useState, useEffect } from "react";

export const ProgramsContext = createContext();

const ProgramsProvider = (props) => {
    const [ programs, setPrograms] = useState(null)
    const [ filteredPrograms, setFilteredPrograms] = useState(null)
    const [ categories, setCategories] = useState(null)

    const fetchAllPrograms = async () => {
        let programsToGet = await fetch(`/api/v1/programs`);        
        programsToGet = await programsToGet.json();               
        setPrograms(programsToGet.programs)
    }

    const fetchFilteredPrograms = async (channelId, catId) => {
        let programsToGet = await fetch(`/api/v1/programs/${channelId}/${catId}`);        
        programsToGet = await programsToGet.json();               
        setFilteredPrograms(programsToGet.programs)
    }
    
    const fetchAllCategories = async () => {
        let CategoriesToGet = await fetch(`/api/v1/programs/categories`);               
        CategoriesToGet = await CategoriesToGet.json();                         
        setCategories(CategoriesToGet.programcategories)
    }

    useEffect(() => {          
        fetchAllCategories();  
        fetchAllPrograms();                        
    },[]);

    const values = {
        programs,
        categories,
        fetchFilteredPrograms,
        filteredPrograms
    };

    return (
    <ProgramsContext.Provider value={values}>
        {props.children}
    </ProgramsContext.Provider>
    );
}

export default ProgramsProvider