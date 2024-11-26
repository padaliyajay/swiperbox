import Swiper from 'swiper';
import { Navigation, Pagination, Zoom, Thumbs, Keyboard } from "swiper/modules";
import { convertToEmbedUrl } from "../utils/convertToEmbedUrl";

export function Gallery(dialog, config) {
  const swiper = document.createElement("div");
  swiper.classList.add("swiper");
  swiper.classList.add("swiperbox__swiper_main");

  swiper.innerHTML = `
    <div class="swiper-wrapper"></div>
	`;

  const swiper_wrapper = swiper.querySelector(".swiper-wrapper");

  config.items.forEach((item) => {
    const slide = document.createElement("div");

    slide.classList.add("swiper-slide");

    if (item.iframe) {
      slide.innerHTML = `
        <div class="swiperbox-iframe-container">
          <iframe src="${convertToEmbedUrl(item.iframe)}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
    } else {
      slide.innerHTML = `
        <div class="swiper-zoom-container">
          <img src="${item.image}" alt="${item?.alt}" loading="lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `;
    }

    swiper_wrapper.appendChild(slide);
  });

  new Swiper(swiper, {
    ...config.swiper,
    modules: [Navigation, Pagination, Zoom, Thumbs, Keyboard],
    initialSlide: config.index,
    zoom: {
      maxRatio: 1.5,
      toggle: true,
    },
    pagination: {
      type: "fraction",
      el: dialog.querySelector(".swiperbox__pagination"),
    },
    keyboard: {
      enabled: true,
    },
    thumbs: {
			swiper: dialog.querySelector(".swiperbox__swiper_thumbs"),
		},
  });

  dialog.querySelector(".swiperbox__wrapper").appendChild(swiper);
}
