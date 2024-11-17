class Task {
    constructor(name, date, content, done = false) {
        this.name = name;
        this.date = date;
        this.content = content;
        this.done = done;
        
        this.taskElement = null;
    }

    createDOM(list) {
        const holder = document.createElement('div');
        const nameElem = document.createElement('h2');
        const dateElem = document.createElement('h3');
        const contentElem = document.createElement('h3');
        const deleteButton = document.createElement('input');
        const toggleCheckbox = document.createElement('input');

        // Set up elements
        holder.className = 'task';
        nameElem.className = 'task-name';
        dateElem.className = 'task-date';
        contentElem.className = 'task-content';
        deleteButton.className = 'task-delete-button';
        toggleCheckbox.className = 'task-toggle-status';

        deleteButton.type = 'image';
        deleteButton.src = '../images/close.svg';
        deleteButton.alt = 'Delete task';
        toggleCheckbox.type = 'checkbox';
        toggleCheckbox.alt = 'Toggle task status';
        toggleCheckbox.checked = this.done;

        nameElem.textContent = this.name;
        dateElem.textContent = this.date;
        contentElem.textContent = this.content;

        // Apply "done" styling if needed
        if (this.done) holder.classList.add('task-done');

        // Attach event listeners
        holder.addEventListener('click', (event) => {
            if (event.target.tagName !== 'INPUT') {
                taskEditionForm.show(list, this);
            }
        });

        toggleCheckbox.addEventListener('change', () => {
            this.done = toggleCheckbox.checked;
            holder.classList.toggle('task-done', this.done);
            list.saveInLocalStorage();
        });

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the task edition form
            list.removeTask(this);
            list.saveInLocalStorage();
        });

        // Assemble task DOM
        holder.append(nameElem, dateElem, contentElem, deleteButton, toggleCheckbox);

        // Store reference and return
        this.taskElement = holder;
        return this.taskElement;
    }

    updateDOM() {
        if (this.taskElement) {
            this.taskElement.querySelector('.task-name').textContent = this.name;
            this.taskElement.querySelector('.task-date').textContent = this.date;
            this.taskElement.querySelector('.task-content').textContent = this.content;
            const checkbox = this.taskElement.querySelector('.task-toggle-status');
            checkbox.checked = this.done;
            this.taskElement.classList.toggle('task-done', this.done);
        }
    }
}
