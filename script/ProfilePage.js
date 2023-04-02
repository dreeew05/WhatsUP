//Author: fiVe
//Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { SideNavBar } from "./classes/SideNavbar.js";
import { GeneratePost } from "./classes/GeneratePost.js";

class ProfilePage {

    constructor() {
        this.navBarSectionDividerImplementation();
        this.generatePost();
        this.initializeSideNavBar();
    }
    navBarSectionDividerImplementation() {
        const links  = document.querySelectorAll('.nav-item a');
        new NavBarSectionDivider(links);
    }
    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }
    generatePost() {
        let FILE_NAMES   = ["cityCampus2", "cityCampus", "cityCampus4"],
            POST         = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            PROFILE_NAME = "University Of the Philippines - Visayas",
            PROFILE_PIC  = "../assets/images/UP_Visayas_Logo.svg.png",
            CAS_PIC      = "../assets/images/CAS_dp.jpg",
            DATE_TIME    = new Date();

            new GeneratePost(PROFILE_NAME, PROFILE_PIC, DATE_TIME, POST, FILE_NAMES);
            new GeneratePost(PROFILE_NAME, PROFILE_PIC, DATE_TIME, "Hello hehehhe", ["cityCampus2", "poster1", "poster1", "cityCampus3"]);
            new GeneratePost(PROFILE_NAME, PROFILE_PIC, DATE_TIME, POST, ["poster1"]);
            new GeneratePost(PROFILE_NAME, PROFILE_PIC, DATE_TIME, POST, ["cityCampus", "cityCampus2"]);
            new GeneratePost("College of Arts and Sciences", CAS_PIC, DATE_TIME, POST, ["sample1", "sample2", "sample3", "sample4"]);
    }
}

// DRIVER [PLEASE DO NOT MODFIY!]
new ProfilePage();

