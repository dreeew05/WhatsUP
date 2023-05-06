// Author: fiVe
// Description: Generates Different Alert Boxes

export class SweetAlertFactory {

    createAlertBox(title, text, icon, confirmButtonText) {
        switch(icon) {
            case 'error':
                this.errorAlertBox(title, text, icon, confirmButtonText)
                break;
            default:
                break;
        }
    }

    errorAlertBox(alertTitle, alertText, alertIcon, alertConfirmText) {
        Swal.fire({
            title: alertTitle,
            text: alertText,
            icon: alertIcon,
            confirmButtonText: alertConfirmText
        });
    }

}