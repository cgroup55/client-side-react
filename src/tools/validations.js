 
 
 //validation for Hebrew letters only
 export const validateHebrewletters = (input) => {
    const text = input;
    const regex = /^[א-ת\s]+$/;
    if (!regex.test(text)) {
        console.log('קלט שגוי- ניתן להזין רק אותיות בעברית');
        // setUserError(prev => { return { ...prev, userStreet: true, } })
        // setUserErrorMsg((prev) => { return { ...prev, userStreet: "Only text in hebrew allowed, please try again" } });
    } else {
        console.log('קלט תקין');
        // setUser(prev => { return { ...prev, userStreet: street } });
        // setUserError(prev => { return { ...prev, userStreet: false, } })
        // setUserErrorMsg((prev) => { return { ...prev, userStreet: '' } });
    }
};

//validation for digits only     
//input?? or e.target.value? הקלט צריך להשתנות?
export const ValidPositiveNumber = (input) => {
    const regex = /^\d+$/;
    return regex.test(input);
}

//validation for ID (9 digits only)
export const ValidateId = (input) => {
    const reg = /^\d{9}$/;
    return reg.test(input);
}