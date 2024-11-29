export function Dialog() {
    const dialog = document.createElement("dialog");
    dialog.open = true;
    document.body.classList.add("swiperbox-open");

    dialog.addEventListener("close", () => {
        document.body.removeChild(dialog);
        document.body.classList.remove("swiperbox-open");
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dialog.close();
        }
    });

    return dialog;
}