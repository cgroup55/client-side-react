import { createContext, useState, useEffect } from "react";
import {  create ,read } from "../tools/api";
export const EscortContext = createContext();

export default function EscortContextProvider(props) {

    //פה יהיו כל הפונקציות

    //
    const addEscort = async (escortToInsert) => {
        //DB update
        let res = await create('api/...', escortToInsert);
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
        let res = await read('api/...');
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setEscortsList(res);
    }

    const value = {
        addEscort, escortsList,
        //שם הפוקציה,
    }

    useEffect(() => {
       // getEscort();
    }, []);

    return (
        <EscortContext.Provider value={value}>
            {props.children}
        </EscortContext.Provider>
    )
}
