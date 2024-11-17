class InfoForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);

        this.initElements();
        this.bindEventListeners();
    }
    
    initElements() {
        this.infoButton = document.getElementById("application-info-button");
    }

    bindEventListeners() {
        this.infoButton?.addEventListener("click", () => this.toggle({ blur: true }));
    }
}

const infoFormDOM = document.getElementById("info-form");
const infoForm = new InfoForm(infoFormDOM, document.getElementById("list-container"));
