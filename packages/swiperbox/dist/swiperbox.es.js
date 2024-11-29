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
  return e.open = !0, document.body.classList.add("swiperbox-open"), e.addEventListener("close", () => {
    document.body.removeChild(e), document.body.classList.remove("swiperbox-open");
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
function b(e, s) {
  const t = document.createElement("div");
  t.classList.add("swiper"), t.classList.add("swiperbox__swiper_main"), t.innerHTML = `
    <div class="swiper-wrapper"></div>
	`;
  const r = t.querySelector(".swiper-wrapper");
  s.items.forEach((o) => {
    const i = document.createElement("div");
    i.classList.add("swiper-slide"), o.iframe ? i.innerHTML = `
        <div class="swiperbox-iframe-container">
          <iframe src="${u(o.iframe)}" frameborder="0" allowfullscreen></iframe>
        </div>
      ` : i.innerHTML = `
        <div class="swiper-zoom-container">
          <img data-src="${o.image}" alt="${o == null ? void 0 : o.alt}" class="swiper-lazy" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">
          <div class="swiper-lazy-preloader"></div>
        </div>
      `, r.appendChild(i);
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
function m(e, s) {
  if (s.items.length <= 1) return;
  const t = document.createElement("div");
  t.classList.add("swiper"), t.classList.add("swiperbox__swiper_thumbs"), t.innerHTML = `
		<div class="swiper-wrapper"></div>
		<button class="swiperbox-button-prev">${s.icons.prev}</button>
		<button class="swiperbox-button-next">${s.icons.next}</button>
	`;
  const r = t.querySelector(".swiper-wrapper");
  s.items.forEach((i) => {
    const n = document.createElement("div");
    n.classList.add("swiper-slide"), i.thumb ? n.innerHTML = `<img src="${i.thumb}" alt="${i == null ? void 0 : i.alt}">` : n.innerHTML = `<img src="${i.image}" alt="${i == null ? void 0 : i.alt}">`, r.appendChild(n), i.video && i.thumb && (n.innerHTML = `
        <img src="${i.thumb}" alt="${i == null ? void 0 : i.alt}">
        <div class="swiperbox-thumb-play-icon">${s.icons.play}</div>
      `), i.video && !i.thumb && (n.innerHTML = `
        <div class="swiperbox-thumb-custom"></div>
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
  const o = e.querySelector(".swiperbox__thumbs");
  o.appendChild(t), o.classList.remove("hidden");
}
function w(e, s) {
  if (s.items.length <= 1) return;
  const t = e.querySelector(".swiperbox__thumbs"), r = document.createElement("button");
  r.innerHTML = s.icons.thumbsToggle, r.addEventListener("click", () => {
    t.classList.toggle("hidden");
  }), e.querySelector(".swiperbox__buttons").appendChild(r);
}
function v(e, s) {
  const t = document.createElement("button");
  t.innerHTML = s.icons.close, t.addEventListener("click", () => {
    e.close();
  }), e.querySelector(".swiperbox__buttons").appendChild(t);
}
function h(e, s) {
  e.classList.add("swiperbox"), e.classList.add("swiperbox__dialog"), e.innerHTML = `
		<div class="swiperbox__container">
			<div class="swiperbox__wrapper"></div>
			<div class="swiperbox__thumbs hidden"></div>
			<div class="swiperbox__pagination"></div>
			<div class="swiperbox__buttons"></div>
		</div>
	`;
}
function f(e, s) {
  const t = document.createElement("button"), r = document.createElement("button");
  t.innerHTML = s.icons.zoomIn, r.innerHTML = s.icons.zoomOut, r.disabled = !0;
  const o = e.querySelector(".swiperbox__swiper_main").swiper;
  t.addEventListener("click", () => {
    o.zoom.in(o.zoom.scale + 0.5);
  }), r.addEventListener("click", () => {
    o.zoom.out();
  }), o.on("zoomChange", (i, n) => {
    n === 1 ? r.disabled = !0 : r.disabled = !1;
  }), e.querySelector(".swiperbox__buttons").appendChild(t), e.querySelector(".swiperbox__buttons").appendChild(r);
}
function d(e) {
  if (e = { ...c, ...e }, !Array.isArray(e.items) || e.items.length === 0)
    throw new Error("Invalid items");
  e.items.forEach((t) => {
    if (typeof t != "object" || !t.image && !t.iframe)
      throw new Error("Invalid item. Must be an object with image or iframe");
  });
  const s = p();
  h(s), m(s, e), w(s, e), b(s, e), f(s, e), v(s, e), document.body.appendChild(s);
}
function l(e, s = {}) {
  var t = [];
  const r = (o, i = 0) => {
    o.preventDefault(), d({ ...s, items: t, index: i });
  };
  e instanceof HTMLElement ? t = [a(e, r)] : typeof e === NodeList || Array.isArray(e) ? t = Array.from(e).map((o, i) => a(o, (n) => r(n, i))) : typeof e == "string" && (t = Array.from(document.querySelectorAll(e)).map((o, i) => a(o, (n) => r(n, i)))), t.length === 0 && console.error("No items found");
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
