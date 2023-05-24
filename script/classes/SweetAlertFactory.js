// Author: fiVe
// Description: Generates Different Alert Boxes

export class SweetAlertFactory {

    createAlertBox(title, text, icon, confirmButtonText) {
        switch(icon) {
            case 'error':
                this.errorAlertBox(title, text, confirmButtonText)
                break;
            case 'success':
                this.successAlertBox(title, text, confirmButtonText);
                break;
            default:
                break;
        }
    }

    errorAlertBox(title, text, confirmText) {
        Swal.fire({
            title : title,
            text : text,
            icon : 'error',
            confirmButtonText : confirmText
        });
    }

    successAlertBox(title, text, confirmText) {
        Swal.fire({
            title : title,
            text : text,
            icon : 'success',
            confirmButtonText : confirmText
        });
    }

}