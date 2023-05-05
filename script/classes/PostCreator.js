// Author: fiVe
// Description: Create Posts [Admin Priveleges]

import { CreateElement } from "./CreateElement.js";
import { GeneratePostMap } from "./GeneratePostMap.js";
import { Geocode } from "./Geocode.js";
import { TagButtonDataDriver } from "./TagButtonDataDriver.js";

export class PostCreator {

    constructor() {

        // GLOBAL VARIBLE
        this.buttonCounter = 0;
        this.buttonArray   = [];
        
        const POST_HOLDER = document.getElementById("posts");

        this.displayPostButton();
        this.displayPostModal(POST_HOLDER);
        this.displayMapModal(POST_HOLDER);

    }

    displayPostButton() {
        const POST_HOLDER = document.getElementById("posts");
        
        let postButton = new CreateElement("button", "post-button", null).createElement();

        // SET ATTRIBUTE
        postButton.setAttribute("type", "button");
        postButton.setAttribute("data-bs-toggle", "modal");
        postButton.setAttribute("data-bs-target", "#post-modal");
        postButton.textContent = "Create Post";

        // APPEND CHILD
        POST_HOLDER.appendChild(postButton);

    }

    displayPostModal(POST_HOLDER) {

        let postModal       = new CreateElement("div", "post-modal", "modal fade")
                              .createElement(),
            modalDialog     = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                              .createElement(),
            modalContent    = new CreateElement("div", "modal-content-create-post", "modal-content")
                              .createElement(),
            modalHeader     = new CreateElement("div", null, "modal-header")
                              .createElement(),
            modalTitle      = new CreateElement("h3", "post-modal-label", "modal-title")
                              .createElement(),
            closeButton     = new CreateElement("button", null, "btn-close")
                              .createElement(),
            modalBody       = new CreateElement("div", "post-modal-body", "modal-body")
                              .createElement(),
            postTextArea    = new CreateElement("textarea", "post-text-area", null)
                              .createElement(),
            tagsDiv         = new CreateElement("div", "tags-div", null)
                              .createElement(),
            tagsText        = new CreateElement("div", "tag-text", null)
                              .createElement(),
            tagTextHeader   = new CreateElement("h4", null, null).createElement(),
            addTag          = new CreateElement("div", "add-tag", null)
                              .createElement(),
            addTagTextField = new CreateElement("input", "tag-text-field", "post-text-fields")
                              .createElement(),
            addTagButton    = new CreateElement("button", "add-tag-button", null)
                              .createElement(),
            plusSign        = new CreateElement("i", null, "fa-sharp fa-solid fa-plus")
                              .createElement(),
            tagButtons      = new CreateElement("div", "tag-button", null)
                              .createElement(),
            mediaControl    = new CreateElement("div", "media-control", null)
                              .createElement(),
            mediaControlTxt = new CreateElement("div", "media-control-text", 
                              null).createElement(),
            mediaControlBtn = new CreateElement("div", "media-control-buttons",
                              null).createElement(),
            imageButton     = new CreateElement("button", null, "media-button")
                              .createElement(),
            imageIcon       = new CreateElement("i", null, "fa-solid fa-image")
                              .createElement(),
            videoButton     = new CreateElement("button", null, "media-button")
                              .createElement(),
            videoIcon       = new CreateElement("i", null, "fa-solid fa-video")
                              .createElement(), 
            ytButton        = new CreateElement("button", null, "media-button")
                              .createElement(),
            ytIcon          = new CreateElement("i", null, "fa-brands fa-youtube")
                              .createElement(),
            mapButton       = new CreateElement("button", null, "media-button")
                              .createElement(),
            mapIcon         = new CreateElement("i", null, "fa-sharp fa-solid fa-location-dot")
                              .createElement(),
            mapCoordsHolder = new CreateElement("div", null, "map-coordinates-holder-hidden")
                              .createElement(),
            latFieldHidden  = new CreateElement("input", "latitude-text-field-hidden", 
                              "post-text-fields").createElement(),
            lngFieldHidden  = new CreateElement("input", "longtitude-text-field-hidden",
                              "post-text-fields").createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                              .createElement(),
            postButton      = new CreateElement("div", null, "btn btn-primary")
                              .createElement();
        // SET ATTRIBUTES
        postModal.setAttribute("tabindex", "-1");
        postModal.setAttribute("aria-labelledby", "post-modal-label");
        postModal.setAttribute("aria-hidden", "true");
        modalDialog.setAttribute("role", "document");
        modalTitle.textContent = "Create Post";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        tagTextHeader.textContent = "Tags";
        addTagTextField.setAttribute("type", "text");
        addTagButton.setAttribute("type", "submit");
        mediaControlTxt.textContent = "Add To Post";
        postButton.textContent = "Post";
        imageButton.setAttribute("type", "button");
        videoButton.setAttribute("type", "button");
        ytButton.setAttribute("type", "button");
        mapButton.setAttribute("type", "button");
        mapButton.setAttribute("data-bs-target", "#map-modal");
        mapButton.setAttribute("data-bs-toggle", "modal");
        mapButton.setAttribute("data-bs-dismmis", "modal");
        latFieldHidden.setAttribute("type", "text");
        latFieldHidden.disabled = true;
        lngFieldHidden.setAttribute("type", "text");
        lngFieldHidden.disabled = true;

        // APPEND CHILD
        POST_HOLDER.appendChild(postModal);
        postModal.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        modalContent.appendChild(modalHeader);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(postTextArea);
        modalBody.appendChild(tagsDiv);
        tagsDiv.appendChild(tagsText);
        tagsText.appendChild(tagTextHeader);
        tagsDiv.appendChild(addTag);
        addTag.appendChild(addTagTextField);
        addTag.appendChild(addTagButton);
        addTagButton.appendChild(plusSign);
        tagsDiv.appendChild(tagButtons);
        modalBody.appendChild(mediaControl);
        mediaControl.appendChild(mediaControlTxt);
        mediaControl.appendChild(mediaControlBtn);
        mediaControlBtn.appendChild(imageButton);
        imageButton.appendChild(imageIcon);
        mediaControlBtn.appendChild(videoButton);
        videoButton.appendChild(videoIcon);
        mediaControlBtn.appendChild(ytButton);
        ytButton.appendChild(ytIcon);
        mediaControlBtn.appendChild(mapButton);
        modalBody.appendChild(mapCoordsHolder);
        mapCoordsHolder.appendChild(latFieldHidden);
        mapCoordsHolder.appendChild(lngFieldHidden);
        mapButton.appendChild(mapIcon);
        modalContent.appendChild(modalFooter);
        modalFooter.appendChild(postButton);

        // ADD TAGS EVERYTIME BUTTON IS CLICKED
        this.modifyTagEntry(tagsDiv, addTagTextField, addTagButton);

    }

