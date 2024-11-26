export function ThumbsToggle(dialog, config) {
    if (config.items.length <= 1) return;
    
    const swiperbox__thumbs = dialog.querySelector(".swiperbox__thumbs");

    const button = document.createElement("button");
    button.innerHTML = config.icons.thumbsToggle;
    button.addEventListener("click", () => {
        swiperbox__thumbs.classList.toggle("hidden");
    });

    dialog.querySelector(".swiperbox__buttons").appendChild(button);
}