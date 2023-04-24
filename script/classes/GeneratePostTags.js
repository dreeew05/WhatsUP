// Author: fiVe
// Description: Generates Tags of Post

import { CreateElement } from "./CreateElement.js";

export class GeneratePostTags {

    constructor(POST_HOLDER, TAGS) {
        this.POST_HOLDER = POST_HOLDER;
        this.TAGS        = TAGS;

        this.createTags();
    }

    getPostHolder() {
        return this.POST_HOLDER;
    }
    getTags() {
        return this.TAGS;
    }

    createTags() {
        let tagsDiv       = new CreateElement("div", null, "tag-div")
                            .createElement(),
            tagTextHolder = new CreateElement("div", null, "tag-text-holder")
                            .createElement(),
            tagText       = new CreateElement("p", null, "tag-text")
                            .createElement(),
            tagButtonsDiv = new CreateElement("div", null, "tag-buttons-holder")
                            .createElement();

        // SET ATTRIBUTE
        tagText.textContent = "Tags";
        
        this.getPostHolder().appendChild(tagsDiv);
        tagsDiv.appendChild(tagTextHolder);
        tagTextHolder.appendChild(tagText);
        tagsDiv.appendChild(tagButtonsDiv);
        
        for(let i = 0; i < this.getTags().length; i++) {
            let tagButton = new CreateElement("button", null, "tag-button")
                            .createElement();

            let value = this.getTags()[i];

            // SET ATTRIBUTES
            tagButton.setAttribute("type", "button");
            tagButton.setAttribute("value", value);
            tagButton.textContent = value;
            tagButtonsDiv.appendChild(tagButton);

            // WHEN BUTTON IS CLICKED
            tagButton.addEventListener("click", 
                function() {
                    const SEARCH_PATH    = "searchPage.html";
                    let query            = "?search=" + value;
                    window.location.href = SEARCH_PATH + query;
                }
            );

        }
    }

}