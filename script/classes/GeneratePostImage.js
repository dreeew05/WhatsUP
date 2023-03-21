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
            DIVHOLDER.appendChild(LINK);
            LINK.appendChild(IMG);
        }
    }
}