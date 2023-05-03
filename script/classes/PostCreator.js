// Author: fiVe
// Description: Create Posts [Admin Priveleges]

import { CreateElement } from "./CreateElement.js";
import { TagButtonDataDriver } from "./TagButtonDataDriver.js";

export class PostCreator {

    constructor() {

        // GLOBAL VARIBLE
        this.buttonCounter = 0;
        this.buttonArray   = [];
 
        this.displayPostButton();
        this.displayPostModal();

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

    displayPostModal() {
        const POST_HOLDER = document.getElementById("posts");

        let postModal       = new CreateElement("div", "post-modal", "modal fade")
                              .createElement(),
            modalDialog     = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                              .createElement(),
            modalContent    = new CreateElement("div", null, "modal-content")
                              .createElement(),
            modalHeader     = new CreateElement("div", null, "modal-header")
                              .createElement(),
            modalTitle      = new CreateElement("h3", "post-modal-label", "modal-title")
                              .createElement(),
            closeButton     = new CreateElement("button", null, "btn-close")
                              .createElement(),
            modalBody       = new CreateElement("div", null, "modal-body")
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
        postButton.textContent = "Post";

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
        modalContent.appendChild(mediaControl);
        modalContent.appendChild(modalFooter);
        modalFooter.appendChild(postButton);

        // ADD TAGS EVERYTIME BUTTON IS CLICKED
        this.modifyTagEntry(tagsDiv, addTagTextField, addTagButton);


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
                let index = tagButtonID.split("-")[1];
                dataDriver.decrementCounter();
                dataDriver.removeFromTagsArray(tagButtonID);
                console.log(dataDriver.getTagsArray());
            }

            console.log(dataDriver.getTagsArray());

        }
    } 

}