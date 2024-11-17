class List {
    constructor(name) {
        this.name = name;

        this.tasks = [];
        this.tasksDOM = [];

        this.orderingTasksByDueDate = false;

        this.filteringState = "none";

        this.initDOM();
        this.loadFromLocalStorage();
        this.bindEventListeners();
        this.render();
    }

    initDOM() {
        this.listContainer = document.getElementsByTagName("main")[0];

        this.parent = document.createElement("div");
        this.header = document.createElement("div");
        this.headerName = document.createElement("h2");
        this.buttonHolder = document.createElement("div");
        this.deleteButton = document.createElement("input");
        this.saveAsCSVButton = document.createElement("input");
        this.loadCSVButton = document.createElement("input");
        this.filterButton = document.createElement("input");
        this.addNewTaskButton = document.createElement("input");
        this.orderByDueDateButton = document.createElement("input");

        this.headerName.contentEditable = true;
        this.headerName.spellcheck = false;

        this.parent.className = "list";
        this.header.className = "list-header";
        this.headerName.className = "list-header-name";
        this.buttonHolder.className = "list-header-buttons-holder";
        this.deleteButton.className = "list-header-delete-button";
        this.saveAsCSVButton.className = "list-header-save-as-csv-button";
        this.loadCSVButton.className = "list-header-load-as-csv-button";
        this.filterButton.className = "list-header-filter-button";
        this.addNewTaskButton.className = "list-header-new-task-button";
        this.orderByDueDateButton.className = "list-header-order-by-due-date-button";

        this.deleteButton.type = "image";
        this.saveAsCSVButton.type = "image";
        this.loadCSVButton.type = "image";
        this.filterButton.type = "image";
        this.addNewTaskButton.type = "image";
        this.filterButton.type = "image";
        this.orderByDueDateButton.type = "image";

        this.deleteButton.alt = "Delete list button";
        this.saveAsCSVButton.alt = "Save list as CSV button";
        this.loadCSVButton.alt = "Load list as CSV button";
        this.filterButton.alt = "Filter tasks";
        this.addNewTaskButton.alt = "Add new task";
        this.orderByDueDateButton.alt = "Filter by due date";

        this.deleteButton.src = "../images/close.svg";
        this.saveAsCSVButton.src = "../images/download.svg";
        this.loadCSVButton.src = "../images/upload.svg";
        this.filterButton.src = "../images/filter.svg";
        this.addNewTaskButton.src = "../images/add.svg";
        this.orderByDueDateButton.src = "../images/calendar.svg";

        this.headerName.innerHTML = this.name;

        this.header.appendChild(this.headerName);
        this.buttonHolder.appendChild(this.deleteButton);
        this.buttonHolder.appendChild(this.saveAsCSVButton);
        this.buttonHolder.appendChild(this.loadCSVButton);
        this.buttonHolder.appendChild(this.filterButton);
        this.buttonHolder.appendChild(this.addNewTaskButton);
        this.buttonHolder.appendChild(this.orderByDueDateButton);
        this.header.appendChild(this.buttonHolder);
        this.parent.appendChild(this.header);
        this.listContainer.appendChild(this.parent);
    }

    bindEventListeners() {
        this.deleteButton.addEventListener("click", () => this.delete());
        this.saveAsCSVButton.addEventListener("click", () => this.saveAsCSV());
        this.loadCSVButton.addEventListener("click", () => csvImportForm.show(this));
        this.filterButton.addEventListener("click", () => this.toggleTaskFiltering());
        this.addNewTaskButton.addEventListener("click", () => taskCreationForm.show(this));
        this.orderByDueDateButton.addEventListener("click", () => this.orderByDueDate());
    }

    render() {
        this.clearTaskDOM();

        this.tasks.forEach((task, index) => {
            if (
                (this.filteringState === "doneonly" && task.done) ||
                (this.filteringState === "undoneonly" && !task.done) ||
                this.filteringState === "none"
            ) {
                this.renderTask(task, index);
            }
        });
    }

    clearTaskDOM() {
        this.tasksDOM.forEach((taskDom) => {
            this.parent.removeChild(taskDom);
        });

        this.tasksDOM = [];
    }

    renderTask(task, index) {
        const holder = document.createElement("div");
        const name = document.createElement("h2");
        const date = document.createElement("h3");
        const content = document.createElement("h3");
        const deleteButton = document.createElement("input");
        const toggleCheckbox = document.createElement("input");

        holder.addEventListener("click", (event) => {
            // Make sure we're not clicking on the done checkbox or the
            // delete button
            if (event.target.tagName !== "INPUT") {
                taskEditionForm.show(this, task);
            }
        });

        toggleCheckbox.addEventListener("change", () => {
            task.done = toggleCheckbox.checked;
            task.done
                ? holder.classList.add("task-done")
                : holder.classList.remove("task-done");
            this.saveInLocalStorage();
        });

        deleteButton.addEventListener("click", () => {
            this.removeTask(index);
            this.saveInLocalStorage();
        });

        holder.className = "task";
        name.className = "task-name";
        date.className = "task-date";
        content.className = "task-content";
        deleteButton.className = "task-delete-button";
        toggleCheckbox.className = "task-toggle-status";

        deleteButton.type = "image";
        deleteButton.alt = "Delete task";
        deleteButton.src = "../images/close.svg";

        toggleCheckbox.type = "checkbox";
        toggleCheckbox.alt = "Toggle task status";

        name.innerHTML = task.name;
        date.innerHTML = task.date;
        content.innerHTML = task.content;

        holder.draggable = true;

        holder.appendChild(name);
        holder.appendChild(date);
        holder.appendChild(content);
        holder.appendChild(deleteButton);
        holder.appendChild(toggleCheckbox);
        this.parent.appendChild(holder);

        this.tasksDOM.push(holder);

        if (task.done) {
            toggleCheckbox.checked = true;
            holder.classList.add("task-done");
        }
    }

    addTask(name, date, content, done) {
        const task = new Task(name, date, content, done);
        this.tasks.push(task);

        this.saveInLocalStorage();
        this.render();
    }

    removeTask(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks.splice(taskIndex, 1);

            const removedTaskDom = this.tasksDOM.splice(taskIndex, 1)[0];

            if (removedTaskDom) {
                this.parent.removeChild(removedTaskDom);
            }

            this.saveInLocalStorage();
            this.render();
        } else {
            throw new Error(`Invalid task index ${taskIndex}.`);
        }
    }

    delete() {
        this.tasks = [];
        this.tasksDOM = [];
        this.parent.remove();
        localStorage.removeItem(`todo-app-tasks-${this.name}`);
    }

    orderByDueDate() {
        const className = "list-header-button-active";
        this.orderingTasksByDueDate = !this.orderingTasksByDueDate;

        if (this.orderingTasksByDueDate) {
            this.orderByDueDateButton.classList.add(className);
            this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            this.orderByDueDateButton.classList.remove(className);
            this.loadFromLocalStorage();
        }

        this.render();
    }

    toggleTaskFiltering() {
        const className = "list-header-button-active";

        // Three possible states: 'none', 'doneonly' and 'undoneonly'
        switch (this.filteringState) {
            case "none":
                this.filteringState = "doneonly";
                this.filterButton.classList.add(className);
                break;
            case "doneonly":
                this.filteringState = "undoneonly";
                break;
            case "undoneonly":
                this.filteringState = "none";
                this.filterButton.classList.remove(className);
                break;
            default:
                throw new Error("Invalid filtering state.");
        }

        this.render();
    }

    saveAsCSV() {
        if (!this.tasks || this.tasks.length === 0) {
            alert("No CSV to copy!");
            return;
        }

        let outputString = "name;date;content;done\n";

        this.tasks.forEach((task) => {
            outputString += `${task.name};${task.date};${task.content};${task.done}\n`;
        });

        // Remove last line break
        if (outputString.endsWith("\n")) {
            outputString = outputString.slice(0, -1);
        }

        navigator.clipboard.writeText(outputString);
        alert("Copied CSV to clipboard.");
    }

    loadFromCSV(csvBuffer) {
        const lines = csvBuffer.trim().split("\n");
        if (lines.length === 0) {
            throw new Error("CSV buffer is empty.");
        }

        const header = lines[0].split(";");
        if (header.length !== 4) {
            throw new Error("CSV header is invalid.");
        }

        lines.shift(); // Remove header

        lines.forEach((line) => {
            const subLines = line.split(";");
            const done = subLines[3] === "true";

            // We dispatch the arguments in the correct order
            this.addTask(subLines[0], subLines[1], subLines[2], done);
        });
    }

    saveInLocalStorage() {
        const jsonTasks = JSON.stringify(this.tasks);
        localStorage.setItem(`todo-app-tasks-${this.name}`, jsonTasks);
    }

    loadFromLocalStorage() {
        const jsonTasks = localStorage.getItem(`todo-app-tasks-${this.name}`);
        if (jsonTasks !== null) {
            this.tasks = JSON.parse(jsonTasks);
        }
    }
}
