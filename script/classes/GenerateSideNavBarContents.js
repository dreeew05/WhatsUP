import { IntegerToEnglishWord } from "./IntegerToEnglishWord.js";
import { CreateElement } from "./CreateElement.js";

export class GenerateSideNavBarContents {
    
    constructor(ENTITY_NAME, CONTENTS, COUNTER) {
        this.ENTITY_NAME     = ENTITY_NAME;
        this.CONTENTS        = CONTENTS;
        this.COUNTER         = COUNTER;

        this.initializeCounter();
        this.createEntity();
    }

    initializeCounter() {
        this.setCounter(this.getCounter() + 1);
    }

    getEntityName() {
        return this.ENTITY_NAME;
    }
    getContents() {
        return this.CONTENTS;        
    }
    getCounter() {
        return this.COUNTER;
    }
    setCounter(COUNTER) {
        this.COUNTER = COUNTER;
    }

    createEntity() {
        // CREATE ELEMENTS
        let entity          = new CreateElement("div", null, "profile-name-holder").createElement(),
            holderTitle     = new CreateElement("div", null, "holder-title").createElement(),
            holderTitleText = new CreateElement("p", null, "holder-title-text").createElement();
            
        // SET ATTRIBUTE
        holderTitleText.textContent = this.getEntityName();

        // LINK ELEMENTS
        let SIDENAV = document.getElementById("mySidenav");
        SIDENAV.appendChild(entity);
        entity.appendChild(holderTitle);
        holderTitle.appendChild(holderTitleText);

        this.createEntityContents(entity);

    }
    createEntityContents(PROFILE_NAME_HOLDER) {
        let integerToEnglish = new IntegerToEnglishWord();
        let accordionFlush   = new CreateElement("div", "accordionFlush", "accordion accordion-flush").createElement();

        PROFILE_NAME_HOLDER.appendChild(accordionFlush);

        let keys   = Object.keys(this.getContents()[0]),
            values = Object.values(this.getContents()[0]); 
        
        for(let i = 0; i < keys.length; i++ ) {
            let groupName = keys[i];
            // console.log(groupName);

            this.setCounter(this.getCounter() + i);
            let currentCollegeCounter = integerToEnglish.convertInteger(this.getCounter());

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
            accordionButton.textContent = groupName;

            accordionCollapse.setAttribute("aria-labelledby", "flush-heading" + currentCollegeCounter);
            accordionCollapse.setAttribute("data-bs-parent", "accordionFlush");

            // LINK ELEMENTS
            accordionFlush.appendChild(accordionItem);
            accordionItem.appendChild(accordionHeader);
            accordionHeader.appendChild(accordionButton);
            accordionItem.appendChild(accordionCollapse);
            accordionCollapse.appendChild(accordionBody);
            
            let organizationLength = Object.values(values[i].pages).length;

            for(let j = 0; j < organizationLength; j++) {
                let organizationName = Object.keys(values[i].pages)[j],
                    organizationImg  = Object.values(values[i].pages)[j]
                // console.log(organizationImg);

                let childProfileHolder = new CreateElement("div", null, "child-profile-holder").createElement(),
                    profileImage       = new CreateElement("img", null, null).createElement(),
                    profileLink        = new CreateElement("a", null, null).createElement();

                // SET ATTRIBUTE
                let BASE_PATH = "/assets/images/logos/";
                profileImage.setAttribute("src", BASE_PATH + organizationImg);
                profileImage.setAttribute("alt", organizationImg);

                profileLink.setAttribute("href", "#");
                profileLink.textContent = organizationName;

                // LINK ELEMENTS
                accordionBody.appendChild(childProfileHolder);
                childProfileHolder.appendChild(profileImage);
                childProfileHolder.appendChild(profileLink);

                if(j != organizationLength - 1) {
                    // console.log(j);
                    let profileDivider = new CreateElement("hr", null, null).createElement();
                    accordionBody.appendChild(profileDivider);
                }
            }
        }
    }
}