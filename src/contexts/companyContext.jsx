import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
export const CompanyContext = createContext();

export default function CompanyContextProvider(props) {

    const url = 'api/TransportationCompany';
    const [companiesList, setCompaniesList] = useState([]);

    const addCompany = async (companyToInsert) => {
        //DB update
        let res = await create(url, companyToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //local update        
        setCompaniesList([...companiesList, companyToInsert]);
        return res;
    }

    const updateCompany = async (companyToUpdate) => {
        //DB update
        let res = await update(url, companyToUpdate);
        if (res == undefined || res == null) {
            console.log('שגיאה- אובייקט חברה ריק מתוכן');
            return;
        }
        //re-fetch the data from DB
        //setCompaniesList([]);
        getCompany();
    }


    const getCompany = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setCompaniesList(res);
    }


    //props functions to use in pages
    const value = {
        addCompany, companiesList, getCompany, updateCompany
    }

    //get all companies on first render
    useEffect(() => {
        getCompany();
    }, []);

    return (
        <CompanyContext.Provider value={value}>
            {props.children}
        </CompanyContext.Provider>
    )
}
