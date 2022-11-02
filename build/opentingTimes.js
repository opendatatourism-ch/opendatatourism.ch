"use strict";
class OpenstreetmapElement {
    constructor() {
        this.nodes = document.querySelectorAll(".openingTimes");
        this.overpassturboUrl = this.getOverpassUrl();
        this.fetchOverpassJson();
    }
    getOverpassUrl() {
        var url = "https://overpass.osm.ch/api/interpreter?data=[out:json];(";
        this.nodes.forEach((element) => {
            url += element.getAttribute("data-osmid") + ";";
        });
        url += ");out tags;";
        this.overpassturboUrl = url;
        return url;
    }
    fetchOverpassJson() {
        fetch(this.overpassturboUrl)
            .then((response) => response.json())
            .then((data) => (this.overpassturboElements = data["elements"]))
            .then(() => this.renderObjects());
    }
    renderObjects() {
        console.log("Render Objects");
        this.nodes.forEach((element) => {
            let osmidAttribut = element.getAttribute("data-osmid");
            let splitString = osmidAttribut === null || osmidAttribut === void 0 ? void 0 : osmidAttribut.split("(");
            if (splitString != null) {
                let osmtype = splitString[0];
                let osmid = Number(splitString[1].slice(0, -1));
                var object = this.getOsmElementbyTypeId(osmtype, osmid);
                if (object != null) {
                    let is_open = this.getOpen(object["tags"]["opening_hours"]);
                    this.setAttributes(element, object, is_open);
                    this.setOpenIcon(element, is_open);
                    let iconAttribut = element.getAttribute("data-icon");
                    console.log(iconAttribut);
                    if (iconAttribut != null) {
                        this.setIcon(element, iconAttribut);
                    }
                    this.setText(element, object["tags"]["name"]);
                    let layoutAttribut = element.getAttribute("data-layout");
                    console.log(layoutAttribut);
                    if (layoutAttribut != null) {
                        this.setLayout(element, layoutAttribut, object["tags"]["opening_hours"]);
                    }
                }
            }
        });
    }
    getOsmElementbyTypeId(type, id) {
        const element = this.overpassturboElements.find((el) => el.id === id && el.type === type);
        return element;
    }
    getOpen(value) {
        let locale = navigator.language;
        console.log(locale);
        let lat = "47,4134074";
        let lon = "9,3479842";
        let country_code = "ch";
        let state = "ar";
        // @ts-ignore
        let oh = new opening_hours(value, { lat, lon, address: { country_code, state } }, { locale: locale });
        var is_open = oh.getState();
        return is_open;
    }
    setAttributes(element, object, is_open) {
        element.setAttribute("data-opening_hours", object["tags"]["opening_hours"]);
        element.setAttribute("data-is_open", is_open);
    }
    setText(element, name) {
        const span = document.createElement("span");
        span.textContent = name;
        element.appendChild(span);
    }
    setOpenIcon(element, open) {
        const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let icon = "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z";
        let color = "rgb(187, 187, 1)";
        if (open == true) {
            icon =
                "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z";
            color = "green";
        }
        else {
            icon =
                "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z";
            color = "red";
        }
        iconSvg.setAttribute("width", "24");
        iconSvg.setAttribute("height", "24");
        iconSvg.setAttribute("fill", color);
        iconSvg.setAttribute("viewBox", "0 0 24 24");
        iconPath.setAttribute("d", icon);
        iconSvg.appendChild(iconPath);
        element.prepend(iconSvg);
    }
    setIcon(element, code) {
        const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let icon = "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z";
        switch (code) {
            case "bed":
                icon =
                    "M24 19v-7h-23v-7h-1v14h1v-2h22v2h1zm-20-12c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm19 4c0-1.657-1.343-3-3-3h-13v3h16z";
                break;
            case "company":
                icon =
                    "M1 22h2v-22h18v22h2v2h-22v-2zm7-3v4h3v-4h-3zm5 0v4h3v-4h-3zm-6-5h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2zm-12-4h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2zm-12-4h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2zm-12-4h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2z";
                break;
            case "library":
                icon =
                    "M22 24h-17c-1.657 0-3-1.343-3-3v-18c0-1.657 1.343-3 3-3h17v24zm-2-4h-14.505c-1.375 0-1.375 2 0 2h14.505v-2zm-3-15h-10v3h10v-3z";
                break;
            case "train":
                icon =
                    "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z";
                break;
            default:
                break;
        }
        iconSvg.setAttribute("width", "24");
        iconSvg.setAttribute("height", "24");
        iconSvg.setAttribute("viewBox", "0 0 24 24");
        iconPath.setAttribute("d", icon);
        iconSvg.appendChild(iconPath);
        element.appendChild(iconSvg);
    }
    setLayout(element, code, openingHours) {
        switch (code) {
            case "long":
                this.setOpeningHours(element, openingHours);
                break;
            default:
                break;
        }
    }
    setOpeningHours(element, openingHours) {
        const div = document.createElement("div");
        element.appendChild(div);
        /*const span = document.createElement("span");
        span.textContent = "Montag 09:00-12:00 13:30-17:00";
        element.appendChild(span);*/
        let locale = navigator.language;
        let lat = "47,4134074";
        let lon = "9,3479842";
        let country_code = "ch";
        let state = "Sankt Gallen";
        // @ts-ignore
        let oh = new opening_hours(openingHours, { lat, lon, address: { country_code, state } }, { locale: locale });
        let it = oh.getIterator();
        // @ts-ignore
        div.innerHTML += OpeningHoursTable.drawTableAndComments(oh, it);
    }
}
// @ts-ignore
let openstreetmapElement = new OpenstreetmapElement();
