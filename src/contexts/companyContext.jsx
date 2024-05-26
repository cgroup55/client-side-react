import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
export const CompanyContext = createContext();

export default function CompanyContextProvider(props) {

    const url = 'api/TransportationCompany';
    const [companiesList, setCompaniesList] = useState([]);
    const [keyValCompany, setKeyValCompany] = useState([]);


    const addCompany = async (companyToInsert) => {
        //DB update
        let res = await create(url, companyToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return res;
        }
        //local update        
        setCompaniesList([...companiesList, companyToInsert]);
        return res;
    }

    const updateCompany = async (companyToUpdate) => {
        //DB update
        let res = await update(url, companyToUpdate);
        console.log('company update res:', res);
        if (res == undefined || res == null) {
            console.log('שגיאה- אובייקט חברה ריק מתוכן');
            return res;
        }

        //Local update
        setCompaniesList(() => companiesList.map(company => {
            if (company.company_Code != companyToUpdate.company_Code)
                return company;
            return { ...companyToUpdate }
        }));
        return res;
    }


    const getCompany = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setCompaniesList(res);
    }

    //for conversions in client- KeyValue array
    useEffect(() => {
        setKeyValCompany(() =>
            companiesList.reduce((index, company) => {
                index[company.company_Code] = company;
                return index;
            }, {})
        );
    }, [companiesList]);

    //props functions to use in pages
    const value = {
        addCompany, companiesList, getCompany, updateCompany, keyValCompany
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
