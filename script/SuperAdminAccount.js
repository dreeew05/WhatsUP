
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
        this.getValueFromSearch();
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

    getValueFromSearch() {
        const searchButton = document.getElementById('search-btn'),
              searchInput  = document.getElementById('search-input');
        searchButton.onclick = async() => {
            const request = {
                'profile' : searchInput.value
            };
            const response = await this.dataSerializer.postData(
                request, '/php/SearchProfile.php'
            );
            console.log(response);

            this.showProfile(response);
        }
    }
    showProfile(profileData) {
        const image = document.getElementById('profile-img');
        const name = document.getElementById('profile-result-name');
        const category = document.getElementById('profile-category');
    
        const IMG_BASE_PATH = '/assets/images/profiles/';
    
        image.src = IMG_BASE_PATH.concat(profileData['image']);
        name.textContent = profileData['name'];
        category.textContent = profileData['category'];

        // console.log(profile);
        this.deleteData(profileData['id']);
        const saveBtn = document.getElementById('save-btn');
        saveBtn.setAttribute('data-profile-id', profileData['id']);
        saveBtn.addEventListener('click', this.saveEditCredentials.bind(this));
        
    }
    
    deleteData(id) {
        const deleteBtn = document.getElementById('delete-btn');
        const image = document.getElementById('profile-img');
        const name = document.getElementById('profile-result-name');
        const category = document.getElementById('profile-category');
        
        deleteBtn.onclick = async () => {
            try {
                const request = {
                    'id': id
                };
                
                const response = await this.dataSerializer.postData(
                    request, '/php/DeleteData.php'
                );
                
                console.log(response);
                
                if (response.operation === 'success') {
               
                    image.src = '';
                    name.textContent = '';
                    category.textContent = '';
                    
                } else {
                    window.alert ("No data found");
                    
                }
            } catch (error) {
                console.error(error);
            }
        };
    }
    saveEditCredentials() {
        const editUsername = document.getElementById('edit-username').value;
        const editPassword = document.getElementById('edit-password').value;
        const confirmEditPassword = document.getElementById('edit-re-enter-pw').value;
        const profileId = document.getElementById('save-btn').getAttribute('data-profile-id');
    
        if (editPassword !== confirmEditPassword) {
            alert('Password does not match.');
            return;
        }
    
        const request = {
            'profileId': profileId,
            'newUsername': editUsername,
            'newPassword': editPassword,
            'confirmPassword': confirmEditPassword
        };
    
        fetch('/php/EditData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
        })
        .catch(error => {
            console.log(error);
    
        });
    }
}
    
// DRIVER
let driver = new SuperAdminAcount();
// DEFAULT OPTION VALUES
driver.generateOptions(
    await driver.getData('College')
);
