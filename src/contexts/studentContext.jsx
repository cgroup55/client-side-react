import { React, createContext, useState, useEffect } from "react";
import { create, read, update } from "../tools/api";
import { convertDate } from "../tools/validations";
export const StudentContext = createContext();

export default function StudentContextProvider(props) {

    const url = 'api/Student';
    const dis_url = 'api/Student_disabilities_type';
    const [studentsList, setStudentsList] = useState([]);
    const [disabilities, setDisabilities] = useState([]);
    const [disKeyVal,setDisKeyVal]=useState({});

    const addStudent = async (studentToInsert) => {
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

    }

    const getDisabilities = async () => {
        let res = await read(dis_url);

        if (!res || res.length === 0) {
            console.log('שגיאה- ריק מתוכן');
            return;
        }
        setDisabilities(res);
        
        let disKeyVal= () =>
            res.reduce((index,disability) => {
                index[disability.typeCode] = disability.typeDescription;
                return index;
            });

        setDisKeyVal(disKeyVal);
    }


    //props functions to use in pages
    const value = {
        addStudent, studentsList, getStudent, updateStudent,disabilities,disKeyVal
    }

    //get all escorts on first render
    useEffect(() => {
        getStudent();
        getDisabilities();
    }, []);
    
    return (
        <StudentContext.Provider value={value}>
            {props.children}
        </StudentContext.Provider>
    )
}
