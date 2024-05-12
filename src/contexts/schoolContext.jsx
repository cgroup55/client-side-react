import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
export const SchoolContext = createContext();

export default function SchoolContextProvider(props) {

    const url = 'api/Educational';
    const [schoolsList, setSchoolsList] = useState([]);
    const [keyValSchool, setKeyValSchool] = useState({});


    const addSchool = async (schoolToInsert) => {
        //DB update
        let res = await create(url, schoolToInsert);
        console.log("res", res);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update
        setSchoolsList([...schoolsList, schoolToInsert]);
        return res;
    }


    const updateSchool = async (schoolToUpdate) => {
        //DB update
        let res = await update(url, schoolToUpdate);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }

        //Local update
        setSchoolsList(() => schoolsList.map(school => {
            if (school.institutionId != schoolToUpdate.institutionId)
                return school;
            return { ...schoolToUpdate }
        }));
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
        addSchool, schoolsList, getSchools, updateSchool,keyValSchool
    }

    //get all escorts on first render
    useEffect(() => {
        getSchools();
    }, []);


    //
    useEffect(() => {
        setKeyValSchool(() =>
            schoolsList.reduce((index,school) => {
                index[school.institutionId] = school.name;
                return index;
            }, {})
        );
    }, [schoolsList]);
    
    
    return (
        <SchoolContext.Provider value={value}>
            {props.children}
        </SchoolContext.Provider>
    )
}
