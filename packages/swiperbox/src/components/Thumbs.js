export function Thumbs(dialog, config) {
  if (config.items.length <= 1) return;

  const thumbs = document.createElement("div");
  thumbs.classList.add("swiper");
  thumbs.classList.add("swiperbox__swiper_thumbs");
  thumbs.innerHTML = `
		<div class="swiper-wrapper"></div>
		<button class="swiperbox-button-prev">${config.icons.prev}</button>
		<button class="swiperbox-button-next">${config.icons.next}</button>
	`;

  const swiper_wrapper = thumbs.querySelector(".swiper-wrapper");

  config.items.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `<img src="${item.thumb}" alt="${item?.alt}">`;
    swiper_wrapper.appendChild(slide);

    if (item.video) {
      slide.innerHTML = `
        <img src="${item.thumb}" alt="${item?.alt}">
        <div class="swiperbox-thumb-play-icon">${config.icons.play}</div>
      `;
    }
  });

  new Swiper(thumbs, {
    initialSlide: config.index,
    slidesPerView: "auto",
		centerInsufficientSlides: true,
    spaceBetween: 20,
		initialSlide: 0,
    navigation: {
      nextEl: thumbs.querySelector(".swiperbox-button-next"),
      prevEl: thumbs.querySelector(".swiperbox-button-prev"),
    },
  });

  const swiperbox__thumbs = dialog.querySelector(".swiperbox__thumbs");
  swiperbox__thumbs.appendChild(thumbs);
  swiperbox__thumbs.classList.remove("hidden");
}
