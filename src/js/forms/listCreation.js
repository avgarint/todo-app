class ListCreationForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.initElements();
        this.bindEventListeners();
    }

    initElements() {
        this.createNewListButton = document.getElementById('create-new-list-button');
        this.listNameInput = document.getElementById('list-name-input');
        this.confirmCreationButton = document.getElementById('list-form-confirm-creation');
        this.closeButton = document.getElementById('close-list-creation-form-button');
    }

    bindEventListeners() {
        this.createNewListButton?.addEventListener('click', () => this.show());
        this.closeButton?.addEventListener('click', () => this.hide());
        this.listNameInput?.addEventListener('input', () => this.validateListName());
        this.confirmCreationButton?.addEventListener('click', () => this.handleListCreation());
    }

    show() {
        super.show({ blur: true });
        this.listNameInput?.focus();
        this.resetForm();
    }

    validateListName() {
        const listName = this.listNameInput?.value.trim();
        const isDuplicate = lists.some(list => list.name.toLowerCase() === listName.toLowerCase());

        if (isDuplicate || !listName) {
            this.listNameInput?.classList.add('detected-list');
            this.confirmCreationButton?.classList.add('hidden');
            alert(isDuplicate ? 'List name already exists.' : 'List name cannot be empty.');
        } else {
            this.listNameInput?.classList.remove('detected-list');
            this.confirmCreationButton?.classList.remove('hidden');
        }
    }

    handleListCreation() {
        const newListName = this.listNameInput?.value.trim();
        
        if (!newListName) {
            alert('Please enter a valid list name.');
            return;
        }

        const list = new List(newListName);
        lists.push(list);
        list.saveInLocalStorage();
        this.hide();
    }

    resetForm() {
        this.listNameInput.value = '';
        this.listNameInput.classList.remove('detected-list');
        this.confirmCreationButton.classList.add('hidden');
    }
}

const listCreationFormDOM = document.getElementById('list-creation-form');
const listCreationForm = new ListCreationForm(listCreationFormDOM, document.getElementById('list-container'));
