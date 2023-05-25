// Author: fiVe
// Description: JavaScript for SuperAdminAcount

import { CreateElement } from "./classes/CreateElement.js";
import { DataSerializer } from "./classes/DataSerializer.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { SweetAlertFactory } from "./classes/SweetAlertFactory.js";

class SuperAdminAcount {

    constructor() {
        // GLOBAL VARIABLES
        this.dataSerializer = new DataSerializer();
        this.alertBox       = new SweetAlertFactory();

        this.initializeNavBar();
        this.getResponse();
        this.getDepartments();
    }

    initializeNavBar() {
        new NavBarFactory("type3", "admin");
    }

    getResponse() {

        const header = window.location.href;

        if(header.includes("creationSuccess")) {
            const link     = header.split("?"),
                  response = link[1].split("="),
                  value    = response[1];

            switch(value) {
                case "true":
                    this.alertBox.createAlertBox(
                        'Congratulations!',
                        'Account is Created',
                        'success',
                        'Okay'
                    );
                    break;
                case "false":
                    this.alertBox.createAlertBox(
                        'Error!',
                        'Cannot Create Account',
                        'error',
                        'Okay'
                    );
                    break;
                default:
                    break;
            }
        }
    }

    async getDepartments() {
        const classificationButton = document.getElementById("select-classification");

        classificationButton.onchange = async() => {
            // console.log(classificationButton.value);
            this.generateOptions(
                await this.getData(classificationButton.value)
            );
        }

    }

    async getData(selectedOption) {
        const phpURL    = '../php/DepartmentGetter.php',
              dataQuery = {
                query : selectedOption
              }
        
        return await this.dataSerializer.postData(dataQuery, phpURL);
    }

    generateOptions(data) {
        const departmentButton = document.getElementById("select-department"),
              options          = document.querySelectorAll('.department-options');

        if(options) {
            options.forEach((option) => {
                option.remove();
            });
        }

        for(let i = 0; i < data.result.length; i++) {
            let option = new CreateElement("option", null,
                         'department-options').createElement();

            option.value       = data.result[i];
            option.textContent = data.result[i];

            departmentButton.appendChild(option);
        }
    }

}

// DRIVER
let driver = new SuperAdminAcount();
// DEFAULT OPTION VALUES
driver.generateOptions(
    await driver.getData('College')
);