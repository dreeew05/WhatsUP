// Author: fiVe
// Description: Bridge from JavaScript to PHP

import { SweetAlertFactory } from "./SweetAlertFactory.js";

export class DataSerializer {

    constructor() {
        this.sweetAlert = new SweetAlertFactory();
    }

    getData() {
        return this.dataParser.getData();
    }

    async postData(postedData, phpFile) {
        let alertBox = this.sweetAlert,
            sample   = null;
    
        async function serializeData(url = '', jsonData = {}) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });
            return response.json();
        }
    
        return await serializeData(phpFile, postedData)
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                alertBox.createAlertBox(
                    'Error',
                    'Invalid Link',
                    'error',
                    'Okay'
                );
                const errorData = {
                    result : false
                };
                return errorData; 
            });
    }

}