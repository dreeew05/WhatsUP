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

    generateImage(count, filenames, captions) {

        const POST_HOLDER = document.getElementById("imageHolder"),
              BASE_PATH = "../../assets/images/";

        let DIV  = document.createElement("div");      
        DIV.setAttribute("class", "d-flex justify-content-center");
        DIV.setAttribute("style", "background-color: orange; height: 100rem;");

        for(let i = 0; i < count; i++) {
            let LINK = document.createElement("a"),
                IMG  = document.createElement("img"),
                FILE_PATH = BASE_PATH.concat(filenames[i]).concat(".jpg");
            
            LINK.setAttribute("data-fancybox", "gallery");
            LINK.setAttribute("data-caption",  captions[i]);
            LINK.setAttribute("href", FILE_PATH);
            IMG.src = FILE_PATH;
            IMG.setAttribute("alt", filenames[i])
            this.resizeBaseOnCount(count, IMG, i, DIV);
            POST_HOLDER.appendChild(DIV);
            DIV.appendChild(LINK);
            LINK.appendChild(IMG);
        }
    }

    resizeBaseOnCount(count, IMG, counter, DIV) {
        switch(count) {
            case 1:
                IMG.setAttribute("class", "img-fluid");
                IMG.setAttribute("style", this.getImageCommonStyleAttributes());
                break;
            case 2:
                console.log(this.generateTwoImagesInRow());
                IMG.setAttribute("style", this.generateTwoImagesInRow());
                break;
            case 3:
                if(counter == 2) {
                    lineBreak = document.createElement("br");
                    DIV.appendChild(lineBreak);
                    IMG.setAttribute("style", "height: 20rem; width: 39rem;" +
                        this.getImageCommonStyleAttributes());
                }
                else {
                    IMG.setAttribute("style", this.generateTwoImagesInRow());
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
            "padding: 0.1rem;" + 
            "border-radius: 0.5rem;";
    }
}