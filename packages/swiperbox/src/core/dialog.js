export function Dialog() {
    const dialog = document.createElement("dialog");
    dialog.open = true;

    dialog.addEventListener("close", () => {
        document.body.removeChild(dialog);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dialog.close();
        }
    });

    return dialog;
}