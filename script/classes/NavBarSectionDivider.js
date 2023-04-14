// Author: fiVe [G. Bulaong]
// Description: Active Link when link is clicked

export class NavBarSectionDivider {
    constructor(links, divCards) {
       this.links    = links; 
       this.divCards = divCards;

       this.changeActiveLink(this.getLinks());
    }

    getLinks() {
        return this.links;
    }
    getDivCards() {
        return this.divCards;
    }
    changeActiveLink(allLinks){
        allLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                allLinks.forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
    changeDiv(divID) {
        for(let i = 0; i < this.getDivCards().length; i++) {
            let currentCard = this.getDivCards()[i];
            switch(divID) {
                case "all":
                    document.getElementById(currentCard).style.display = "block";
                    break;
                default:
                    if(currentCard == divID) {
                        document.getElementById(currentCard).style.display = "block";
                    }
                    else {
                        document.getElementById(currentCard).style.display = "none";
                    }
                    break;
            }
        }
    }

    defaultViewProfilePage() {
        document.getElementById("about").style.display = "none";
        document.getElementById("posts").style.display = "block";
    }
}  
