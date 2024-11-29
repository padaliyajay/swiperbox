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
          <img data-src="${item.image}" alt="${item?.alt}" class="swiper-lazy" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `;
    }

    swiper_wrapper.appendChild(slide);
  });

  new Swiper(swiper, {
    ...config.swiper,
    initialSlide: config.index,
    preloadImages: false,
    lazy: true,
    zoom: {
      maxRatio: 2,
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
			swiper: dialog.querySelector(".swiperbox__swiper_thumbs").swiper,
		},
  });

  dialog.querySelector(".swiperbox__wrapper").appendChild(swiper);
}
