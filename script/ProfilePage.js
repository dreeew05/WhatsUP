//Author: fiVe
//Description: JavaScript for ProfilePage

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
        let filenames = ["poster1", "cityCampus2", "cityCampus3"],
            captions  = ["Team Picture", "Balay Ilonggo", "Front Gate UP - Visayas", "LGBT OBLE"];
        new GeneratePostImage(filenames.length, filenames, captions);
        new GeneratePostImage(2, ["poster1", "cityCampus3"], captions);
        new GeneratePostImage(1, ["poster1"], captions);

    }
}

// DRIVER [PLEASE DO NOT MODFIY!]
new ProfilePage();
