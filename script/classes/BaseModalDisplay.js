import { CreateElement } from "./CreateElement.js";
import { Geocode } from "./Geocode.js";
import { GeneratePostMap } from "./GeneratePostMap.js";
import { ModifyEntries } from "./ModifyEntries.js";
import { ModalOptions } from "./ModalOptions.js";

export class BaseModalDisplay {

    constructor(mode, mediaDriver, ytDataDriver) {
        // PASSED
        this.mode          = mode;
        this.mediaDriver   = mediaDriver;
        this.ytDataDriver  = ytDataDriver;
        // GLOBAL
        this.entryModifier = new ModifyEntries();
        this.modalOptions  = new ModalOptions(
            this.getMode(),
            this.mediaDriver, 
            this.ytDataDriver,
            this.entryModifier
        );
        
    }

    getMode() {
        return this.mode;
    }

    getDataArray() {
        return this.modalOptions.getDataArray();
    }

    getOpenedButton() {
        return this.modalOptions.getOpenedButton();
    }

    displayMapModal(divHolder) {
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
            searchText      = new CreateElement("input", null, "text-fields")
                              .createElement(),
            searchButton    = new CreateElement("button", null, null)
                              .createElement(),
            searchIcon      = new CreateElement("i", null, "fa-sharp fa-solid fa-magnifying-glass")
                              .createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                              .createElement(),
            saveButton      = new CreateElement("button", null, "save-button")
                              .createElement();

        // SET ATTRIBUTE
        searchMapModal.setAttribute("tabindex", "-1");
        searchMapModal.setAttribute("aria-labelledby", "map-modal-label");
        searchMapModal.setAttribute("aria-hidden", "true");
        modalDialog.setAttribute("role", "document");
        modalTitle.textContent = "Search Map";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        searchText.setAttribute("type", "text");
        searchButton.setAttribute("type", "submit");
        saveButton.textContent = "Save";
        saveButton.setAttribute("type", "submit");

        // APPEND CHILD
        divHolder.appendChild(searchMapModal);
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
        modalContent.appendChild(modalFooter);
        modalFooter.appendChild(saveButton);

        // ACTION WHEN SEARCH BUTTON IS CLICKED
        this.geocodeMap(searchButton, searchText, modalBody);

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

    displayYoutubeModal(divHolder) {
        let ytModal        = new CreateElement("div", "yt-modal", "modal fade")
                             .createElement(),
            modalDialog    = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                             .createElement(),
            modalContent   = new CreateElement("div", "modal-content-add-yt", "modal-content")
                             .createElement(),
            modalHeader    = new CreateElement("div", null, "modal-header")
                             .createElement(),
            modalTitle     = new CreateElement("h3", "yt-modal-label", "modal-title")
                             .createElement(),
            closeButton    = new CreateElement("button", null, "btn-close")
                             .createElement(),
            modalBody      = new CreateElement("div", "yt-modal-body", "modal-body")
                             .createElement(),
            linkDiv        = new CreateElement("div", "link-div", null)
                             .createElement(),
            addLinks       = new CreateElement("div", "add-links", null)
                             .createElement(),
            addLinksTField = new CreateElement("input", "link-text-field", "text-fields")
                             .createElement(),
            addYTButton    = new CreateElement("button", "add-link-button", null)
                             .createElement(),
            plusSign       = new CreateElement("i", null, "fa-sharp fa-solid fa-plus")
                             .createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                             .createElement(),
            saveButton      = new CreateElement("button", null, "save-button")
                             .createElement();

            // SET ATTRIBUTE
            ytModal.setAttribute("tabindex", "-1");
            ytModal.setAttribute("aria-labelledby", "yt-modal-label");
            ytModal.setAttribute("aria-hidden", "true");
            modalDialog.setAttribute("role", "document");
            modalTitle.textContent = "Add Youtube Links";
            closeButton.setAttribute("data-bs-dismiss", "modal");
            closeButton.setAttribute("aria-label", "Close");
            addLinksTField.setAttribute("type", "text");
            addYTButton.setAttribute("type", "submit"),
            saveButton.textContent = "Save";
            saveButton.setAttribute("type", "submit");

            // APPEND CHILD
            divHolder.appendChild(ytModal);
            ytModal.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
            modalContent.appendChild(modalHeader);
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(closeButton);
            modalContent.appendChild(modalBody);
            modalBody.appendChild(linkDiv);
            linkDiv.appendChild(addLinks)
            addLinks.appendChild(addLinksTField);
            addLinks.appendChild(addYTButton);
            addYTButton.appendChild(plusSign);
            modalContent.appendChild(modalFooter);
            modalFooter.appendChild(saveButton);

            // MODIFY Links
            // this.modifyEntries(linkDiv, addLinksTField, addYTButton, "link",
            // this.ytLinksDataDriver, 4);
            this.entryModifier.modifyEntries(
                linkDiv, addLinksTField, addYTButton, "link",
                this.ytDataDriver, 4
            );

            // ADMIN Clicked Save
            saveButton.onclick = () => {
                console.log(this.getOpenedButton());
                // this.saveThumbnails(this.getOpenedButton());
                this.modalOptions.saveThumbnails(
                    this.getOpenedButton()
                );
            }
    }

    displayMediaModal(divHolder) {
        let mediaModal    = new CreateElement("div", "media-modal", "modal fade")
                            .createElement(),
            modalDialog   = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                            .createElement(),
            modalContent  = new CreateElement("div", "modal-content-add-media", "modal-content")
                            .createElement(),
            modalHeader   = new CreateElement("div", null, "modal-header")
                            .createElement(),
            modalTitle    = new CreateElement("h3", "media-modal-label", "modal-title")
                            .createElement(),
            closeButton   = new CreateElement("button", null, "btn-close")
                            .createElement(),
            modalBody     = new CreateElement("div", "media-modal-body", "modal-body")
                            .createElement(),
            fileDiv       = new CreateElement("div", "file-div", null)
                            .createElement(),
            addFile       = new CreateElement("div", "add-file", null)
                            .createElement(),
            addFileTField = new CreateElement("input", "file-text-field", "form-control")
                            .createElement(),
            addFileButton = new CreateElement("button", "add-file-button",)
                            .createElement(),
            plusSign      = new CreateElement("i", null, "fa-sharp fa-solid fa-plus")
                            .createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                            .createElement(),
            saveButton      = new CreateElement("button", null, "save-button")
                            .createElement();

            // SET ATTRIBUTE
            mediaModal.setAttribute("tabindex", "-1");
            mediaModal.setAttribute("aria-labelledby", "media-modal-label");
            mediaModal.setAttribute("aria-hidden", "true");
            modalTitle.textContent = "Add Media";
            modalDialog.setAttribute("role", "document");
            closeButton.setAttribute("data-bs-dismiss", "modal");
            closeButton.setAttribute("aria-label", "Close");
            addFileTField.setAttribute("type", "file");
            addFileButton.setAttribute("type", "submit");
            saveButton.textContent = "Save";
            saveButton.setAttribute("type", "submit");

            // APPEND CHILD
            divHolder.appendChild(mediaModal);
            mediaModal.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
            modalContent.appendChild(modalHeader);
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(closeButton);
            modalContent.appendChild(modalBody);
            modalBody.appendChild(fileDiv);
            fileDiv.appendChild(addFile)
            addFile.appendChild(addFileTField);
            addFile.appendChild(addFileButton);
            addFileButton.appendChild(plusSign);
            modalContent.appendChild(modalFooter);
            modalFooter.appendChild(saveButton);

            // MODIFY Links
            // this.modifyEntries(fileDiv, addFileTField, addFileButton, "media",
            // this.mediaDriver, 4);
            this.entryModifier.modifyEntries(
                fileDiv, addFileTField, addFileButton, "media",
                this.mediaDriver, 4
            );

            // ADMIN Clicked Save
            saveButton.onclick = () => {
                console.log(this.getOpenedButton());
                this.modalOptions.saveThumbnails(
                    this.getOpenedButton()
                );
            }

    }

}