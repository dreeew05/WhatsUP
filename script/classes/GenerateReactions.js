import { CreateElement } from "./CreateElement.js";

export class GenerateReactions {

    constructor(POST_HOLDER, ID) {
        this.POST_HOLDER = POST_HOLDER;
        this.ID          = ID;

        // METHODS
        this.createReactions();
    }

    getPostHolder() {
        return this.POST_HOLDER;
    }

    getID() {
        return this.ID;
    }

    createReactions() {
        let buttonDiv = new CreateElement("div", "reaction-div-"
                        .concat(this.getID()), "reaction-div")
                        .createElement(),
            hrtBtn    = new CreateElement("button", "heart-"
                        .concat(this.getID()), "react-btn heart")
                        .createElement(),
            heartIcn  = new CreateElement("i", null, 
                        "fa-solid fa-heart" ).createElement(),
            hahaBtn   = new CreateElement("button", "haha-"
                        .concat(this.getID()), "react-btn haha")
                        .createElement(),
            hahaIcn   = new CreateElement("i", null, 
                        "fa-regular fa-face-laugh-squint")
                        .createElement(),
            sadBtn    = new CreateElement("button", "sad-"
                        .concat(this.getID()), "react-btn sad")
                        .createElement(),
            sadIcn    = new CreateElement("i", null, 
                        "fa-solid fa-face-sad-cry")
                        .createElement(),
            agryBtn   = new CreateElement("button", "angry-"
                        .concat(this.getID()), "react-btn angry")
                        .createElement(),
            agryIcn   = new CreateElement("i", null, 
                        "fa-solid fa-face-angry")
                        .createElement();

        // SET ATTRIBUTE
        // hrtBtn.setAttribute("type", "button");

        // APPEND CHILD
        this.getPostHolder().appendChild(buttonDiv);
        buttonDiv.appendChild(hrtBtn);
        hrtBtn.appendChild(heartIcn);
        buttonDiv.appendChild(hahaBtn);
        hahaBtn.appendChild(hahaIcn);
        buttonDiv.appendChild(sadBtn);
        sadBtn.appendChild(sadIcn);
        buttonDiv.appendChild(agryBtn);
        agryBtn.appendChild(agryIcn);

        // BUTTON ACTIONS
        hrtBtn.onclick = () => {
            if(!hrtBtn.classList.contains('active')) {
                this.freeReactions();
                hrtBtn.classList.add('active');
            }
            else {
                this.freeReactions();
            }
            
        }
        hahaBtn.onclick = () => {
            if(!hahaBtn.classList.contains('active')) {
                this.freeReactions();
                hahaBtn.classList.add('active');
            }
            else {
                this.freeReactions();
            }
            
        }
        sadBtn.onclick = () => {
            if(!sadBtn.classList.contains('active')) {
                this.freeReactions();
                sadBtn.classList.add('active');
            }
            else {
                this.freeReactions();
            }
            
        }
        agryBtn.onclick = () => {
            if(!agryBtn.classList.contains('active')) {
                this.freeReactions();
                agryBtn.classList.add('active');
            }
            else {
                this.freeReactions();
            }
            
        }
    }

    freeReactions() {
        const heart = document.getElementById(
            "heart-".concat(this.getID())
        );
        const haha = document.getElementById(
            "haha-".concat(this.getID())
        );
        const sad = document.getElementById(
            "sad-".concat(this.getID())
        );
        const angry = document.getElementById(
            "angry-".concat(this.getID())
        );

        heart.classList.remove('active');
        haha.classList.remove('active');
        sad.classList.remove('active');
        angry.classList.remove('active');
    }

}