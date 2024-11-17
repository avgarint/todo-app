class Form {
    constructor(domParent, listContainer) {
        this.dom = domParent;
        this.listContainer = listContainer;
        this.isVisible = false;
    }

    show({ blur = false } = {}) {
        if (!this.isVisible) {
            this.dom.classList.remove('hidden');
            if (blur) this.listContainer?.classList.add('blurred');
            this.isVisible = true;
        }
    }

    hide() {
        if (this.isVisible) {
            this.dom.classList.add('hidden');
            this.listContainer?.classList.remove('blurred');
            this.isVisible = false;
        }
    }

    toggle({ blur = false } = {}) {
        this.isVisible ? this.hide() : this.show({ blur });
    }
}