    displayMapModal(POST_HOLDER) {
        let searchMapModal  = new CreateElement("div", "map-modal", "modal fade")
                              .createElement(),
            modalDialog     = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                              .createElement(),
            modalContent    = new CreateElement("div", null, "modal-content")
                              .createElement(),
            modalHeader     = new CreateElement("div", null, "modal-header")
                              .createElement(),
            modalTitle      = new CreateElement("h3", null, "modal-title")
                              .createElement(),
            closeButton     = new CreateElement("button", null, "btn-close")
                              .createElement(),
            modalBody       = new CreateElement("div", null, "modal-body")
                              .createElement(),
            mapSearch       = new CreateElement("div", "map-search", null)
                              .createElement(),
            inputMap        = new CreateElement("div", "input-map", null)
                              .createElement(),
            searchText      = new CreateElement("input", null, "post-text-fields")
                              .createElement(),
            searchButton    = new CreateElement("button", null, null)
                              .createElement(),
            searchIcon      = new CreateElement("i", null, "fa-sharp fa-solid fa-magnifying-glass")
                              .createElement();

            // SET ATTRIBUTE
            searchMapModal.setAttribute("tabindex", "-1");
            searchMapModal.setAttribute("aria-labelledby", "post-modal-label");
            searchMapModal.setAttribute("aria-hidden", "true");
            modalDialog.setAttribute("role", "document");
            modalTitle.textContent = "Search Map";
            closeButton.setAttribute("data-bs-dismiss", "modal");
            closeButton.setAttribute("aria-label", "Close");
            searchButton.setAttribute("type", "submit");

            // APPEND CHILD
            POST_HOLDER.appendChild(searchMapModal);
            searchMapModal.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
            modalContent.appendChild(modalHeader);
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(closeButton);
            modalContent.appendChild(modalBody);
            modalBody.appendChild(mapSearch);
            mapSearch.appendChild(inputMap);
            inputMap.appendChild(searchText);
            inputMap.appendChild(searchButton);
            searchButton.appendChild(searchIcon);
            // modalBody.appendChild(displayMap);

            // ACTION WHEN SEARCH BUTTON IS CLICKED
            this.geocodeMap(searchButton, searchText, modalBody);

    }

    modifyTagEntry(tagsDiv, textField, button) {

        let dataDriver = new TagButtonDataDriver();

        button.onclick = function() {

            const entry = textField.value;

            // ADD COUNTER FOR ID REFERENCE
            dataDriver.incrementCounter();

            let tagButtonID  = "tag-" + dataDriver.getCounter(),
                removeBtnID  = "remove-tag-" + dataDriver.getCounter(),
                tagButtons   = new CreateElement("div", tagButtonID, "tag-buttons")
                               .createElement(),
                tagButton    = new CreateElement("div", null, "tag-button")
                               .createElement(),
                removeButton = new CreateElement("button", removeBtnID, "remove-tag")
                               .createElement(),
                removeIcon   = new CreateElement("i", null, "fa-sharp fa-solid fa-xmark")
                               .createElement();
            
            // SET ATTRIBUTE
            tagButton.textContent = entry;
            removeButton.setAttribute("type", "button");

            // APPEND CHILD
            tagsDiv.appendChild(tagButtons);
            tagButtons.appendChild(tagButton);
            tagButton.appendChild(removeButton);
            removeButton.appendChild(removeIcon);   

            // ADD ITEM TO ARRAY
            dataDriver.appendToTagsArray(entry);

            // REMOVING ENTRY
            removeButton.onclick = function() {
                document.getElementById(tagButtonID).remove();
                dataDriver.decrementCounter();
                dataDriver.removeFromTagsArray(tagButtonID);
                console.log(dataDriver.getTagsArray());
            }

            console.log(dataDriver.getTagsArray());

        }
    } 

    geocodeMap(searchButton, searchText, modalBody) {

        let geocoder = new Geocode(),
            mapAPI   = new GeneratePostMap();

        searchButton.onclick = function() {

            // CHECK IF DIV EXISTS
            const elementID  = "display-map-search",
                  divElement = document.querySelector('#'.concat(elementID));
            if(!divElement) {
                let displayMap = new CreateElement("div", elementID, null)
                                .createElement();
                modalBody.appendChild(displayMap);
            }
            
            // GET COORDINATES THROUGH GEOCODER 
            let location = searchText.value;
            geocoder.displayMap(location, mapAPI, elementID);
        }

    }

}