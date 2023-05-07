// Author: fiVe
// Description: Show thumbnails when creating post

import { CreateElement } from "./CreateElement.js";

export class PostThumbnailFactory {
    
    generateThumbnail(thumbnailArray, DIV_HOLDER) {
        let count           = thumbnailArray.length,
            thumbnailHolder = new CreateElement("div", null, 'thumbnail-holder')
                              .createElement();
        
        switch(count) {
            case 1:
                this.oneImage(thumbnailArray[0], thumbnailHolder);
                break;
            case 2:
                this.twoImages(thumbnailArray, thumbnailHolder);
                break;
            case 3:
                this.threeImages(thumbnailArray, thumbnailHolder);
                break;
            case 4:
                this.fourImages(thumbnailArray, thumbnailHolder);
                break;
            default:
                break;
        }

        DIV_HOLDER.appendChild(thumbnailHolder);
    }

    oneImage(imageURL, thumbnailHolder) {
        let image = new CreateElement("img", "single-image", null)
                    .createElement();
        
        // SET ATTRIBUTE
        image.setAttribute("src", imageURL);

        // APPEND CHILD
        thumbnailHolder.appendChild(image);
    }

    twoImages(thumbnailArray, thumbnailHolder) {
        let twoImagesDiv = new CreateElement("div", "two-images-div", null)
                           .createElement();
        for(let i = 0; i < thumbnailArray.length; i++) {
            let imageDiv = new CreateElement("div", "thumbnail-two-media",
                           "half-div").createElement(),
                image    = new CreateElement("img", null, null).createElement();
            
            // SET ATTRIBUTE
            image.setAttribute("src", thumbnailArray[i]);

            // APPEND CHILD
            twoImagesDiv.appendChild(imageDiv);
            imageDiv.appendChild(image);
        }
        thumbnailHolder.appendChild(twoImagesDiv);
    }

    threeImages(thumbnailArray, thumbnailHolder) {
        let threeImagesDiv = new CreateElement("div", "three-images-div", null)
                             .createElement(),
            firstHalfDiv   = new CreateElement("div", "three-images-first-half",
                             "half-div").createElement(),
            secondHalfDiv  = new CreateElement("div", "three-images-second-half", 
                             "half-div").createElement();
            
            for(let i = 0; i < thumbnailArray.length; i++) {
                let image = new CreateElement("img", null, null).createElement();
                if(i == 0) {
                    firstHalfDiv.appendChild(image);
                }
                else {
                    let trancheDiv = new CreateElement("div", null, "tranche-div")
                                     .createElement();
                    secondHalfDiv.appendChild(trancheDiv);
                    trancheDiv.appendChild(image);
                }
                // SET ATTRIBUTE
                image.setAttribute("src", thumbnailArray[i]);
            }
            thumbnailHolder.appendChild(threeImagesDiv);
            threeImagesDiv.appendChild(firstHalfDiv);
            threeImagesDiv.appendChild(secondHalfDiv);
    }

    fourImages(thumbnailArray, thumbnailHolder) {
        let fourImagesDiv = new CreateElement("div", "four-images-div", null)
                            .createElement(),
            halfDiv       = null;

        for(let i = 0; i < thumbnailArray.length; i++) {

            let trancheDiv = new CreateElement("div", null, "tranche-div")
                             .createElement(),
                image      = new CreateElement("img", null, null)
                             .createElement();

            if(i % 2 == 0) {
                halfDiv = new CreateElement("div", null, "half-div")
                          .createElement();
                fourImagesDiv.appendChild(halfDiv);
            }

            // SET ATTRIBUTE
            image.setAttribute("src", thumbnailArray[i]);

            halfDiv.appendChild(trancheDiv);
            trancheDiv.appendChild(image);
        }
        thumbnailHolder.appendChild(fourImagesDiv);
    }



}