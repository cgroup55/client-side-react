import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
import { convertDate } from "../tools/validations";
export const StudentContext = createContext();

export default function StudentContextProvider(props) {

    const url = 'api/Student';
    const dis_url = 'api/Student_disabilities_type';
    const [studentsList, setStudentsList] = useState([]);
    const [disabilities, setDisabilities] = useState([]);
    const [disKeyVal, setDisKeyVal] = useState({});
    const [studentsListFormFormat, setStudentsListFormFormat] = useState([]);

    const addStudent = async (studentToInsert) => {
        let [lat, lng] = await getStudentGeocodeAddress(studentToInsert.address);

        //DB update
        let res = await create(url, studentToInsert);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        //Local update + date fix
        studentToInsert.stu_dateofbirth = convertDate(studentToInsert.stu_dateofbirth, true);
        studentToInsert.stu_dateOfPlacement = convertDate(studentToInsert.stu_dateOfPlacement, true);
        setStudentsList([...studentsList, studentToInsert]);
        return res;
    }

    const updateStudent = async (studentToUpdate) => {
        //DB update
        let res = await update(url, studentToUpdate);
        if (res == undefined || res == null) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }

        //Local update + fix the dates formats for each student object
        setStudentsList(() => studentsList.map(student => {
            if (student.esc_id != studentToUpdate.esc_id)
                return student;
            return {
                ...studentToUpdate, stu_dateofbirth: convertDate(student.stu_dateofbirth, true),
                stu_dateOfPlacement: convertDate(student.stu_dateOfPlacement, true)
            }
        }));

    }

    const getStudent = async () => {
        let res = await read(url);
        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }

        //Fix the date format for each student object
        setStudentsList(() => res.map(student => ({
            ...student,
            stu_dateofbirth: convertDate(student.stu_dateofbirth, true),
            stu_dateOfPlacement: convertDate(student.stu_dateOfPlacement, true)
        })));
        console.log('studentsList context:', studentsList);
    }

    const getStudentGeocodeAddress = async (address)=> {
        //fetch to tomtom geocode api
    }


    //changes the format from the server to the desired format in the form
    const fixListFormat = (originList) => {

        return originList.map(obj => {
            const newObj = {
                stu_fullName: obj.stu_fullName,
                stu_id: obj.stu_id,
                stu_dateofbirth: obj.stu_dateofbirth,
                stu_grade: obj.stu_grade,
                stu_school: obj.stu_school,
                stu_dateOfPlacement: obj.stu_dateOfPlacement,
                stu_disability: obj.stu_disability,
                stu_comments: obj.stu_comments,
            };
            //If there is at least one parent, add parent details to the new object
            if (obj.parents && obj.parents.length > 0) {
                const parent = obj.parents[0];
                newObj.stu_parentName = parent.stu_parentName;
                newObj.stu_parentCell = parent.stu_parentCell;
                newObj.stu_parentCity = parent.stu_parentCity;
                newObj.stu_parentStreet = parent.stu_parentStreet;
                newObj.stu_parentHomeNum = parent.stu_parentHomeNum;
            }

            // If there is a second parent, add their details to the new object
            if (obj.parents && obj.parents.length > 1) {
                const parent = obj.parents[1];
                newObj.stu_contactName = parent.stu_parentName;
                newObj.stu_contactCell = parent.stu_parentCell;
                newObj.stu_contactCity = parent.stu_parentCity;
                newObj.stu_contactStreet = parent.stu_parentStreet;
                newObj.stu_contactHomeNum = parent.stu_parentHomeNum;
            }

            return newObj;
        });
    }

    //gets the getDisabilities list from the DB
    const getDisabilities = async () => {
        let res = await read(dis_url);

        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setDisabilities(res);

        let disKeyVal = () =>
            res.reduce((index, disability) => {
                index[disability.typeCode] = disability.typeDescription;
                return index;
            });

        setDisKeyVal(disKeyVal);
    }


    //props functions to use in pages
    const value = {
        addStudent, getStudent, updateStudent, disabilities, disKeyVal
        , studentsListFormFormat
    }

    //get all escorts on first render
    useEffect(() => {
        getStudent();
        getDisabilities();
    }, []);


    //updates studentsListFormFormat dependent on the students list
    useEffect(() => {
        if (studentsList.length > 0) {
            // Rearrange the list format
            const fixedListOfStus = fixListFormat(studentsList);
            console.log('studentsListFormFormat:', fixedListOfStus);

            // Set the studentsListFormFormat state
            setStudentsListFormFormat(fixedListOfStus);
        }
    }, [studentsList]);

    return (
        <StudentContext.Provider value={value}>
            {props.children}
        </StudentContext.Provider>
    )
}
