class TaskEditionForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);

        this.initElements();
        this.bindEventListeners();
    }

    initElements() {
        this.taskName = document.getElementById("task-detail-name");
        this.taskDate = document.getElementById("task-detail-date");
        this.taskContent = document.getElementById("task-detail-content");
        this.saveButton = document.getElementById("save-task-button");
    }

    bindEventListeners() {
        this.saveButton?.addEventListener("click", () => {
            this.saveChanges();
            super.hide();
        });
    }

    show(list, task) {
        super.show(false);

        this.list = list;
        this.task = task;

        this.taskName.innerHTML = this.task.name;
        this.taskDate.innerHTML = this.task.date;
        this.taskContent.value = this.task.content;
    }

    saveChanges() {
        if (this.task && this.list) {
            this.task.name = this.taskName.innerHTML;
            this.task.date = this.taskDate.innerHTML;
            this.task.content = this.taskContent.value;

            this.list.saveInLocalStorage();
            this.list.render();
        } else {
            throw new Error("Trying to save data on a null list or task.");
        }
    }
}

const taskEditionFormDOM = document.getElementById("task-edition-form");
const taskEditionForm = new TaskEditionForm(taskEditionFormDOM, listContainer);
