import { createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
import { convertDate, fixDateForView } from "../tools/validations";
export const EscortContext = createContext();

export default function EscortContextProvider(props) {

    const url = 'api/Escort';
    const addEscort = async (escortToInsert) => {
        //DB update
        let res = await create(url, escortToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update
        escortToInsert.esc_dateOfBirth=convertDate(escortToInsert.esc_dateOfBirth, true);
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

        setEscortsList(() => res.map(escort => ({
            ...escort,
            esc_dateOfBirth: convertDate(escort.esc_dateOfBirth,true)
        })));
    }


    //
    const value = {
        addEscort, escortsList, getEscort
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
