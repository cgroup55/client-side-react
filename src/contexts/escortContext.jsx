import { createContext, useState, useEffect } from "react";
import { create ,read ,update } from "../tools/api";
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
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setEscortsList(res);
        console.log("Escort GET:",res);
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
