import { CreateElement } from "./CreateElement.js";
import { Geocode } from "./Geocode.js";
import { ModalOptions } from "./ModalOptions.js";

export class BaseModalDisplay {

    constructor(mode, mediaDriver, ytDataDriver, entryModifier,
        mapAPI, postID) {
        // PASSED
        this.mode          = mode;
        this.mediaDriver   = mediaDriver;
        this.ytDataDriver  = ytDataDriver;
        this.entryModifier = entryModifier;
        this.postID        = postID;
        this.mapAPI        = mapAPI;

        // GLOBAL
        this.modalOptions  = new ModalOptions(
            this.getMode(),
            this.mediaDriver, 
            this.ytDataDriver,
            this.entryModifier,
            this.getPostID()
        );
        
    }

    getPostID() {
        return this.postID;
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

    getGlobalID() {
        const idStringify = String(this.getPostID());
        
        switch(this.getMode()) {
            case 'post':
                return {
                    'mediaModalID'     : 'media-modal',
                    'ytModalID'        : 'yt-modal',
                    'mapModalID'       : 'map-modal',
                    'mapSearchID'      : 'display-map-search',
                    'ytModalBodyID'    : 'yt-modal-body',
                    'mediaModalBodyID' : 'media-modal-body'
                };
            case 'thread':
                return {
                    'mediaModalID'     : 'thread-'.concat(idStringify)
                                          .concat('-media-modal'),
                    'ytModalID'        : 'thread-'.concat(idStringify)
                                          .concat('-yt-modal'),
                    'mapModalID'       : 'thread-'.concat(idStringify)
                                          .concat('-map-modal'),
                    'mapSearchID'      : 'thread-'.concat(idStringify)
                                          .concat('-map-search'),
                    'ytModalBodyID'    : 'thread-'.concat(idStringify)
                                          .concat('yt-modal-body'),
                    'mediaModalBodyID' : 'thread-'.concat(idStringify)
                                          .concat('media-modal-body')
                };
            default:
                break;
        }
    }

    displayMapModal(divHolder) {
        const mapModalID = this.getGlobalID()['mapModalID'];

        let searchMapModal  = new CreateElement("div", mapModalID, "modal fade")
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
            mapSearch       = new CreateElement("div", null, null)
                              .createElement(),
            inputMap        = new CreateElement("div", null, "input-map")
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
        // searchMapModal.setAttribute("aria-labelledby", "map-modal-label");
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

        const geocoder = new Geocode(
            this.getMode(), 
            this.getPostID()
        );

        searchButton.onclick = () => {

            // CHECK IF DIV EXISTS
            const elementID  = this.getGlobalID()['mapSearchID'],
                  divElement = document.querySelector('#'.concat(elementID));
            if(!divElement) {
                let displayMap = new CreateElement("div", elementID,
                                 'display-map-search')
                                 .createElement();
                modalBody.appendChild(displayMap);
            }
            
            // GET COORDINATES THROUGH GEOCODER 
            let location = searchText.value;
            geocoder.displayMap(location, this.mapAPI, elementID);
        }

    }

    displayYoutubeModal(divHolder) {
        const ytModalID     = this.getGlobalID()['ytModalID'],
              ytModalBodyID = this.getGlobalID()['ytModalBodyID'];

        let ytModal        = new CreateElement("div", ytModalID, "modal fade")
                             .createElement(),
            modalDialog    = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                             .createElement(),
            modalContent   = new CreateElement("div", null, "modal-content")
                             .createElement(),
            modalHeader    = new CreateElement("div", null, "modal-header")
                             .createElement(),
            modalTitle     = new CreateElement("h3", null, "modal-title")
                             .createElement(),
            closeButton    = new CreateElement("button", null, "btn-close")
                             .createElement(),
            modalBody      = new CreateElement("div", ytModalBodyID, "modal-body")
                             .createElement(),
            linkDiv        = new CreateElement("div", null, null)
                             .createElement(),
            addLinks       = new CreateElement("div", null, "add-links")
                             .createElement(),
            addLinksTField = new CreateElement("input", null, "text-fields")
                             .createElement(),
            addYTButton    = new CreateElement("button", null, null)
                             .createElement(),
            plusSign       = new CreateElement("i", null, "fa-sharp fa-solid fa-plus")
                             .createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                             .createElement(),
            saveButton      = new CreateElement("button", null, "save-button")
                             .createElement();

            // SET ATTRIBUTE
            ytModal.setAttribute("tabindex", "-1");
            // ytModal.setAttribute("aria-labelledby", "yt-modal-label");
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
                this.modalOptions.saveThumbnails();
            }
    }

    displayMediaModal(divHolder) {
        const mediaModalID     = this.getGlobalID()['mediaModalID'],
              mediaModalBodyID = this.getGlobalID()['mediaModalBodyID'];
        
        let mediaModal    = new CreateElement("div", mediaModalID, "modal fade")
                            .createElement(),
            modalDialog   = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                            .createElement(),
            modalContent  = new CreateElement("div", null, "modal-content")
                            .createElement(),
            modalHeader   = new CreateElement("div", null, "modal-header")
                            .createElement(),
            modalTitle    = new CreateElement("h3", null, "modal-title")
                            .createElement(),
            closeButton   = new CreateElement("button", null, "btn-close")
                            .createElement(),
            modalBody     = new CreateElement("div", mediaModalBodyID, "modal-body")
                            .createElement(),
            fileDiv       = new CreateElement("div", null, "file-div")
                            .createElement(),
            addFile       = new CreateElement("div", null, "add-file")
                            .createElement(),
            addFileTField = new CreateElement("input", null, "form-control file-text-field")
                            .createElement(),
            addFileButton = new CreateElement("button", null, "add-file-button")
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
                this.modalOptions.saveThumbnails();
            }

    }

}