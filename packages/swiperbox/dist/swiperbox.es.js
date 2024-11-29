import c from "swiper";
const p = {
  index: 0,
  swiper: {
    loop: !1,
    centeredSlides: !0
  },
  icons: {
    close: '<i class="fa-solid fa-xmark fa-2xl"></i>',
    next: '<i class="fa-solid fa-chevron-right"></i>',
    prev: '<i class="fa-solid fa-chevron-left"></i>',
    zoomIn: '<i class="fa-solid fa-search-plus fa-xl"></i>',
    zoomOut: '<i class="fa-solid fa-search-minus fa-xl"></i>',
    play: '<i class="fa-solid fa-play fa-xl"></i>',
    thumbsToggle: '<i class="fa-solid fa-th fa-xl"></i>'
  },
  items: []
};
function u() {
  const e = document.createElement("dialog");
  return e.open = !0, e.addEventListener("close", () => {
    document.body.removeChild(e);
  }), document.addEventListener("keydown", (t) => {
    t.key === "Escape" && e.close();
  }), e;
}
function m(e) {
  try {
    const t = new URL(e);
    if (t.hostname === "www.youtube.com" || t.hostname === "youtube.com") {
      const s = t.searchParams.get("v");
      if (s)
        return `https://www.youtube.com/embed/${s}`;
    } else {
      if (t.hostname === "youtu.be")
        return `https://www.youtube.com/embed/${t.pathname.slice(1)}`;
      if (t.hostname === "vimeo.com")
        return `https://player.vimeo.com/video/${t.pathname.slice(1)}`;
    }
  } catch (t) {
    console.error("Invalid URL:", t.message);
  }
  return e;
}
function b(e, t) {
  const s = document.createElement("div");
  s.classList.add("swiper"), s.classList.add("swiperbox__swiper_main"), s.innerHTML = `
    <div class="swiper-wrapper"></div>
	`;
  const o = s.querySelector(".swiper-wrapper");
  t.items.forEach((r) => {
    const i = document.createElement("div");
    i.classList.add("swiper-slide"), r.iframe ? i.innerHTML = `
        <div class="swiperbox-iframe-container">
          <iframe src="${m(r.iframe)}" frameborder="0" allowfullscreen></iframe>
        </div>
      ` : i.innerHTML = `
        <div class="swiper-zoom-container">
          <img src="${r.image}" alt="${r == null ? void 0 : r.alt}" loading="lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `, o.appendChild(i);
  }), new c(s, {
    ...t.swiper,
    // modules: [Navigation, Pagination, Zoom, Thumbs, Keyboard],
    initialSlide: t.index,
    zoom: {
      maxRatio: 1.5,
      toggle: !0
    },
    pagination: {
      type: "fraction",
      el: e.querySelector(".swiperbox__pagination")
    },
    keyboard: {
      enabled: !0
    },
    thumbs: {
      swiper: e.querySelector(".swiperbox__swiper_thumbs")
    }
  }), e.querySelector(".swiperbox__wrapper").appendChild(s);
}
function w(e, t) {
  if (t.items.length <= 1) return;
  const s = document.createElement("div");
  s.classList.add("swiper"), s.classList.add("swiperbox__swiper_thumbs"), s.innerHTML = `
		<div class="swiper-wrapper"></div>
		<button class="swiperbox-button-prev">${t.icons.prev}</button>
		<button class="swiperbox-button-next">${t.icons.next}</button>
	`;
  const o = s.querySelector(".swiper-wrapper");
  t.items.forEach((i) => {
    const n = document.createElement("div");
    n.classList.add("swiper-slide"), n.innerHTML = `<img src="${i.thumb}" alt="${i == null ? void 0 : i.alt}">`, o.appendChild(n), i.video && (n.innerHTML = `
        <img src="${i.thumb}" alt="${i == null ? void 0 : i.alt}">
        <div class="swiperbox-thumb-play-icon">${t.icons.play}</div>
      `);
  }), new Swiper(s, {
    // modules: [Navigation],
    initialSlide: t.index,
    slidesPerView: "auto",
    centerInsufficientSlides: !0,
    spaceBetween: 20,
    initialSlide: 0,
    navigation: {
      nextEl: s.querySelector(".swiperbox-button-next"),
      prevEl: s.querySelector(".swiperbox-button-prev")
    }
  });
  const r = e.querySelector(".swiperbox__thumbs");
  r.appendChild(s), r.classList.remove("hidden");
}
function f(e, t) {
  if (t.items.length <= 1) return;
  const s = e.querySelector(".swiperbox__thumbs"), o = document.createElement("button");
  o.innerHTML = t.icons.thumbsToggle, o.addEventListener("click", () => {
    s.classList.toggle("hidden");
  }), e.querySelector(".swiperbox__buttons").appendChild(o);
}
function v(e, t) {
  const s = document.createElement("button");
  s.innerHTML = t.icons.close, s.addEventListener("click", () => {
    e.close();
  }), e.querySelector(".swiperbox__buttons").appendChild(s);
}
function h(e, t) {
  e.classList.add("swiperbox"), e.classList.add("swiperbox__dialog"), e.innerHTML = `
		<div class="swiperbox__container">
			<div class="swiperbox__wrapper"></div>
			<div class="swiperbox__thumbs hidden"></div>
			<div class="swiperbox__pagination"></div>
			<div class="swiperbox__buttons"></div>
		</div>
	`;
}
function x(e, t) {
  const s = document.createElement("button"), o = document.createElement("button");
  s.innerHTML = t.icons.zoomIn, o.innerHTML = t.icons.zoomOut, o.disabled = !0;
  const r = e.querySelector(".swiperbox__swiper_main").swiper;
  s.addEventListener("click", () => {
    r.zoom.in(r.zoom.scale + 0.5);
  }), o.addEventListener("click", () => {
    r.zoom.out();
  }), r.on("zoomChange", (i, n) => {
    n === 1 ? o.disabled = !0 : o.disabled = !1;
  }), e.querySelector(".swiperbox__buttons").appendChild(s), e.querySelector(".swiperbox__buttons").appendChild(o);
}
function d(e) {
  if (e = { ...p, ...e }, !Array.isArray(e.items) || e.items.length === 0)
    throw new Error("Invalid items");
  e.items.forEach((s) => {
    if (typeof s != "object" || !s.image && !s.iframe)
      throw new Error("Invalid item. Must be an object with image or iframe");
  });
  const t = u();
  h(t), w(t, e), f(t, e), b(t, e), x(t, e), v(t, e), document.body.appendChild(t);
}
function l(e, t = {}) {
  var s = [];
  const o = (r, i = 0) => {
    r.preventDefault(), d({ ...t, items: s, index: i });
  };
  e instanceof HTMLElement ? s = [a(e, o)] : typeof e === NodeList || Array.isArray(e) ? s = Array.from(e).map((r, i) => a(r, (n) => o(n, i))) : typeof e == "string" && (s = Array.from(document.querySelectorAll(e)).map((r, i) => a(r, (n) => o(n, i)))), s.length === 0 && console.error("No items found");
}
function a(e, t) {
  return e.addEventListener("click", t), {
    thumb: e.dataset.thumb,
    image: e.dataset.image,
    iframe: e.dataset.iframe || e.dataset.video,
    video: !!e.dataset.video
  };
}
const y = {
  bind: l,
  open: d
};
document.addEventListener("DOMContentLoaded", () => {
  const e = {};
  document.querySelectorAll("[data-swiperbox]").forEach((t) => {
    const s = t.dataset.swiperbox;
    e[s] || (e[s] = []), e[s].push(t);
  });
  for (const t in e)
    l(e[t]);
});
export {
  y as default
};
