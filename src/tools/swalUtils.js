import Swal from 'sweetalert2';

export const showSuccessMessage = () => {
    Swal.fire({
        title: 'נשמר בהצלחה!',
        icon: 'success',
        timer: 1500, 
        showConfirmButton: false
    });
};

export const showErrorMessage = () => {
    Swal.fire({
        title: 'שגיאה בשמירת הנתונים!',
        text: 'נסה שנית במועד מאוחר יותר',
        icon: 'error',
        confirmButtonText: 'חזור לטופס',
        showConfirmButton: true
    });
};

export const showInvalidDetailsMessage = () => {
    Swal.fire({
        title: 'פרטים לא תקינים!',
        text: 'נא לבדוק ולנסות שוב',
        icon: 'error',
        confirmButtonText:  'חזור לטופס',
        showConfirmButton: true
    });
};

export const loginSuccessMessage = (userName) =>{
    Swal.fire({                    
        title: `שלום ${userName}`,
        text: "התחברת בהצלחה",
        icon: "success",
        timer: 1800,
        showConfirmButton: false
    });
}