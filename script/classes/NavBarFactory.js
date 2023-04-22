import { CreateElement } from "./CreateElement.js";

export class NavBarFactory {
    constructor(type, logStatus) {
        this.type      = type;
        this.logStatus = logStatus;

        this.navbarFactory(this.getType());
    }

    getType() {
        return this.type;
    }
    getLogStatus() {
        return this.logStatus;
    }

    getNavBarContents() {
        let navbarContents = document.getElementById("navbar-contents");
        return navbarContents;
    }

    navbarFactory() {
        switch(this.getType()) {
            case "type1" :
                this.typeOne();
                break;
            case "type2" : 
                this.typeTwo();
                break;
            case "type3" :
                this.typeThree();
                break;
            default :
                break;
        }
    }

    typeOne() {
        this.generateHamburger();
        this.generateLogos(1);
        this.generateSearch();
        this.generateLogButton();
    }

    typeTwo() {
        this.generateHamburger();
        this.generateLogos(2);
        this.generateSearch();
        this.generateLogButton();
    }

    generateHamburger() {
        let hamburger       = new CreateElement("div", "hamburger", null).createElement(),
            hamburgerButton = new CreateElement("button", "hamburger-button", 
                              "navbar-toggler me-3 hamburger-button").createElement(),
            animatedIcon    = new CreateElement("div", null, "animated-icon").createElement(),
            span1           = new CreateElement("span", null, null).createElement(),
            span2           = new CreateElement("span", null, null).createElement(),
            span3           = new CreateElement("span", null, null).createElement();

        // SET ATTTRIBUTE
        hamburgerButton.setAttribute("type", "button");
        hamburgerButton.setAttribute("data-toggle", "collapse");
        hamburgerButton.setAttribute("aria-expanded", "false");
        hamburgerButton.setAttribute("aria-label", "Toggle navigation");

        // APPEND CHILD
        
        this.getNavBarContents().appendChild(hamburger);
        hamburger.appendChild(hamburgerButton);
        hamburgerButton.appendChild(animatedIcon);
        animatedIcon.appendChild(span1);
        animatedIcon.appendChild(span2);
        animatedIcon.appendChild(span3);

        this.generateSideNavBar(hamburger);
            
    }

    generateSideNavBar(HAMBURGER) {
        let row              = new CreateElement("div", null, "row")
                               .createElement(),
            sideNavBarHolder = new CreateElement("div", null, 
                               "col-2 d-flex justify-content-center")
                               .createElement(),
            sideNavbar       = new CreateElement("div", "sidenavbar",
                               "sidenav").createElement();
        
        // APPEND CHILD
        HAMBURGER.appendChild(row);
        row.appendChild(sideNavBarHolder);
        sideNavBarHolder.appendChild(sideNavbar);

    }

    generateLogos(QUANTITY) {
        let logos       = new CreateElement("div", "logos", null).createElement(),
            brandLogo  = new CreateElement("div", "brand-logo", null)
                            .createElement(),
            brandLink  = new CreateElement("a", "brand-link", null)
                            .createElement(),
            brandImage = new CreateElement("img", null, "site-logo")
                            .createElement();
                
        // SET ATTRIBUTE
        brandLink.href        = "#";
        const BRAND_LOGO_PATH = "/assets/svg/What'sUpLogo.svg"
        this.setImageAttributes(brandImage, "Source Logo", 
            BRAND_LOGO_PATH);

        // APPEND CHILD
        this.getNavBarContents().appendChild(logos);
        logos.appendChild(brandLogo);
        brandLogo.appendChild(brandLink);
        brandLink.appendChild(brandImage);

        if(QUANTITY == 2) {
            let upLogo  = new CreateElement("div", "up-logo", null)
                          .createElement(),
                upLink  = new CreateElement("a", "up-link", null)
                          .createElement(),
                upImage = new CreateElement("img", null, "up-logo")
                          .createElement();
            
            // SET ATTRIBUTE
            upLink.href        = "https://www.up.edu.ph";
            const UP_LOGO_PATH = "/assets/images/logos/upSystemLogo.png";
            this.setImageAttributes(upImage, "UP Logo", UP_LOGO_PATH);

            // APPEND CHILD
            logos.appendChild(upLogo);
            upLogo.appendChild(upLink);
            upLink.appendChild(upImage);
        }
    }

    setImageAttributes(image, alt, source) {
        image.href = alt;
        image.src  = source;
    }

    generateSearch() {
        let searchDiv  = new CreateElement("div", "search", null)
                       .createElement(),
            searchForm = new CreateElement("form", null, 
                         "d-flex input-group w-100")
                         .createElement(),
            searchBar  = new CreateElement("input", "search-bar", 
                         "form-control me-0")
                         .createElement(),
            searchBtn  = new CreateElement("button", "search-button", "btn")
                         .createElement(),
            searchIcon = new CreateElement("i", "search-icon", 
                         "fa-solid fa-magnifying-glass")
                         .createElement();

        // SET ATTRIBUTE 
        searchForm.setAttribute("action", "");
        searchBtn.setAttribute("type", "submit");
        searchBar.setAttribute("type", "search");
        searchBar.setAttribute("placeholder", "Search What's UP?");
        searchBar.setAttribute("aria-label", "Search");

        // APPEND CHILD
        this.getNavBarContents().appendChild(searchDiv);
        searchDiv.appendChild(searchForm);
        searchForm.appendChild(searchBar);
        searchForm.appendChild(searchBtn);
        searchBtn.appendChild(searchIcon);

    }

    generateLogButton() {
        let buttonHolder = new CreateElement("div", "log-button-holder", null)
                           .createElement(),
            button       = new CreateElement("button", "log-button", null)
                           .createElement();
        
        // SET ATTRIBUTE
        button.setAttribute("type", "button");
        if(this.getLogStatus() == "visitor") {
            button.textContent = "Admin";
        }
        else {
            button.textContent = "Logout";
        }

        // APPEND CHILD
        this.getNavBarContents().appendChild(buttonHolder);
        buttonHolder.appendChild(button);
    }

}