//Author: fiVe
//Description: JavaScript for profilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";

const links  = document.querySelectorAll('.nav-item a');
const nbsd   = new NavBarSectionDivider(links);

import { GeneratePostImage } from "./classes/GeneratePostImage.js";

let filenames = ["cityCampus", "cityCampus2", "cityCampus3", "cityCampus4"],
    captions  = ["Team Picture", "Balay Ilonggo", "Front Gate UP - Visayas", "LGBT OBLE"];

new GeneratePostImage(filenames.length, filenames, captions);