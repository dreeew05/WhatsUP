// Author: fiVe [G. Bulaong]
// Description: Generates the Images of the Post

export class GeneratePostImage {

    constructor(count, filenames, captions) {
        this.count     = count;
        this.filenames = filenames;
        this.captions  = captions;

        this.generateImage(this.getCount(), this.getFileNames(), this.getCaptions());
    }

    NEW_DIV      = '';
    IMAGE_HOLDER = document.createElement("div");

    getCount() {
        return this.count;
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

    createDivForSmallImagesTwo() {
        let div = document.createElement("div");
        div.setAttribute("class", "small-images-2");
        return div;
    }

    createDivForSmallImagesFour() {
        let div = document.createElement("div");
        div.setAttribute("class", "small-images-4");
        return div;
    }

    createDivForMediumImages() {
        let div = document.createElement("div");
        div.setAttribute("class", "medium-images");
        return div;
    }

    getDiv() {
        return this.NEW_DIV;
    }

    setDiv(NEW_DIV) {
        this.NEW_DIV = NEW_DIV;
    }

    getPostHolder() {
        return document.getElementById("posts");
    }

    getImageHolder() {
        return this.IMAGE_HOLDER;
    }

    initializeImageHolder() {
        this.getImageHolder().setAttribute("class", "container d-flex justify-content-center");
        this.getImageHolder().setAttribute("style", "margin-top: 0.5rem; margin-bottom: 0.5rem;" +
            "width: 80%;");
    }

    divLinkAppend(LINK, IMG) {
        this.getDiv().appendChild(LINK);
        LINK.appendChild(IMG);
    }

    generateImage(count, filenames, captions) {

        const BASE_PATH   = "../../assets/images/";      
        this.initializeImageHolder();

        for(let i = 0; i < count; i++) {
            let LINK = document.createElement("a"),
                IMG  = document.createElement("img"),
                FILE_PATH = BASE_PATH.concat(filenames[i]).concat(".jpg");
            
            this.setLinkAttribute(LINK, FILE_PATH, captions[i]);
            this.setImageAttribute(IMG, filenames[i], FILE_PATH);

            this.resizeBaseOnCount(count, i, IMG, LINK);
        }
    }

    resizeBaseOnCount(count, counter, IMG, LINK) {
        switch(count) {
            case 1:
                IMG.setAttribute("class", "img-fluid");
                IMG.setAttribute("style", "height: 48rem;");
                this.getPostHolder().appendChild(this.getImageHolder());
                this.getImageHolder().appendChild(LINK);
                LINK.appendChild(IMG);
                break;
            case 2:
                if(counter == 0) {
                    this.setDiv(this.createDivForMediumImages());   
                }
                IMG.setAttribute("class", "medium-image");
                this.getPostHolder().appendChild(this.getImageHolder());
                this.getImageHolder().appendChild(this.getDiv());
                this.divLinkAppend(LINK, IMG);
                break;
            case 3:
                switch(counter) {
                    case 0:
                        IMG.setAttribute("class", "big-image");
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(LINK);
                        LINK.appendChild(IMG);
                        break;
                    case 1:
                        this.setDiv(this.createDivForSmallImagesTwo());
                        IMG.setAttribute("class", "small-image");
                        IMG.setAttribute("style", "padding-bottom: 0.5rem;");
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(this.getDiv());
                        this.divLinkAppend(LINK, IMG)
                        break;
                    case 2:
                        IMG.setAttribute("class", "small-image");
                        this.divLinkAppend(LINK, IMG)
                        break;
                }
                break;
            case 4:
                switch(counter % 2) {
                    case 0:
                        this.setDiv(this.createDivForSmallImagesFour());
                        IMG.setAttribute("class", "small-image");
                        IMG.setAttribute("style", "padding-bottom: 0.5rem;");
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(this.getDiv());
                        this.divLinkAppend(LINK, IMG)
                    case 1:
                        IMG.setAttribute("class", "small-image");
                        this.divLinkAppend(LINK, IMG)
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