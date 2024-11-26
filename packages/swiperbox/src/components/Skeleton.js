export function Skeleton(dialog, config) {
	dialog.classList.add("swiperbox");
	dialog.classList.add("swiperbox__dialog");
	dialog.innerHTML = `
		<div class="swiperbox__container">
			<div class="swiperbox__wrapper"></div>
			<div class="swiperbox__thumbs hidden"></div>
			<div class="swiperbox__pagination"></div>
			<div class="swiperbox__buttons"></div>
		</div>
	`;
}
