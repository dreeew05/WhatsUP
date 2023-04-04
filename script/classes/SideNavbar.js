// Author: fiVe
// Description: Generates Contents of the SideNavBar

import { GenerateSideNavBarContents } from "./GenerateSideNavBarContents.js";

// TEST DATA
import collegeJSON from "../../test/sideNavBar/collegeContents.json" assert { type: 'json' };
import studentJSON from "../../test/sideNavBar/studentContents.json" assert { type: 'json' };
import universityJSON from "../../test/sideNavBar/universityContents.json" assert { type: 'json' };

export class SideNavBar {

    constructor() {
        this.createSideNavBar();
    }
    
    createSideNavBar() {

        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        const collegeContents    = collegeJSON,
              studentContents    = studentJSON,
              universityContents = universityJSON;

        let college    = null,
            student    = null,
            university = null;
        
        college    = new GenerateSideNavBarContents("College", collegeContents, 0);
        student    = new GenerateSideNavBarContents("Student", studentContents, college.getCounter());
        university = new GenerateSideNavBarContents("University", universityContents, student.getCounter());
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