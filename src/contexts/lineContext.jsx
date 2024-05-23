import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
import { convertDate } from "../tools/validations";
export const LineContext = createContext();

export default function LineContextProvider(props) {

    const url = 'api/Transportation_Line';
    const [linesList, setLinesList] = useState([]);

    const addLine = async (lineToInsert) => {
        //DB update
        let res = await create(url, lineToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //Local update + date fix
        lineToInsert.definition_date = convertDate(lineToInsert.definition_date, true);
        setLinesList([...linesList, lineToInsert]);
        return res;
    }

    const updateLine = async (lineToUpdate,studentsId) => {
        //DB update
        let res = await update(url, lineToUpdate);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        console.log("in context",studentsId);
        // Convert the date before updating state and re-attach the student ids
        lineToUpdate.definition_date = convertDate(lineToUpdate.definition_date, true);
        lineToUpdate.studentsId=studentsId;
        console.log("from update",lineToUpdate);
        // Local update
        setLinesList(linesList.map(line =>
            line.line_code !== lineToUpdate.line_code ? line : lineToUpdate
        ));
    }


    const getLines = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }

        //Fix the date format for each line object
        setLinesList(() => res.map(line => ({
            ...line,
            definition_date: convertDate(line.definition_date, true)
        })));

    }


    //props functions to use in pages
    const value = {
        addLine, linesList, getLines, updateLine
    }

    //get all lines on first render
    useEffect(() => {
        getLines();
    }, []);

    return (
        <LineContext.Provider value={value}>
            {props.children}
        </LineContext.Provider>
    )
}
