import { createContext, useState, useEffect } from "react";

export const ProgramsContext = createContext();

const ProgramsProvider = (props) => {
    const [ programs, setPrograms] = useState(null)
    const [ categories, setCategories] = useState(null)

    const fetchAllPrograms = async (channelId, catId) => {
        console.log(channelId);
        console.log(catId);
        let programsToGet = await fetch(`/api/v1/programs/${channelId}/${catId}`);        
        programsToGet = await programsToGet.json();  
        console.log(programsToGet)                
        setPrograms(programsToGet.programs)
    }
    
    const fetchAllCategories = async () => {
        let CategoriesToGet = await fetch(`/api/v1/programs/categories`);               
        CategoriesToGet = await CategoriesToGet.json();                         
        setCategories(CategoriesToGet.programcategories)
    }

    useEffect(() => {          
        fetchAllCategories();                    
    },[]);

    const values = {
        programs,
        categories,
        fetchAllPrograms
    };

    return (
    <ProgramsContext.Provider value={values}>
        {props.children}
    </ProgramsContext.Provider>
    );
}

export default ProgramsProvider