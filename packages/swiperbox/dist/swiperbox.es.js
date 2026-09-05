//#region src/core/config.js
var e = {
	index: 0,
	swiper: {
		loop: !1,
		centeredSlides: !0
	},
	icons: {
		close: "<i class=\"fa-solid fa-xmark fa-2xl\"></i>",
		next: "<i class=\"fa-solid fa-chevron-right\"></i>",
		prev: "<i class=\"fa-solid fa-chevron-left\"></i>",
		zoomIn: "<i class=\"fa-solid fa-search-plus fa-xl\"></i>",
		zoomOut: "<i class=\"fa-solid fa-search-minus fa-xl\"></i>",
		play: "<i class=\"fa-solid fa-play fa-xl\"></i>",
		thumbsToggle: "<i class=\"fa-solid fa-th fa-xl\"></i>"
	},
	items: []
};
//#endregion
//#region src/core/dialog.js
function t() {
	let e = document.createElement("dialog");
	return e.open = !0, document.body.classList.add("swiperbox-open"), e.addEventListener("close", () => {
		document.body.removeChild(e), document.body.classList.remove("swiperbox-open");
	}), document.addEventListener("keydown", (t) => {
		t.key === "Escape" && e.close();
	}), e;
}
//#endregion
//#region src/utils/convertToEmbedUrl.js
function n(e) {
	try {
		let t = new URL(e);
		if (t.hostname === "www.youtube.com" || t.hostname === "youtube.com") {
			let e = t.searchParams.get("v");
			if (e) return `https://www.youtube.com/embed/${e}`;
		} else if (t.hostname === "youtu.be") return `https://www.youtube.com/embed/${t.pathname.slice(1)}`;
		else if (t.hostname === "vimeo.com") return `https://player.vimeo.com/video/${t.pathname.slice(1)}`;
	} catch (e) {
		console.error("Invalid URL:", e.message);
	}
	return e;
}
//#endregion
//#region src/components/Gallery.js
function r(e, t) {
	let r = document.createElement("div");
	r.classList.add("swiper"), r.classList.add("swiperbox__swiper_main"), r.innerHTML = "\n    <div class=\"swiper-wrapper\"></div>\n	";
	let i = r.querySelector(".swiper-wrapper");
	t.items.forEach((e) => {
		let t = document.createElement("div");
		t.classList.add("swiper-slide"), t.innerHTML = e.iframe ? `
        <div class="swiperbox-iframe-container">
          <iframe src="${n(e.iframe)}" allowfullscreen></iframe>
        </div>
      ` : `
        <div class="swiper-zoom-container">
          <img src="${e.image}" alt="${e?.alt}" loading="lazy">
        </div>
      `, i.appendChild(t);
	}), new Swiper(r, {
		...t.swiper,
		initialSlide: t.index,
		preloadImages: !1,
		zoom: {
			maxRatio: 2,
			toggle: !0
		},
		pagination: {
			type: "fraction",
			el: e.querySelector(".swiperbox__pagination")
		},
		keyboard: { enabled: !0 },
		thumbs: { swiper: e.querySelector(".swiperbox__swiper_thumbs").swiper }
	}), e.querySelector(".swiperbox__wrapper").appendChild(r);
}
//#endregion
//#region src/components/Thumbs.js
function i(e, t) {
	if (t.items.length <= 1) return;
	let n = document.createElement("div");
	n.classList.add("swiper"), n.classList.add("swiperbox__swiper_thumbs"), n.innerHTML = `
		<div class="swiper-wrapper"></div>
		<button class="swiperbox-button-prev">${t.icons.prev}</button>
		<button class="swiperbox-button-next">${t.icons.next}</button>
	`;
	let r = n.querySelector(".swiper-wrapper");
	t.items.forEach((e) => {
		let n = document.createElement("div");
		n.classList.add("swiper-slide"), n.innerHTML = e.thumb ? `<img src="${e.thumb}" alt="${e?.alt}">` : `<img src="${e.image}" alt="${e?.alt}">`, r.appendChild(n), e.video && e.thumb && (n.innerHTML = `
        <img src="${e.thumb}" alt="${e?.alt}">
        <div class="swiperbox-thumb-play-icon">${t.icons.play}</div>
      `), e.video && !e.thumb && (n.innerHTML = `
        <div class="swiperbox-thumb-custom"></div>
        <div class="swiperbox-thumb-play-icon">${t.icons.play}</div>
      `);
	}), new Swiper(n, {
		initialSlide: t.index,
		slidesPerView: "auto",
		centerInsufficientSlides: !0,
		spaceBetween: 20,
		navigation: {
			nextEl: n.querySelector(".swiperbox-button-next"),
			prevEl: n.querySelector(".swiperbox-button-prev")
		}
	});
	let i = e.querySelector(".swiperbox__thumbs");
	i.appendChild(n), i.classList.remove("hidden");
}
//#endregion
//#region src/components/ThumbsToggle.js
function a(e, t) {
	if (t.items.length <= 1) return;
	let n = e.querySelector(".swiperbox__thumbs"), r = document.createElement("button");
	r.innerHTML = t.icons.thumbsToggle, r.addEventListener("click", () => {
		n.classList.toggle("hidden");
	}), e.querySelector(".swiperbox__buttons").appendChild(r);
}
//#endregion
//#region src/components/Close.js
function o(e, t) {
	let n = document.createElement("button");
	n.innerHTML = t.icons.close, n.addEventListener("click", () => {
		e.close();
	}), e.querySelector(".swiperbox__buttons").appendChild(n);
}
//#endregion
//#region src/components/Skeleton.js
function s(e, t) {
	e.classList.add("swiperbox"), e.classList.add("swiperbox__dialog"), e.innerHTML = "\n		<div class=\"swiperbox__container\">\n			<div class=\"swiperbox__wrapper\"></div>\n			<div class=\"swiperbox__thumbs hidden\"></div>\n			<div class=\"swiperbox__pagination\"></div>\n			<div class=\"swiperbox__buttons\"></div>\n		</div>\n	";
}
//#endregion
//#region src/components/Zoom.js
function c(e, t) {
	let n = document.createElement("button"), r = document.createElement("button");
	n.innerHTML = t.icons.zoomIn, r.innerHTML = t.icons.zoomOut, r.disabled = !0;
	let i = e.querySelector(".swiperbox__swiper_main").swiper;
	n.addEventListener("click", () => {
		i.zoom.in(i.zoom.scale + .5);
	}), r.addEventListener("click", () => {
		i.zoom.out();
	}), i.on("zoomChange", (e, t) => {
		t === 1 ? r.disabled = !0 : r.disabled = !1;
	}), e.querySelector(".swiperbox__buttons").appendChild(n), e.querySelector(".swiperbox__buttons").appendChild(r);
}
//#endregion
//#region src/core/open.js
function l(n) {
	if (n = {
		...e,
		...n
	}, !Array.isArray(n.items) || n.items.length === 0) throw Error("Invalid items");
	n.items.forEach((e) => {
		if (typeof e != "object" || !e.image && !e.iframe) throw Error("Invalid item. Must be an object with image or iframe");
	});
	let l = t();
	s(l, n), i(l, n), a(l, n), r(l, n), c(l, n), o(l, n), document.body.appendChild(l);
}
//#endregion
//#region src/core/bind.js
function u(e, t = {}) {
	var n = [];
	let r = (e, r = 0) => {
		e.preventDefault(), l({
			...t,
			items: n,
			index: r
		});
	};
	e instanceof HTMLElement ? n = [d(e, r)] : typeof e === NodeList || Array.isArray(e) ? n = Array.from(e).map((e, t) => d(e, (e) => r(e, t))) : typeof e == "string" && (n = Array.from(document.querySelectorAll(e)).map((e, t) => d(e, (e) => r(e, t)))), n.length === 0 && console.error("No items found");
}
function d(e, t) {
	return e.addEventListener("click", t), {
		thumb: e.dataset.thumb,
		image: e.dataset.image,
		iframe: e.dataset.iframe || e.dataset.video,
		video: !!e.dataset.video
	};
}
//#endregion
//#region src/Swiperbox.js
var f = {
	bind: u,
	open: l
};
//#endregion
//#region src/init.js
document.addEventListener("DOMContentLoaded", () => {
	let e = {};
	document.querySelectorAll("[data-swiperbox]").forEach((t) => {
		let n = t.dataset.swiperbox;
		e[n] || (e[n] = []), e[n].push(t);
	});
	for (let t in e) u(e[t]);
});
//#endregion
export { f as default };
