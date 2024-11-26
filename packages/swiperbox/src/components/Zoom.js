export function Zoom(dialog, config) {
    const zoomIn = document.createElement("button");
    const zoomOut = document.createElement("button");
    
    zoomIn.innerHTML = config.icons.zoomIn;
    zoomOut.innerHTML = config.icons.zoomOut;
    zoomOut.disabled = true;

    const swiper = dialog.querySelector(".swiperbox__swiper_main").swiper;

    zoomIn.addEventListener("click", () => {
        swiper.zoom.in(swiper.zoom.scale + 0.5);
    });

    zoomOut.addEventListener("click", () => {
        swiper.zoom.out();
    });

    swiper.on("zoomChange", (swiper, scale) => {
        if (scale === 1) {
            zoomOut.disabled = true;
        } else {
            zoomOut.disabled = false;
        }
    });

    dialog.querySelector(".swiperbox__buttons").appendChild(zoomIn);
    dialog.querySelector(".swiperbox__buttons").appendChild(zoomOut);
}