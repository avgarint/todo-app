class SettingsForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.initElements();
        this.bindEventListeners();
        this.loadUserPreferences();
    }

    initElements() {
        this.settingsButton = document.getElementById(
            "application-settings-button"
        );
        this.colorPicker = document.getElementById("color-picker");
        this.colorPalette = document.getElementById("board-bg-color-palette");
        this.colors = this.colorPalette?.querySelectorAll("div");
    }

    bindEventListeners() {
        this.settingsButton?.addEventListener("click", () => this.toggle());

        this.colorPicker?.addEventListener("input", () => {
            this.setBackgroundColor(this.colorPicker.value);
            this.saveUserPreferences(this.colorPicker.value);
        });

        this.colors?.forEach((color) => {
            color.addEventListener("click", () => {
                const selectedColor = getComputedStyle(color).backgroundColor;
                this.setBackgroundColor(selectedColor);
                this.saveUserPreferences(selectedColor);
            });
        });
    }

    toggle() {
        super.toggle({ blur: true });
    }

    setBackgroundColor(color) {
        if (color) {
            document.body.style.backgroundColor = color;
        }
    }

    saveUserPreferences(color) {
        localStorage.setItem("app-background-color", color);
    }

    loadUserPreferences() {
        const savedColor = localStorage.getItem("app-background-color");
        if (savedColor) {
            this.setBackgroundColor(savedColor);
        }
    }
}

const settingsFormDom = document.getElementById("settings-form");
const settingsForm = new SettingsForm(
    settingsFormDom,
    document.getElementById("list-container")
);
