

//validation for Hebrew letters only
export const validateHebrewletters = (input) => {
    if (input == '') {
        return 'זהו שדה חובה';
    }
    const text = input;
    const regex = /^[א-ת\s]+$/;
    if (!regex.test(text)) {
        return 'ניתן להזין אותיות בעברית בלבד';
    } else {
        return '';
    }
};

//validation for street and city
export const validateCityNstreet = (input) => {
    if (input == '') {
        return 'זהו שדה חובה';
    }
    const text = input;
    const regex = /^[א-ת\s()\-.'"/]+$/u;
    if (!regex.test(text)) {
        return 'ניתן להזין כתובת בעברית בלבד';
    } else {
        return '';
    }
};

//validation for ID (9 digits only)
export const ValidateId = (input) => {
    if (input == '') {
        return 'זהו שדה חובה';
    }
    const id = input;
    const reg = /^\d{9}$/;
    if (!reg.test(id)) {
        return 'תז חייבת להכיל 9 ספרות';
    } else {
        return '';
    }
};

//validation for digits only
export const ValidPositiveNumber = (input) => {
    if (input == '') {
        return 'זהו שדה חובה';
    }
    const num = input;
    const reg = /^\d+$/;
    if (!reg.test(num)) {
        return 'ניתן להזין ספרות בלבד';
    } else {
        return '';
    }
};

//validation for date of birth
export const validateDateOfBirth = (input) => {
    let d = input;
    if (d == '') {
        return 'זהו שדה חובה';
    }
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
