import { createContext, useState, useEffect } from "react";
import { create ,read ,update } from "../tools/api";
import { fixDateForView } from "../tools/validations";
export const EscortContext = createContext();

export default function EscortContextProvider(props) {

    const url='api/Escort';
    const addEscort = async (escortToInsert) => {
        //DB update
        let res = await create(url, escortToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update
        setEscortsList([...escortsList, escortToInsert]);
        return res;
    }

    const [escortsList, setEscortsList] = useState([]);

    const getEscort = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        
        // Fix the date format for each escort object
        const fixedEscorts = res.map(escort => ({
            ...escort,
            esc_dateOfBirth: fixDateForView(escort.esc_dateOfBirth) // Assuming fixDateForView is a valid function
        }));
        
        setEscortsList(fixedEscorts);
        console.log("Escort GET:", fixedEscorts);
    }
    

    //
    const value = {
        addEscort, escortsList,
        //שם הפוקציה,
    }

    //get all escorts on first render
    useEffect(() => {
       getEscort();
    }, []);

    return (
        <EscortContext.Provider value={value}>
            {props.children}
        </EscortContext.Provider>
    )
}
