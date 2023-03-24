// Author: fiVe [G. Bulaong]
// Description Creates a new Div

export class CreateDiv {

    constructor(idName, className) {
        this.idName    = idName;
        this.className = className;
    }

    getIdName() {
        return this.idName;
    }

    getClassName() {
        return this.className;
    }

    createDiv() {
        let div = document.createElement("div");
        if(this.getIdName() != null) {
            div.setAttribute("id", this.getIdName());
        }
        if(this.getClassName() != null) {
            div.setAttribute("class", this.getClassName());
        }
        return div;
    }

}