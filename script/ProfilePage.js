//Author: fiVe
//Description: JavaScript for profilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { GeneratePostImage } from "./classes/GeneratePostImage.js";

class ProfilePage {
    constructor() {
        this.navBarSectionDividerImplementation();
        this.generatePostImage();
    }
    navBarSectionDividerImplementation() {
        const links  = document.querySelectorAll('.nav-item a');
        new NavBarSectionDivider(links);
    }
    generatePostImage() {
        let filenames = ["cityCampus", "cityCampus2", "cityCampus3", "cityCampus4"],
            captions  = ["Team Picture", "Balay Ilonggo", "Front Gate UP - Visayas", "LGBT OBLE"];
        new GeneratePostImage(filenames.length, filenames, captions);
    }
}

new ProfilePage();
