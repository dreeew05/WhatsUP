// Author: fiVe [G. Bulaong]
// Description: Generates the Images of the Post

export class GeneratePostImage {
    constructor(count, filenames, captions) {
        this.count     = count;
        this.filenames = filenames;
        this.captions  = captions;

        this.generateImage(count, filenames, captions);
    }

    generateImage(count, filenames, captions) {

        const DIVHOLDER = document.getElementById("sample"),
              BASE_PATH = "../../assets/images/";

        for(let i = 0; i < count; i++) {
            let LINK = document.createElement("a"),
                IMG  = document.createElement("img"),
                FILE_PATH = BASE_PATH.concat(filenames[i]).concat(".jpg");
            
            LINK.setAttribute("data-fancybox", "gallery");
            LINK.setAttribute("data-caption",  captions[i]);
            LINK.setAttribute("href", FILE_PATH);
            IMG.src = FILE_PATH;
            IMG.setAttribute("alt", filenames[i])
            this.resizeBaseOnCount(count, IMG);
            DIVHOLDER.appendChild(LINK);
            LINK.appendChild(IMG);
        }
    }

    resizeBaseOnCount(count, IMG) {
        switch(count) {
            case 1:
                IMG.setAttribute("style", "height: 40rem;" + 
                    "min-width: 50rem; object-fit: cover;" + 
                    "margin-left: 0.5rem; margin-right: 0.5rem;");
                break;
            case 2:
                IMG.setAttribute("style", "height: 40rem;" + 
                    "min-width: 24.5rem; object-fit: cover;" + 
                    "margin-left: 0.5rem; margin-right: 0.5rem;");
                    break;
            case 4:
                IMG.setAttribute("style", "height: 20rem; width: 100%;" +  
                    "min-width: 20rem; object-fit: cover;" +
                    "margin-left: 0.5rem; margin-right: 0.5rem;");
                break;
            default:
                break;
        } 
    }
}