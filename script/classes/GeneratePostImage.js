// Author: fiVe [G. Bulaong]
// Description: Generates the Images of the Post

import { CreateDiv } from "./CreateDiv.js";

export class GeneratePostImage {

    constructor(POST_HOLDER, filenames, captions) {
        this.POST_HOLDER = POST_HOLDER;
        this.filenames   = filenames;
        this.captions    = captions;

        this.generateImage(this.getCount(), this.getFileNames(), this.getCaptions());
    }

    NEW_DIV       = '';
    NEW_DIV_NEXT  = '';
    CONTAINER_DIV = new CreateDiv(null, "container-4").createDiv();
    IMAGE_HOLDER  = new CreateDiv("image-holder", null).createDiv();

    getPostHolder() {
        return this.POST_HOLDER;
    }

    getCount() {
        return this.getFileNames().length;
    }

    getFileNames() {
        return this.filenames;
    }

    getCaptions() {
        return this.captions;
    }

    setLinkAttribute(LINK, FILE_PATH, CAPTION) {
        LINK.setAttribute("data-fancybox", "gallery");
        LINK.setAttribute("data-caption",  CAPTION);
        LINK.setAttribute("href", FILE_PATH);
    }

    setImageAttribute(IMG, FILE_NAME, FILE_PATH) {
        IMG.src = FILE_PATH;
        IMG.setAttribute("alt", FILE_NAME);
    }

    getDiv() {
        return this.NEW_DIV;
    }

    setDiv(NEW_DIV) {
        this.NEW_DIV = NEW_DIV;
    } 

    getImageHolder() {
        return this.IMAGE_HOLDER;
    }

    getContainerDiv() {
        return this.CONTAINER_DIV;
    }

    initializeImageHolder() {
        this.getImageHolder().setAttribute("class", "container d-flex justify-content-center");
    }

    divLinkAppend(DIV, LINK, IMG) {
        DIV.appendChild(LINK);
        LINK.appendChild(IMG);
    }

    generateImage(count, filenames, captions) {

        const BASE_PATH   = "../../assets/images/";      
        this.initializeImageHolder();

        for(let i = 0; i < count; i++) {
            let LINK = document.createElement("a"),
                IMG  = document.createElement("img"),
                FILE_PATH = BASE_PATH.concat(filenames[i]).concat(".jpg");
            
            this.setLinkAttribute(LINK, FILE_PATH, captions);
            this.setImageAttribute(IMG, filenames[i], FILE_PATH);

            this.resizeBaseOnCount(count, i, IMG, LINK);
        }
    }

    resizeBaseOnCount(count, counter, IMG, LINK) {

        let newDiv = null;

        switch(count) {
            case 1:
                IMG.setAttribute("class", "img-fluid");
                IMG.setAttribute("style", "height: 100%;");
                this.getPostHolder().appendChild(this.getImageHolder());
                this.getImageHolder().appendChild(LINK);
                LINK.appendChild(IMG);
                break;
            case 2:
                newDiv = new CreateDiv(null, "medium-images");
                if(counter == 0) {
                    this.setDiv(newDiv.createDiv());   
                }
                IMG.setAttribute("class", "medium-image");
                this.getPostHolder().appendChild(this.getImageHolder());
                this.getImageHolder().appendChild(this.getDiv());
                this.divLinkAppend(this.getDiv(), LINK, IMG);
                break;
            case 3:
                newDiv = new CreateDiv(null, "small-images-2");
                switch(counter) {
                    case 0:
                        IMG.setAttribute("class", "big-image");
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(LINK);
                        LINK.appendChild(IMG);
                        break;
                    case 1:
                        this.setDiv(newDiv.createDiv());
                        IMG.setAttribute("class", "small-image");
                        IMG.setAttribute("style", "padding-bottom: 0.5rem;");
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(this.getDiv());
                        this.divLinkAppend(this.getDiv(), LINK, IMG)
                        break;
                    case 2:
                        IMG.setAttribute("class", "small-image");
                        this.divLinkAppend(this.getDiv(), LINK, IMG)
                        break;
                    default:
                        break;
                }
                break;
            case 4:
                let rowDiv = new CreateDiv(null, "row"),
                    colDiv = new CreateDiv(null, "col");
                switch(counter % 2) {
                    case 0:
                        this.setDiv(rowDiv.createDiv());
                        colDiv = colDiv.createDiv();
                        IMG.setAttribute("style", "padding-bottom: 0.5rem;");
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(this.getContainerDiv());
                        this.getContainerDiv().appendChild(this.getDiv());
                        this.getDiv().appendChild(colDiv);
                        this.divLinkAppend(colDiv, LINK, IMG);
                        break;
                    case 1:
                        colDiv = colDiv.createDiv();
                        this.getDiv().appendChild(colDiv);
                        this.divLinkAppend(colDiv, LINK, IMG);
                        break;
                    default:
                        break;
                    }
                break;
            default:
                break;
        } 
    }
}