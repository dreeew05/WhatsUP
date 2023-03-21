// Author: fiVe [G. Bulaong]
// Description: Active Link when link is clicked

export class NavBarSectionDivider {
    constructor(links) {
       this.links = links; 

       this.changeActiveLink(links)
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
}  
