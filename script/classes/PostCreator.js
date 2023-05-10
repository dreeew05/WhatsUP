// Author: fiVe
// Description: Create Posts [Admin Priveleges]

import { CreateElement } from "./CreateElement.js";
import { DataSerializer } from "./DataSerializer.js";
import { GeneratePostMap } from "./GeneratePostMap.js";
import { Geocode } from "./Geocode.js";
import { PostThumbnailFactory } from "./PostThumbnailFactory.js";
import { SweetAlertFactory } from "./SweetAlertFactory.js";
import { TagLinkDataDriver } from "./TagLinkDataDriver.js";

export class PostCreator {

    constructor() {

        // GLOBAL VARIBLE
        this.tagsDataDriver    = new TagLinkDataDriver();
        this.ytLinksDataDriver = new TagLinkDataDriver();
        this.mediaDriver       = new TagLinkDataDriver();
        this.sweetAlert        = new SweetAlertFactory();
        this.dataSerializer    = new DataSerializer();
        this.thumbnailFactory  = new PostThumbnailFactory();
        this.postHolder        = document.getElementById("posts");
        this.dataArray         = null;
        this.openedButton      = null;

        this.displayPostButton();
        this.displayPostModal();
        this.displayMapModal();
        this.displayYoutubeModal();
        this.displayMediaModal();
        this.clickMediaButtons();

    }

    getPostHolder() {
        return this.postHolder;
    }

    getDataArray() {
        return this.dataArray;
    }

    getOpenedButton() {
        return this.openedButton;
    }

    setOpenedButton(openedButton) {
        this.openedButton = openedButton;
    }

    setDataArray(dataArray) {
        this.dataArray = dataArray;
    }

    displayPostButton() {        
        let postButton = new CreateElement("button", "create-post-button", null).createElement();

        // SET ATTRIBUTE
        postButton.setAttribute("type", "button");
        postButton.setAttribute("data-bs-toggle", "modal");
        postButton.setAttribute("data-bs-target", "#post-modal");
        postButton.textContent = "Create Post";

        // APPEND CHILD
        this.getPostHolder().appendChild(postButton);

    }

