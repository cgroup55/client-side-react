import Swal from 'sweetalert2';

export const showSuccessMessage = () => {
    Swal.fire({
        title: 'נשמר בהצלחה!',
        icon: 'success',
        timer: 1000, 
        showConfirmButton: false
    });
};
