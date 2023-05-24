// Author: fiVe
// Description: Generates Contents of the SideNavBar

import { GenerateSideNavBarContents } from "./GenerateSideNavBarContents.js";

// TEST DATA
import collegeJSON from "../../test/sideNavBar/collegeContents.json" assert { type: 'json' };
import studentJSON from "../../test/sideNavBar/studentContents.json" assert { type: 'json' };
import universityJSON from "../../test/sideNavBar/universityContents.json" assert { type: 'json' };
import { DataSerializer } from "./DataSerializer.js";

export class SideNavBar {

    constructor() {
        // GLOBAL VARIABLES
        this.dataSerializer = new DataSerializer();

        // METHODS
        this.createSideNavBar();
    }
    
    async createSideNavBar() {

        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        // const collegeContents    = collegeJSON,
        //       studentContents    = studentJSON,
        //       universityContents = universityJSON;

        const collegeContents    = await this.getData("College"),
              studentContents    = await this.getData("Student"),
              universityContents = await this.getData("University");

        let college    = new GenerateSideNavBarContents("College", 
                         collegeContents.result, 0),
            student    = new GenerateSideNavBarContents("Student", 
                         studentContents.result, college.getCounter()),
            university = new GenerateSideNavBarContents("University", 
                         universityContents.result, student.getCounter());
    }

    async getData(classification) {
        const phpURL    = '/php/PageGetter.php',
              dataQuery = {
                query : classification
              } 
        
        return await this.dataSerializer.postData(dataQuery, phpURL);
    }

    hamburgerToggler() {
        const width = document.getElementById("sidenavbar").style.width;
        if (width === "0px" || width == "") {
            document.getElementById("sidenavbar").style.width = "24rem";
            $('.animated-icon').toggleClass('open');
        }
        else {
            document.getElementById("sidenavbar").style.width = "0px";
            $('.animated-icon').toggleClass('open');
        }   
    }
}