    displayPostModal() {

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
            addTag          = new CreateElement("div", "add-tag", null)
                              .createElement(),
            addTagTextField = new CreateElement("input", "tag-text-field", "post-text-fields")
                              .createElement(),
            addTagButton    = new CreateElement("button", "add-tag-button", null)
                              .createElement(),
            plusSign        = new CreateElement("i", null, "fa-sharp fa-solid fa-plus")
                              .createElement(),
            mediaControl    = new CreateElement("div", "media-control", null)
                              .createElement(),
            mediaControlTxt = new CreateElement("div", "media-control-text", 
                              null).createElement(),
            mediaControlBtn = new CreateElement("div", "media-control-buttons",
                              null).createElement(),
            imageButton     = new CreateElement("button", "image-button", "media-button")
                              .createElement(),
            imageIcon       = new CreateElement("i", null, "fa-solid fa-image")
                              .createElement(),
            videoButton     = new CreateElement("button", "video-button", "media-button")
                              .createElement(),
            videoIcon       = new CreateElement("i", null, "fa-solid fa-video")
                              .createElement(), 
            ytButton        = new CreateElement("button", "yt-button", "media-button")
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
            postButton      = new CreateElement("button", null, "save-button")
                              .createElement();
                
        // SET ATTRIBUTES
        postModal.setAttribute("tabindex", "-1");
        postModal.setAttribute("aria-labelledby", "post-modal-label");
        postModal.setAttribute("aria-hidden", "true");
        modalDialog.setAttribute("role", "document");
        modalTitle.textContent = "Create Post";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        tagsText.textContent = "Tags";
        addTagTextField.setAttribute("type", "text");
        addTagButton.setAttribute("type", "submit");
        mediaControlTxt.textContent = "Add To Post";
        postButton.textContent = "Post";
        postButton.setAttribute("type", "submit");
        imageButton.setAttribute("type", "button");
        imageButton.setAttribute("data-bs-target", "#media-modal");
        imageButton.setAttribute("data-bs-toggle", "modal");
        imageButton.setAttribute("data-bs-dismiss", "modal");
        videoButton.setAttribute("type", "button");
        videoButton.setAttribute("data-bs-target", "#media-modal");
        videoButton.setAttribute("data-bs-toggle", "modal");
        videoButton.setAttribute("data-bs-dismiss", "modal");
        ytButton.setAttribute("type", "button");
        ytButton.setAttribute("data-bs-target", "#yt-modal");
        ytButton.setAttribute("data-bs-toggle", "modal");
        ytButton.setAttribute("data-bs-dismiss", "modal");
        mapButton.setAttribute("type", "button");
        mapButton.setAttribute("data-bs-target", "#map-modal");
        mapButton.setAttribute("data-bs-toggle", "modal");
        mapButton.setAttribute("data-bs-dismiss", "modal");
        latFieldHidden.setAttribute("type", "text");
        latFieldHidden.disabled = true;
        // latFieldHidden.style.visibility = "hidden";
        lngFieldHidden.setAttribute("type", "text");
        lngFieldHidden.disabled = true;
        // lngFieldHidden.style.visibility = "hidden";

        // APPEND CHILD
        this.getPostHolder().appendChild(postModal);
        postModal.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        modalContent.appendChild(modalHeader);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(postTextArea);
        modalBody.appendChild(tagsDiv);
        tagsDiv.appendChild(tagsText);
        tagsDiv.appendChild(addTag);
        addTag.appendChild(addTagTextField);
        addTag.appendChild(addTagButton);
        addTagButton.appendChild(plusSign);
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

        // MODIFY TAGS 
        this.modifyEntries(tagsDiv, addTagTextField, addTagButton, "tag",
            this.tagsDataDriver, null); 

        // ACTION WHEN POST BUTTON IS CLICKED
        postButton.onclick = () => {
            // console.log(latFieldHidden.value);
            // console.log(lngFieldHidden.value);
            if(this.getDataArray() != null) {
                console.log(this.getDataArray().tagsArray);
            }
        }

    }

