// Author: fiVe
// Description: Fetches Searched Profiles

import { CreateElement } from "./CreateElement.js";
import { LimitWords } from "./LimitWords.js";

export class GenerateProfileSearch {

    constructor() {
        this.noLoopPart();
    }

    noLoopPart() {
        const PROFILE = document.getElementById("profile");

        let profileDiv           = new CreateElement("div", null, "container d-flex").createElement(),
            profilePagesHolder   = new CreateElement("div", "profile-pages-holder", null).createElement(),
            profileText          = new CreateElement("div", null, "profile-text").createElement(),
            profileTextPara      = new CreateElement("p", null, null).createElement();
        
        // SET ATTRIBUTE
        profileTextPara.textContent = "Profile";

        // LINK ELEMENTS
        PROFILE.appendChild(profileDiv);
        profileDiv.appendChild(profilePagesHolder);
        profilePagesHolder.appendChild(profileText);
        profileText.appendChild(profileTextPara);
        
    }

    generateProfile(PROFILE_IMAGE, PROFILE_NAME, PROFILE_CATEGORY, PROFILE_DESCRIPTION) {
        const PROFILE_PAGES_HOLDER = document.getElementById("profile-pages-holder");

        let profileResultsHolder = new CreateElement("div", "profile-results-holder", null).createElement(),
            profileImage         = new CreateElement("img", null, null).createElement(),
            profileResultText    = new CreateElement("div", null, "profile-result-text").createElement(),
            profileLink          = new CreateElement("a", null, null).createElement(),
            profileTitle         = new CreateElement("p", null, "profile-title").createElement(),
            profileCategory      = new CreateElement("p", null, "profile-category").createElement(),
            profileDescription   = new CreateElement("p", null, "profile-description").createElement(),

            newProfileDescription = new LimitWords(PROFILE_DESCRIPTION, 75);

        // SET ATTRIBUTE
        profileImage.src               = PROFILE_IMAGE;
        profileImage.alt               = PROFILE_NAME + " image";
        profileLink.href               = "#";
        profileTitle.textContent       = PROFILE_NAME;
        profileCategory.textContent    = PROFILE_CATEGORY;
        profileDescription.textContent = newProfileDescription.getLimitWords();

        // LINK ELEMENTS
        PROFILE_PAGES_HOLDER.appendChild(profileResultsHolder);
        profileResultsHolder.appendChild(profileImage);
        profileResultsHolder.appendChild(profileResultText);
        profileResultText.appendChild(profileLink);
        profileLink.appendChild(profileTitle);
        profileResultText.appendChild(profileCategory);
        profileResultText.appendChild(profileDescription);
    }
}