// Author: fiVe
// Description: Generates Contents of the SideNavBar

import { GenerateSideNavBarContents } from "./GenerateSideNavBarContents.js";

export class SideNavBar {

    constructor() {
        this.createSideNavBar();
    }
    
    createSideNavBar() {
        // this.createEntityContents(entity);

        const collegeContents    = JSON.parse('{"College of Arts and Sciences" : {"pages" : {"UPV Komsai.org" : "komsai.png", "UPV Chemistry Society" : "chem.png", "UPV Statistical Society" : "stat.png", "Elektrons" : "elektrons.png", "Redbolts" : "redbolts.png"}},' + 
                                   '"School of Technology" : {"pages" : {"Food Tech" : "foodtech.jpg", "SoTech Student Council" : "sotechSC.jpg", "OUnCES" : "ounces.jpg"}}}'),
              studentContents    = JSON.parse('{"Scholarships": {"pages" : {"DOST" : "dost.jpg", "CHED" : "ched.jpg", "NGCP" : "ngcp.jpg", "Bello" : "bello.jpg", "SLAS" : "slas.jpg"}},' +
                                   '"Student Organizations" : {"pages" : {"UPV Student Council" : "upvStudentCouncil.jpg", "CAS SC" : "casSC.jpg"}}}'),
              universityContents = JSON.parse('{"UP System" : {"pages" : {"UP - System" : "upSystem.jpg", "Philippine Collegian" : "phkule.jpg"}},' +
                                   '"University of the Philippines - Visayas" : {"pages" : {"UP - Visayas" : "upVisayas.jpg", "UPV Registrar" : "upvRegistrar.jpg", "UPV CRSIS" : "upVisayas.jpg", "UPV Student Affairs" : "upVisayas.jpg", "UPV Freedom Wall(?)" : "upvFreedomWall.jpg"}}}')

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