import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
import { convertDate } from "../tools/validations";
export const EscortContext = createContext();

export default function EscortContextProvider(props) {

    const url = 'api/Escort';
    const [escortsList, setEscortsList] = useState([]);
    const [keyValEscort, setKeyValEscort] = useState({});

    const addEscort = async (escortToInsert) => {
        //DB update
        let res = await create(url, escortToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //Local update + date fix
        escortToInsert.esc_dateOfBirth = convertDate(escortToInsert.esc_dateOfBirth, true);
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
        console.log('escortToUpdate', escortToUpdate);
 
        // Convert date before updating state
        escortToUpdate.esc_dateOfBirth = convertDate(escortToUpdate.esc_dateOfBirth, true);
        // Local update
        setEscortsList(escortsList.map(escort =>
            escort.esc_id !== escortToUpdate.esc_id ? escort : escortToUpdate
        ));
    }


    const getEscort = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }

        //Fix the date format for each escort object
        setEscortsList(() => res.map(escort => ({
            ...escort,
            esc_dateOfBirth: convertDate(escort.esc_dateOfBirth, true)
        })));

    }

    //for conversions in client- KeyValue array
    useEffect(() => {
        setKeyValEscort(() =>
            escortsList.reduce((index, escort) => {
                index[escort.esc_id] = escort;
                return index;
            }, {})
        );
    }, [escortsList]);


    //props functions to use in pages
    const value = {
        addEscort, escortsList, getEscort, updateEscort, keyValEscort
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
