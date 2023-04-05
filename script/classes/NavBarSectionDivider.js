// Author: fiVe [G. Bulaong]
// Description: Active Link when link is clicked

export class NavBarSectionDivider {
    constructor(links) {
       this.links = links; 

       this.defaultView();
       this.changeActiveLink(links);
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
    changeDiv(divName) {
        if(divName == "home") {
            document.getElementById("about").style.display = "none";
            document.getElementById("posts").style.display = "block";
        }
        else {
            document.getElementById("about").style.display = "block";
            document.getElementById("posts").style.display = "none";
        }
    }
    defaultView() {
        document.getElementById("about").style.display = "none";
        document.getElementById("posts").style.display = "block";
    }
}  
