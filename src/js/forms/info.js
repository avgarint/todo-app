class InfoForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);

        this.bindEventListeners();
    }

    bindEventListeners() {
        const infoButton = document.getElementById("application-info-button");
        if (infoButton) {
            infoButton.addEventListener("click", () =>
                this.toggle({ blur: true })
            );
        }
    }
}

const infoFormDOM = document.getElementById("info-form");
const infoForm = new InfoForm(
    infoFormDOM,
    document.getElementById("list-container")
);
