class TaskCreationForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.bindEventListeners();
    }

    show(list) {
        this.list = list;
        super.show(true);
    }

    bindEventListeners() {
        const confirmbutton = document.getElementById(
            "task-form-confirm-creation"
        );
        const closeButton = document.getElementById(
            "close-task-creation-form-button"
        );

        confirmbutton.addEventListener("click", () => this.confirm());
        closeButton.addEventListener("click", () => super.hide());
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
const taskCreationForm = new TaskCreationForm(
    taskCreationFormDOM,
    listContainer
);
