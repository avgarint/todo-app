class CSVImportForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);

        this.initElements();
        this.bindEventListeners();
    }

    initElements() {
        this.textArea = this.dom.querySelector("#csv-import-form-input-text");
        this.closeButton = this.dom.querySelector(
            "#close-csv-import-form-button"
        );
        this.loadButton = this.dom.querySelector("#load-csv-button");
    }

    bindEventListeners() {
        this.closeButton?.addEventListener("click", () => this.hide());
        this.loadButton?.addEventListener("click", () => this.handleCSVLoad());
    }

    show(list) {
        super.show({ blur: true });
        this.list = list;
    }

    handleCSVLoad() {
        const csvData = this.textArea?.value.trim();

        if (!csvData) {
            alert("Please enter a valid CSV input.");
            return;
        }

        try {
            this.list.loadFromCSV(csvData);
            alert("CSV loaded successfully!");
            this.textArea.value = "";
            setTimeout(() => this.hide(), 1000);
        } catch (error) {
            console.error("Error loading CSV:", error);
            alert("Failed to load CSV. Please check the format.");
        }
    }
}

const listContainer = document.getElementById("list-container");
const csvImportFormDOM = document.getElementById("csv-import-form");
const csvImportForm = new CSVImportForm(csvImportFormDOM, listContainer);
