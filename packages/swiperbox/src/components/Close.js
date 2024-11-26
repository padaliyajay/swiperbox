export function Close(dialog, config) {
    const button = document.createElement("button");
    button.innerHTML = config.icons.close;
    button.addEventListener("click", () => {
        dialog.close();
    });

    dialog.querySelector(".swiperbox__buttons").appendChild(button);
}