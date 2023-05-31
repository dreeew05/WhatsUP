// Author: fiVe
// Description: Generate the About Information of a Page

import { CreateElement } from "./CreateElement.js";

export class GenerateAbout {

    constructor(PROFILE_NAME, DISPLAY_PICTURE, BANNER_IMAGE,
        DETAILS, CATEGORY, CONTACT, SOCIALS) {
        
        // PASSED VARIABLES
        this.PROFILE_NAME    = PROFILE_NAME;
        this.DISPLAY_PICTURE = DISPLAY_PICTURE,
        this.BANNER_IMAGE    = BANNER_IMAGE,
        this.DETAILS         = DETAILS;
        this.CATEGORY        = CATEGORY;
        this.CONTACT         = CONTACT;
        this.SOCIALS         = SOCIALS;

        // METHODS
        this.generateProfileMisc();
        this.createAbout();
    }

    getProfileName() {
        return this.PROFILE_NAME;
    }
    getDisplayPicture() {
        const BASE_SRC = "/assets/images/profiles/";
        return BASE_SRC.concat(this.DISPLAY_PICTURE);
    }
    getBannerImage() {
        const BASE_SRC = "/assets/images/profiles/banner/";
        return BASE_SRC.concat(this.BANNER_IMAGE);
    }
    getDetails() {
        return this.DETAILS;
    }
    getCategory() {
        return this.CATEGORY;
    }
    getContact() {
        return this.CONTACT;
    }
    getSocials() {
        return this.SOCIALS;
    }

    generateProfileMisc() {
        const displayPicture = document.getElementById("profile-picture"),
              coverImage     = document.getElementById("cover-photo"),
              pageName       = document.getElementById("page-name"),
              category       = document.getElementById("classification");

        // SET ATTRIBUTE
        displayPicture.src   = this.getDisplayPicture();
        coverImage.src       = this.getBannerImage();
        pageName.textContent = this.getProfileName();
        category.textContent = this.getCategory();
    }

    createAbout() {
        let aboutDiv = document.getElementById("about");

        let aboutHolder  = new CreateElement("div", "about-holder", "container justify-content-center about-holder").createElement(),
            
            intro        = new CreateElement("div", "introduction", null).createElement(),
            introTitle   = new CreateElement("p", "intro-title", null).createElement(),
            hr           = new CreateElement("hr", null, null).createElement(),
            aboutDetails = new CreateElement("p", "intro-details", "about-paragraph").createElement(),
            
            category             = new CreateElement("div", "category", null).createElement(),
            categoryTitle        = new CreateElement("p", null, "emphasized-text").createElement(),
            categoryDetailHolder = new CreateElement("div", null, "logo-text-holder").createElement(),
            // folderOpen           = new CreateElement("i", null, "fa-solid fa-folder-open").createElement(),
            categoryPara         = new CreateElement("p", null, "about-paragraph").createElement();

        aboutDiv.appendChild(aboutHolder);

        // INTRO
        aboutHolder.appendChild(intro);
        intro.appendChild(introTitle);
        intro.appendChild(hr);
        intro.appendChild(aboutDetails);
        introTitle.textContent    = "About ".concat(this.getProfileName());
        aboutDetails.textContent  = this.getDetails();

        // CATEGORY
        aboutHolder.appendChild(category);
        category.appendChild(categoryTitle);
        category.appendChild(categoryDetailHolder);
        categoryDetailHolder.appendChild(this.getIcon());
        categoryDetailHolder.appendChild(categoryPara);
        categoryTitle.textContent = "Category";
        categoryPara.textContent  = this.getCategory();

        // CONTACTS
        let contactValues = Object.values(this.getContact()),
            contactIcons  = ["fa-solid fa-map-location-dot", "fa-solid fa-at", "fa-solid fa-mobile-screen-button", "fa-solid fa-tty"],

            contact      = new CreateElement("div", "contact", null).createElement(),
            contactTitle = new CreateElement("p", null, "emphasized-text").createElement();

        contactTitle.textContent = "Contacts";

        aboutHolder.appendChild(contact);
        contact.appendChild(contactTitle);

        this.generateMultipleDetails("contacts", contactValues, contactIcons, contact);

        // SOCIALS
        let socialValues = Object.values(this.getSocials()),
            socialIcons  = ["fa-solid fa-globe", "fa-brands fa-facebook", "fa-brands fa-youtube", "fa-brands fa-twitter", "fa-brands fa-tiktok"],

            social      = new CreateElement("div", "social", null).createElement(),
            socialTitle = new CreateElement("p", null, "emphasized-text").createElement();

        socialTitle.textContent = "Socials";

        aboutHolder.appendChild(social);
        social.appendChild(socialTitle);

        this.generateMultipleDetails("socials", socialValues, socialIcons, social);
    }

    getIcon() {
        const CATEGORY = this.getCategory();
        let icon       = null;
        switch(CATEGORY) {
            case "Official University Account" :
                icon = new CreateElement("i", null, 
                       "fa-solid fa-graduation-cap").createElement()
                break;
            case "Organization" :
                icon = new CreateElement("i", null,
                       "fa-solid fa-user-group").createElement();
                break;
            case "Course Page":
                icon = new CreateElement("i", null,
                       "fa-sharp fa-solid fa-building-columns")
                       .createElement();
                break;
            case "Student Financial Assistance":
                icon = new CreateElement("i", null,
                       "fa-solid fa-money-bills")
                       .createElement();
                break;
            default:
                icon = new CreateElement("i", null,
                       "fa-solid fa-user")
                       .createElement();
                break;
        }
        return icon;
    }

    generateMultipleDetails(TYPE, VALUES, ICONS, parentDiv) {
        for(let i = 0; i < VALUES.length; i++) {
            if(VALUES[i] != null) {
                let logoTextHolder = new CreateElement("div", null, "logo-text-holder").createElement(),
                    icon           = new CreateElement("i", null, ICONS[i]).createElement(),
                    value          = new CreateElement("p", null, "about-paragraph").createElement();
                
                value.textContent = VALUES[i];

                parentDiv.appendChild(logoTextHolder);
                logoTextHolder.appendChild(icon);

                if(TYPE == "socials") {
                    let link  = new CreateElement("a", null, null).createElement();
                    link.href = VALUES[i];
                    logoTextHolder.appendChild(link);
                    link.appendChild(value);

                }
                else {
                    logoTextHolder.appendChild(value);
                }
                
            }
        }
    }

}