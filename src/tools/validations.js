

//validation for Hebrew letters only
export const validateHebrewletters = (input) => {
    const text = input;
    const regex = /^[\sא-ת!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;
    if (!regex.test(text)) {
        return 'ניתן להזין אותיות בעברית, רווחים, ותווים מיוחדים בלבד';
    } else {
        return '';
    }
};

export const Validateselect = (input) => {
    if (input == '' || input == "-1") {
        return 'חובה לבחור אחת מהאפשרויות';
    }
    else return '';
}



//validation for ID (9 digits only)
export const ValidateId = (input) => {
    const id = input;
    const reg = /^\d{9}$/;
    if (!reg.test(id)) {
        return 'תז חייבת להכיל 9 ספרות';
    } else {
        return '';
    }
};

//validation for digits only- positive number
export const ValidPositiveNumber = (input) => {
    const num = input;
    if (num < 0) {
        return 'לא ניתן להזין מספר שלילי';
    }
    const reg = /^\d+$/;
    if (!reg.test(num)) {
        return 'ניתן להזין ספרות בלבד';
    } else {
        return '';
    }
};

//validation for cellphone- 9 digits only
export const ValidCellPhoneNum = (input) => {
    const num = input;
    const reg = /^0\d{9}$/;
    if (!reg.test(num)) {
        return 'נייד חייב להכיל 10 ספרות';
    } else {
        return '';
    }
};

//validation for cellphone- 9 or 10 digits only
export const ValidCellOrHomePhoneNum = (input) => {
    const num = input;
    const reg = /^0\d{8,9}$/;
    if (!reg.test(num)) {
        return 'טלפון חייב להכיל 9-10 ספרות';
    } else {
        return '';
    }
};

//validation for date of birth
export const validateDateOfBirth = (input) => {
    let d = input;
    const birthDate = new Date(d)
    const today = new Date();
    if (birthDate > today) {
        return 'תאריך לידה עתידי הינו שגוי';
    }
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age >= 0 && age <= 120) {
        return '';
    } else {
        return 'תאריך לידה שגוי';
    }
};

export const validateEmail = (input) => {

    let email = input;
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!reg.test(email)) {
        return " מייל לא תקין ";
    }
    else {
        return "";
    }
}

export const isRadioButtonChecked = (input) => {
    if (input == '' || input == undefined) {
        return "חובה לבחור באחת מהאפשרויות";
    }
    else return "";
};

// export const fixDateForView = (input) => {

//     let dateWithoutTime=input.split('T');
//     let dateParts = dateWithoutTime[0].split('-');

//     let fixedDate = dateParts[2] + "/" + dateParts[1] + "/"  + dateParts[0];
//     console.log("date after view", fixedDate);

//     return fixedDate;

// }

// export const fixDateForForm = (input) => {

//     let date = input;
//     let dateWithoutTime=date.split('T');
//     if(dateWithoutTime.length>1){
//         console.log("date after form T", dateWithoutTime[0]);
//         return dateWithoutTime[0];
//     }
//     else{
//         let dateParts=dateWithoutTime[0].split("/");
//         let fixedDate = dateParts[2] + "-" + dateParts[1] + "-"  + dateParts[0];
//         console.log("date after form", fixedDate);
//         return fixedDate;
//     }

// }

export const convertDate = (value, forView) => {
    let dateParts, seperator='-';
    if(forView){
        dateParts = value.split('T')[0].split('-');
        seperator = '/';
    }
    else{
        dateParts = value.split('/');
    }

    return dateParts.reverse().join(seperator);
}

