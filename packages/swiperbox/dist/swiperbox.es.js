const c = {
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
function p() {
  const e = document.createElement("dialog");
  return e.open = !0, e.addEventListener("close", () => {
    document.body.removeChild(e);
  }), document.addEventListener("keydown", (s) => {
    s.key === "Escape" && e.close();
  }), e;
}
function u(e) {
  try {
    const s = new URL(e);
    if (s.hostname === "www.youtube.com" || s.hostname === "youtube.com") {
      const t = s.searchParams.get("v");
      if (t)
        return `https://www.youtube.com/embed/${t}`;
    } else {
      if (s.hostname === "youtu.be")
        return `https://www.youtube.com/embed/${s.pathname.slice(1)}`;
      if (s.hostname === "vimeo.com")
        return `https://player.vimeo.com/video/${s.pathname.slice(1)}`;
    }
  } catch (s) {
    console.error("Invalid URL:", s.message);
  }
  return e;
}
function m(e, s) {
  const t = document.createElement("div");
  t.classList.add("swiper"), t.classList.add("swiperbox__swiper_main"), t.innerHTML = `
    <div class="swiper-wrapper"></div>
	`;
  const o = t.querySelector(".swiper-wrapper");
  s.items.forEach((r) => {
    const i = document.createElement("div");
    i.classList.add("swiper-slide"), r.iframe ? i.innerHTML = `
        <div class="swiperbox-iframe-container">
          <iframe src="${u(r.iframe)}" frameborder="0" allowfullscreen></iframe>
        </div>
      ` : i.innerHTML = `
        <div class="swiper-zoom-container">
          <img data-src="${r.image}" alt="${r == null ? void 0 : r.alt}" class="swiper-lazy" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `, o.appendChild(i);
  }), new Swiper(t, {
    ...s.swiper,
    initialSlide: s.index,
    preloadImages: !1,
    lazy: !0,
    zoom: {
      maxRatio: 2,
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
      swiper: e.querySelector(".swiperbox__swiper_thumbs").swiper
    }
  }), e.querySelector(".swiperbox__wrapper").appendChild(t);
}
function b(e, s) {
  if (s.items.length <= 1) return;
  const t = document.createElement("div");
  t.classList.add("swiper"), t.classList.add("swiperbox__swiper_thumbs"), t.innerHTML = `
		<div class="swiper-wrapper"></div>
		<button class="swiperbox-button-prev">${s.icons.prev}</button>
		<button class="swiperbox-button-next">${s.icons.next}</button>
	`;
  const o = t.querySelector(".swiper-wrapper");
  s.items.forEach((i) => {
    const n = document.createElement("div");
    n.classList.add("swiper-slide"), n.innerHTML = `<img src="${i.thumb}" alt="${i == null ? void 0 : i.alt}">`, o.appendChild(n), i.video && (n.innerHTML = `
        <img src="${i.thumb}" alt="${i == null ? void 0 : i.alt}">
        <div class="swiperbox-thumb-play-icon">${s.icons.play}</div>
      `);
  }), new Swiper(t, {
    initialSlide: s.index,
    slidesPerView: "auto",
    centerInsufficientSlides: !0,
    spaceBetween: 20,
    initialSlide: 0,
    navigation: {
      nextEl: t.querySelector(".swiperbox-button-next"),
      prevEl: t.querySelector(".swiperbox-button-prev")
    }
  });
  const r = e.querySelector(".swiperbox__thumbs");
  r.appendChild(t), r.classList.remove("hidden");
}
function w(e, s) {
  if (s.items.length <= 1) return;
  const t = e.querySelector(".swiperbox__thumbs"), o = document.createElement("button");
  o.innerHTML = s.icons.thumbsToggle, o.addEventListener("click", () => {
    t.classList.toggle("hidden");
  }), e.querySelector(".swiperbox__buttons").appendChild(o);
}
function f(e, s) {
  const t = document.createElement("button");
  t.innerHTML = s.icons.close, t.addEventListener("click", () => {
    e.close();
  }), e.querySelector(".swiperbox__buttons").appendChild(t);
}
function v(e, s) {
  e.classList.add("swiperbox"), e.classList.add("swiperbox__dialog"), e.innerHTML = `
		<div class="swiperbox__container">
			<div class="swiperbox__wrapper"></div>
			<div class="swiperbox__thumbs hidden"></div>
			<div class="swiperbox__pagination"></div>
			<div class="swiperbox__buttons"></div>
		</div>
	`;
}
function h(e, s) {
  const t = document.createElement("button"), o = document.createElement("button");
  t.innerHTML = s.icons.zoomIn, o.innerHTML = s.icons.zoomOut, o.disabled = !0;
  const r = e.querySelector(".swiperbox__swiper_main").swiper;
  t.addEventListener("click", () => {
    r.zoom.in(r.zoom.scale + 0.5);
  }), o.addEventListener("click", () => {
    r.zoom.out();
  }), r.on("zoomChange", (i, n) => {
    n === 1 ? o.disabled = !0 : o.disabled = !1;
  }), e.querySelector(".swiperbox__buttons").appendChild(t), e.querySelector(".swiperbox__buttons").appendChild(o);
}
function d(e) {
  if (e = { ...c, ...e }, !Array.isArray(e.items) || e.items.length === 0)
    throw new Error("Invalid items");
  e.items.forEach((t) => {
    if (typeof t != "object" || !t.image && !t.iframe)
      throw new Error("Invalid item. Must be an object with image or iframe");
  });
  const s = p();
  v(s), b(s, e), w(s, e), m(s, e), h(s, e), f(s, e), document.body.appendChild(s);
}
function l(e, s = {}) {
  var t = [];
  const o = (r, i = 0) => {
    r.preventDefault(), d({ ...s, items: t, index: i });
  };
  e instanceof HTMLElement ? t = [a(e, o)] : typeof e === NodeList || Array.isArray(e) ? t = Array.from(e).map((r, i) => a(r, (n) => o(n, i))) : typeof e == "string" && (t = Array.from(document.querySelectorAll(e)).map((r, i) => a(r, (n) => o(n, i)))), t.length === 0 && console.error("No items found");
}
function a(e, s) {
  return e.addEventListener("click", s), {
    thumb: e.dataset.thumb,
    image: e.dataset.image,
    iframe: e.dataset.iframe || e.dataset.video,
    video: !!e.dataset.video
  };
}
const x = {
  bind: l,
  open: d
};
document.addEventListener("DOMContentLoaded", () => {
  const e = {};
  document.querySelectorAll("[data-swiperbox]").forEach((s) => {
    const t = s.dataset.swiperbox;
    e[t] || (e[t] = []), e[t].push(s);
  });
  for (const s in e)
    l(e[s]);
});
export {
  x as default
};