    displayMapModal() {
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
            this.getPostHolder().appendChild(searchMapModal);
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

    displayYoutubeModal() {
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
            addLinksTField = new CreateElement("input", "link-text-field", "post-text-fields")
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
            this.getPostHolder().appendChild(ytModal);
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
            this.modifyEntries(linkDiv, addLinksTField, addYTButton, "link",
            this.ytLinksDataDriver, 4);

            // ADMIN Clicked Save
            saveButton.onclick = () => {
                console.log(this.getOpenedButton());
                this.saveThumbnails(this.getOpenedButton());
            }
    }

    displayMediaModal() {
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
            addFileTField = new CreateElement("input", "file-text-field", "post-text-fields")
                            .createElement(),
            addFileButton = new CreateElement("button", "add-file-button", null)
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
            this.getPostHolder().appendChild(mediaModal);
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
            this.modifyEntries(fileDiv, addFileTField, addFileButton, "media",
            this.mediaDriver, 4);

            // ADMIN Clicked Save
            saveButton.onclick = () => {
                console.log(this.getOpenedButton());
                this.saveThumbnails(this.getOpenedButton());
            }

    }

    clickMediaButtons() {

        const imageButton = document.getElementById("image-button"),
              videoButton = document.getElementById("video-button"),
              ytButton    = document.getElementById("yt-button");

        imageButton.onclick = () => {
            this.setOpenedButton("image");
        }
        videoButton.onclick = () => {
            this.setOpenedButton("video");
        }
        ytButton.onclick = () => {
            this.setOpenedButton("youtube");
        }
    }

    saveThumbnails(type) {

        const imageButton = document.getElementById("image-button"),
              videoButton = document.getElementById("video-button"),
              ytButton    = document.getElementById("yt-button");

        switch(type) {
            case "image":
                // videoButton.setAttribute("disabled", true);
                // ytButton.setAttribute("disabled", true);
                if(this.mediaDriver.getCounter() != 0) {
                    if(!imageButton.classList.contains('active')) {
                        imageButton.className += " active";
                    }
                    videoButton.disabled = true;
                    ytButton.disabled    = true;
                    videoButton.removeAttribute("data-bs-toggle");
                    videoButton.removeAttribute("data-bs-dismiss");
                    ytButton.removeAttribute("data-bs-toggle");
                    ytButton.removeAttribute("data-bs-dismiss");
                    this.setDataArray(this.mediaDriver);
                    this.showThumbnailToPostModal(
                        this.mediaDriver.getTagsArray()
                    );
                }
                break;
            case "video":
                // imageButton.setAttribute("disabled", true);
                // ytButton.setAttribute("disabled", true);
                if(this.mediaDriver.getCounter() != 0) {
                    if(!videoButton.classList.contains('active')) {
                        videoButton.className += " active";
                    }
                    imageButton.disabled = true;
                    ytButton.disabled    = true;
                    imageButton.removeAttribute("data-bs-toggle");
                    imageButton.removeAttribute("data-bs-dismiss");
                    ytButton.removeAttribute("data-bs-toggle");
                    ytButton.removeAttribute("data-bs-dismiss");
                    this.setDataArray(this.mediaDriver);
                    this.showThumbnailToPostModal(
                        this.mediaDriver.getTagsArray()
                    );
                }
                break;
            case "youtube":
                // imageButton.setAttribute("disabled", true);
                // videoButton.setAttribute("disabled", true);
                console.log(this.ytLinksDataDriver.getCounter());
                if(this.ytLinksDataDriver.getCounter() != 0) {
                    if(!ytButton.classList.contains('active')) {
                        ytButton.className += " active";
                    }
                    imageButton.disabled = true;
                    videoButton.disabled = true;
                    imageButton.removeAttribute("data-bs-toggle");
                    imageButton.removeAttribute("data-bs-dismiss");
                    videoButton.removeAttribute("data-bs-toggle");
                    videoButton.removeAttribute("data-bs-dismiss");
                    this.setDataArray(this.ytLinksDataDriver);
                    let ytThumbnailsArray = this.ytLinkToThumbnail(
                        this.ytLinksDataDriver.getTagsArray()
                    );
                    this.showThumbnailToPostModal(ytThumbnailsArray);
                }
                break;
            default:
                break;
        }
    }

    freeButtons() {
        const imageButton = document.getElementById("image-button"),
              videoButton = document.getElementById("video-button"),
              ytButton    = document.getElementById("yt-button");
        
        // ENABLE BUTTONS
        imageButton.removeAttribute("disabled");
        videoButton.removeAttribute("disabled");
        ytButton.removeAttribute("disabled");

        // ACCESS MODAL
        imageButton.setAttribute("data-bs-toggle", "modal");
        imageButton.setAttribute("data-bs-dismiss", "modal");
        videoButton.setAttribute("data-bs-toggle", "modal");
        videoButton.setAttribute("data-bs-dismiss", "modal");
        ytButton.setAttribute("data-bs-toggle", "modal");
        ytButton.setAttribute("data-bs-dismiss", "modal");

        // REMOVE ACTIVE STATUS
        const buttons = document.getElementsByClassName("media-button");
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        // REMOVE EXISTING TAG BUTTONS
        const tagButtons = document.querySelectorAll('.media-tag-buttons');
        tagButtons.forEach(element => element.remove());

        // REMOVE THUMBNAILS
        const thumbnailDivHolders = document.querySelectorAll('.thumbnail-div-holder');
        thumbnailDivHolders.forEach(element => element.remove());

        this.mediaDriver.emptyCounter();
        this.mediaDriver.emptyTagsArray();
        this.ytLinksDataDriver.emptyCounter();
        this.ytLinksDataDriver.emptyTagsArray();

        // CLEAR DATA ARRAY
        this.setDataArray(null);
    }

    generateButtons(tagsDiv, dataDriver, type, entry) {
        // ADD COUNTER FOR ID REFERENCE
        dataDriver.incrementCounter();

        let classTag = null;

        if(type == "link" || type == "media") {
            classTag = "media-tag-buttons";
        }
        else {
            classTag = "tag-buttons";
        }

        let tagButtonID  = type + "-" + dataDriver.getCounter(),
            removeBtnID  = "remove-" + type + "-" + dataDriver.getCounter(),
            tagButtons   = new CreateElement("div", tagButtonID, classTag)
                        .createElement(),
            tagButton    = new CreateElement("div", null, "tag-button")
                        .createElement(),
            removeButton = new CreateElement("button", removeBtnID, "remove-tag")
                        .createElement(),
            removeIcon   = new CreateElement("i", null, "fa-sharp fa-solid fa-xmark")
                        .createElement();
        
        // SET ATTRIBUTE
        // tagButton.textContent = entry.value;
        switch(type) {
            case "media":
                let fileSplit = entry.value.split("\\"),
                    fileName  = fileSplit[fileSplit.length - 1];
                tagButton.textContent = fileName;
                break;
            default:
                tagButton.textContent = entry.value;
                break;
        }
        removeButton.setAttribute("type", "button");

        // APPEND CHILD
        tagsDiv.appendChild(tagButtons);
        tagButtons.appendChild(tagButton);
        tagButton.appendChild(removeButton);
        removeButton.appendChild(removeIcon);   

        // ADD ITEM TO ARRAY
        switch(type) {
            case "media":
                entry = URL.createObjectURL(entry.files[0]);
                break;
            default:
                entry = entry.value;
                break;
        }
        dataDriver.appendToTagsArray(entry);

        // REMOVING ENTRY
        removeButton.onclick = () => {
            document.getElementById(tagButtonID).remove();
            dataDriver.decrementCounter();
            dataDriver.removeFromTagsArray(entry);

            this.addRemoveThumbnail(type, dataDriver);
            console.log(dataDriver.getTagsArray());
        }
    }

    addRemoveThumbnail(type, dataDriver) {

        let elementID  = null,
            parentDiv  = null,
            divElement = null;

        switch(type) {
            case "link":
                elementID  = "yt-thumbnails";
                parentDiv  = document.getElementById("yt-modal-body");
                divElement = document.querySelector('#'.concat(elementID));
                
                if(divElement) {
                    divElement.remove();
                }
                this.createThumbnailViewer(elementID, parentDiv, 
                    this.ytLinkToThumbnail(dataDriver.getTagsArray()));

                break;
            case "media":
                elementID  = "media-thumbnails",
                parentDiv  = document.getElementById("media-modal-body");
                divElement = document.querySelector('#'.concat(elementID));
                
                if(divElement) {
                    divElement.remove();
                }
                this.createThumbnailViewer(elementID, parentDiv,
                    dataDriver.getTagsArray());
                break;
            default:
                break;
        }
    }

    modifyEntries(tagsDiv, textField, button, type, dataDriver, limit) {

        let alertBox = this.sweetAlert,
            ds       = this.dataSerializer;

        button.onclick = async () => {

            if(textField.value == "") {
                // USER ENTERS EMPTY STRING
                alertBox.createAlertBox(
                    'Error!', 
                    'Please Enter Something on the Textfield',
                    'error',
                    'Okay'
                );
                return;
            }

            switch(type) {
                case "link":
                    if(dataDriver.getTagsArray().length == limit) {
                        // ALERT USER THAT IT CAN'T INPUT ANYMORE
                        alertBox.createAlertBox(
                            'Error!',
                            'Cannot Add More than Four Links',
                            'error',
                            'Okay'
                        );
                        return;
                    }
                    
                    const phpURL  = '../../php/VerifyYoutubeLink.php',
                          urlData = {
                            url : textField.value
                          };
                    
                    (async() => {
                        let result = await ds.postData(urlData, phpURL);
                        if(result['result'] == true) {
                            this.generateButtons(tagsDiv, dataDriver, type, textField);
                            console.log(this.ytLinkToThumbnail(dataDriver.getTagsArray()));
    
                            // THUMBNAIL VIEWER
                            this.addRemoveThumbnail("link", dataDriver);
                        }
                        else {
                            alertBox.createAlertBox(
                                'Error!',
                                'Invalid Link',
                                'error',
                                'Okay'
                            );
                        }
                    })();
                    break;
                case "media":
                    if(dataDriver.getTagsArray().length == limit) {
                        // ALERT USER THAT IT CAN'T INPUT ANYMORE
                        alertBox.createAlertBox(
                            'Error!',
                            'Cannot Add More than Four Media',
                            'error',
                            'Okay'
                        );
                        return;
                    }
                    this.generateButtons(tagsDiv, dataDriver, type, textField)
                    this.addRemoveThumbnail(type, dataDriver);
                    console.log(this.mediaDriver.getTagsArray());
                    break;
                default:
                    this.generateButtons(tagsDiv, dataDriver, type, textField);
                    break;
            }
        }
    } 

    createThumbnailViewer(elementID, parentDiv, thumbnailArray) {
        // CREATE ELEMENT
        let newDivElement = new CreateElement("div", elementID,
                            'thumbnail-div-holder').createElement();

        parentDiv.appendChild(newDivElement);
        // MEDIA MODAL
        this.thumbnailFactory.generateThumbnail(thumbnailArray, 
            newDivElement);

    }

    showThumbnailToPostModal(imagesArray) {
        const modalBody      = document.getElementById("post-modal-body"),
              postElementID  = "post-thumbnails",
              divElement     = document.querySelector('#'.concat(postElementID)),
              contentsID     = "media-contents";
        
        if(!divElement) {
            let postThumbnails   = new CreateElement("div", postElementID, null)
                                   .createElement(),
                thumbnailHeader  = new CreateElement("div", "thumbnail-header")
                                   .createElement(),
                thumbnailText    = new CreateElement("div", "thumbnail-header-text",
                                   null).createElement(),
                closeThumbnail   = new CreateElement("div", "thumbnail-header-close",
                                   null).createElement(),
                closeButton      = new CreateElement("button", "remove-thumbnail",
                                   null).createElement(),
                closeButtonIcon  = new CreateElement("i", null, "fa-solid fa-xmark")
                                   .createElement(),
                thumbnailContent = new CreateElement("div", contentsID, null)
                                   .createElement();
                
                // SET ATTRIBUTE
                thumbnailText.textContent = "Media";
                closeThumbnail.setAttribute("type", "button");

                // APPEND CHILD 
                modalBody.appendChild(postThumbnails);
                postThumbnails.appendChild(thumbnailHeader);
                thumbnailHeader.appendChild(thumbnailText);
                thumbnailHeader.appendChild(closeThumbnail);
                closeThumbnail.appendChild(closeButton);
                closeButton.appendChild(closeButtonIcon);
                postThumbnails.appendChild(thumbnailContent);

                closeButton.onclick = () => {
                    postThumbnails.remove();
                    this.freeButtons();
                }
        }
        else {
            // document.getElementById("thumbnail-holder").remove();
            document.getElementById(contentsID).remove();
            let content = new CreateElement("div", contentsID, null).createElement();
            document.getElementById(postElementID).appendChild(content);
        }

        // this.thumbnailFactory.generateThumbnail(thumbnailArray, 
        //     document.getElementById(contentsID));
        this.createThumbnailViewer(contentsID, document.getElementById(postElementID),
            imagesArray);
    }

    ytLinkToThumbnail(ytLinks) {
        let ytThumbnails = [];
        for(let i = 0; i < ytLinks.length; i ++) {
            let linkSplit = ytLinks[i].split("="),
                videoCode = linkSplit[linkSplit.length - 1],
                thumbnail = "https://img.youtube.com/vi/".concat(
                            videoCode).concat("/maxresdefault.jpg");
            ytThumbnails.push(thumbnail);
        }
        return ytThumbnails;
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