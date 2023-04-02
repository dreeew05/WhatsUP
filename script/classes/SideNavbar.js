// Author: fiVe
// Description: Generates Contents of the SideNavBar

import { CreateElement } from "./CreateElement.js";
import { IntegerToEnglishWord } from "./IntegerToEnglishWord.js";

export class SideNavBar {
    
    constructor(contents) {
        this.contents = contents;
        this.createSideNavBar();
    }
    getContents() {
        return this.contents;
    }
    createSideNavBar() {
        let integerToEnglish = new IntegerToEnglishWord();
        let accordionFlush   = new CreateElement("div", "accordionFlush", "accordion accordion-flush").createElement();

        let profileNameHolder = document.getElementById("profile-name-holder");
        profileNameHolder.appendChild(accordionFlush);

        let keys   = Object.keys(this.getContents()),
            values = Object.values(this.getContents()); 
        
        for(let i = 0; i < keys.length; i++ ) {
            let collegeName = keys[i];
            console.log(collegeName);

            let currentCollegeCounter = integerToEnglish.convertInteger(i + 1);

            // CREATE ELEMENTS
            let accordionItem     = new CreateElement("div", null, "accordion-item").createElement(),
                accordionHeader   = new CreateElement("h2", "flush-heading" + currentCollegeCounter, "accordion-header").createElement(),
                accordionButton   = new CreateElement("button", null, "accordion-button collapsed").createElement(),
                accordionCollapse = new CreateElement("div", "flush-collapse" + currentCollegeCounter, "accordion-collapse collapse").createElement(),
                accordionBody     = new CreateElement("div", null, "accordion-body").createElement();

            // SET OTHER ATTRIBUTES
            accordionButton.setAttribute("type", "button");
            accordionButton.setAttribute("data-bs-toggle", "collapse");
            accordionButton.setAttribute("data-bs-target", "#flush-collapse" + currentCollegeCounter);
            accordionButton.setAttribute("aria-expanded", "false");
            accordionButton.setAttribute("aria-controls", "flush-collapse" + currentCollegeCounter);
            accordionButton.textContent = collegeName;

            accordionCollapse.setAttribute("aria-labelledby", "flush-heading" + currentCollegeCounter);
            accordionCollapse.setAttribute("data-bs-parent", "accordionFlush");

            // LINK ELEMENTS
            accordionFlush.appendChild(accordionItem);
            accordionItem.appendChild(accordionHeader);
            accordionHeader.appendChild(accordionButton);
            accordionItem.appendChild(accordionCollapse);
            accordionCollapse.appendChild(accordionBody);
            
            let organizationLength = Object.values(values[i].organizations).length;

            for(let j = 0; j < organizationLength; j++) {
                let organizationName = Object.keys(values[i].organizations)[j],
                    organizationImg  = Object.values(values[i].organizations)[j]
                // console.log(organizationImg);

                let childProfileHolder = new CreateElement("div", null, "child-profile-holder").createElement(),
                    profileImage       = new CreateElement("img", null, null).createElement(),
                    profileLink        = new CreateElement("a", null, null).createElement();

                // SET ATTRIBUTE
                let BASE_PATH = "/assets/images/";
                profileImage.setAttribute("src", BASE_PATH + organizationImg);
                profileImage.setAttribute("alt", organizationImg);

                profileLink.setAttribute("href", "#");
                profileLink.textContent = organizationName;

                // LINK ELEMENTS
                accordionBody.appendChild(childProfileHolder);
                childProfileHolder.appendChild(profileImage);
                childProfileHolder.appendChild(profileLink);

                if(j != organizationLength - 1) {
                    console.log(j);
                    let profileDivider = new CreateElement("hr", null, null).createElement();
                    accordionBody.appendChild(profileDivider);
                }
            }
        }
    }
    hamburgerToggler() {
        var width = document.getElementById("mySidenav").style.width;
        if (width === "0px" || width == "") {
            document.getElementById("mySidenav").style.width = "24rem";
            $('.animated-icon').toggleClass('open');
        }
        else {
            document.getElementById("mySidenav").style.width = "0px";
            $('.animated-icon').toggleClass('open');
        }   
    }
}