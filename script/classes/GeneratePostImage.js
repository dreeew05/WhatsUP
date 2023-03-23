// Author: fiVe [G. Bulaong]
// Description: Generates the Images of the Post

export class GeneratePostImage {

    constructor(count, filenames, captions) {
        this.count     = count;
        this.filenames = filenames;
        this.captions  = captions;

        this.generateImage(this.getCount(), this.getFileNames(), this.getCaptions());
    }

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

    createDivForSmallImages() {
        let div = document.createElement("div");
        div.setAttribute("class", "small-images");
        return div;
    }

    newDiv = '';

    getDiv() {
        return this.newDiv;
    }

    setDiv(newDiv) {
        this.newDiv = newDiv;
    }

    getPostHolder() {
        return document.getElementById("posts");
    }

    imageHolder = document.createElement("div");

    getImageHolder() {
        return this.imageHolder;
    }

    initializeImageHolder() {
        this.getImageHolder().setAttribute("class", "container d-flex justify-content-center");
        this.getImageHolder().setAttribute("style", "margin-top: 0.5rem; margin-bottom: 0.5rem;")
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
                IMG.setAttribute("style", this.getImageCommonStyleAttributes());
                this.getPostHolder().appendChild(this.getImageHolder());
                this.getImageHolder().appendChild(LINK);
                LINK.appendChild(IMG);
                break;
            case 2:
                // console.log(this.generateTwoImagesInRow());
                IMG.setAttribute("style", this.generateTwoImagesInRow());
                break;
            case 3:
                switch(counter) {

                    case 0:
                        IMG.setAttribute("class", "big-image");
                        IMG.setAttribute("style", this.getImageCommonStyleAttributes());
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(LINK);
                        LINK.appendChild(IMG);
                        break;
                    case 1:
                        this.setDiv(this.createDivForSmallImages());
                        IMG.setAttribute("class", "small-image");
                        IMG.setAttribute("style", "padding-bottom: 0.5rem;" +
                        this.getImageCommonStyleAttributes());
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(this.getDiv());
                        this.getDiv().appendChild(LINK);
                        LINK.appendChild(IMG);
                        break;
                    case 2:
                        IMG.setAttribute("class", "small-image");
                        IMG.setAttribute("style", this.getImageCommonStyleAttributes());
                        this.getPostHolder().appendChild(this.getImageHolder());
                        this.getImageHolder().appendChild(this.getDiv());
                        this.getDiv().appendChild(LINK);
                        LINK.appendChild(IMG);
                        break;
                }
                break;
            case 4:
                IMG.setAttribute("style", "height: 20rem; width: 100%;" +  
                    "width: 20rem;" + + this.getImageCommonStyleAttributes());
                break;
            default:
                break;
        } 
    }

    generateTwoImagesInRow() {
        return "max-height: 20rem; max-width: auto;" + 
            "height: 100%; width: 100%;" + 
            this.getImageCommonStyleAttributes();
    } 

    getImageCommonStyleAttributes() {
        return "object-fit: cover;" + 
            "padding-left: 0.25rem;" +
            "padding-right: 0.25rem;" +
            "border-radius: 1rem;" ;
    }
}