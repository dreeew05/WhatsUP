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

        this.displayPostButton();
        this.displayPostModal();
        this.displayMapModal();
        this.displayYoutubeModal();
        this.displayMediaModal();

    }

    getPostHolder() {
        return this.postHolder;
    }

    displayPostButton() {        
        let postButton = new CreateElement("button", "post-button", null).createElement();

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
        tagsText.textContent = "Tags";
        addTagTextField.setAttribute("type", "text");
        addTagButton.setAttribute("type", "submit");
        mediaControlTxt.textContent = "Add To Post";
        postButton.textContent = "Post";
        imageButton.setAttribute("type", "button");
        imageButton.setAttribute("data-bs-target", "#media-modal");
        imageButton.setAttribute("data-bs-toggle", "modal");
        imageButton.setAttribute("data-bs-dismmis", "modal");
        videoButton.setAttribute("type", "button");
        videoButton.setAttribute("data-bs-target", "#media-modal");
        videoButton.setAttribute("data-bs-toggle", "modal");
        videoButton.setAttribute("data-bs-dismmis", "modal");
        ytButton.setAttribute("type", "button");
        ytButton.setAttribute("data-bs-target", "#yt-modal");
        ytButton.setAttribute("data-bs-toggle", "modal");
        ytButton.setAttribute("data-bs-dismmis", "modal");
        mapButton.setAttribute("type", "button");
        mapButton.setAttribute("data-bs-target", "#map-modal");
        mapButton.setAttribute("data-bs-toggle", "modal");
        mapButton.setAttribute("data-bs-dismmis", "modal");
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

        let ds = this.dataSerializer;

        // ACTION WHEN POST BUTTON IS CLICKED
        postButton.onclick = function() {
            // console.log(latFieldHidden.value);
            // console.log(lngFieldHidden.value);
            console.log(ds.getData());
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
            // modalBody.appendChild(displayMap);

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
            addYTButton.setAttribute("type", "submit");

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

            // MODIFY Links
            this.modifyEntries(linkDiv, addLinksTField, addYTButton, "link",
            this.ytLinksDataDriver, 4);
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

            // MODIFY Links
            this.modifyEntries(fileDiv, addFileTField, addFileButton, "media",
            this.mediaDriver, 4);
    }

    generateButtons(tagsDiv, dataDriver, type, entry) {
        // ADD COUNTER FOR ID REFERENCE
        dataDriver.incrementCounter();

        let tagButtonID  = type + "-" + dataDriver.getCounter(),
            removeBtnID  = "remove-" + type + "-" + dataDriver.getCounter(),
            tagButtons   = new CreateElement("div", tagButtonID, "tag-buttons")
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

            let elementID  = null,
                parentDiv  = null,
                divElement = null;

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
        this.thumbnailFactory.generateThumbnail(thumbnailArray, 
            newDivElement);
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