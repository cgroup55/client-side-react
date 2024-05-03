import { React,createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
import { convertDate } from "../tools/validations";
export const EscortContext = createContext();

export default function EscortContextProvider(props) {

    const url = 'api/Escort';
    const [escortsList, setEscortsList] = useState([]);

    const addEscort = async (escortToInsert) => {
        //DB update
        let res = await create(url, escortToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update + date fix
        escortToInsert.esc_dateOfBirth=convertDate(escortToInsert.esc_dateOfBirth, true);
        setEscortsList([...escortsList, escortToInsert]);
        return res;
    }

    const updateEscort = async (escortToUpdate) => {
        //DB update
        let res = await update(url, escortToUpdate);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //re-fetch the data from DBS
        setEscortsList([]);//what to do if not that?????????
        getEscort();
        
    }


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


    //props functions to use in pages
    const value = {
        addEscort, escortsList, getEscort,updateEscort
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
