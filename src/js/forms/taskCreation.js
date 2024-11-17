class TaskCreationForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);

        this.initElements();
        this.bindEventListeners();
    }

    initElements() {
        this.confirmButton = document.getElementById("task-form-confirm-creation");
        this.closeButton = document.getElementById("close-task-creation-form-button");
    }

    bindEventListeners() {
        this.confirmbutton?.addEventListener("click", () => this.confirm());
        this.closeButton?.addEventListener("click", () => super.hide());
    }

    show(list) {
        this.list = list;
        super.show(true);
    }

    confirm() {
        const nameInput = document.getElementById("task-name-input");
        const dateInput = document.getElementById("task-due-date-input");

        const name = nameInput.value;
        const date = dateInput.value;

        this.list.addTask(name, date, "", false);

        super.hide();

        nameInput.value = "";
        dateInput.value = "";
    }
}

const taskCreationFormDOM = document.getElementById("task-creation-form");
const taskCreationForm = new TaskCreationForm(taskCreationFormDOM, listContainer);
