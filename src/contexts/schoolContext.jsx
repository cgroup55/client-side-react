import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
export const SchoolContext = createContext();

export default function SchoolContextProvider(props) {

    const url = 'api/Educational';
    const [schoolsList, setSchoolsList] = useState([]);

    const addSchool = async (schoolToInsert) => {
        //DB update
        let res = await create(url, schoolToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update
        setSchoolsList([...schoolsList, schoolToInsert]);
        return res;
    }

    const updateSchool = async (escortToUpdate) => {
        //DB update
        let res = await update(url, escortToUpdate);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update
        setSchoolsList([...schoolsList]);
        return res;
    }

   

    const getSchools = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setSchoolsList(res);
    }


    //props functions to use in pages
    const value = {
        addSchool, schoolsList, getSchools,updateSchool
    }

    //get all escorts on first render
    useEffect(() => {
        getSchools();
    }, []);

    return (
        <EscortContext.Provider value={value}>
            {props.children}
        </EscortContext.Provider>
    )
}
