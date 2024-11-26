import { open } from './open.js';

export function bind(selector, config = {}) {
  var list = [];
  
  const onClick = (e, index = 0) => {
    e.preventDefault();
    open({ ...config, items: list, index });
  }

  if (selector instanceof HTMLElement) {
    list = [elToItem(selector, onClick)];
  } else if (typeof selector === NodeList || Array.isArray(selector)) {
    list = Array.from(selector).map((el, index) => elToItem(el, (e) => onClick(e, index)));
  } else if (typeof selector === "string") {
    list = Array.from(document.querySelectorAll(selector)).map((el, index) => elToItem(el, (e) => onClick(e, index)));
  }
  
  if (list.length === 0) {
    console.error("No items found");
  }
}

function elToItem(el, onClick) {
  el.addEventListener("click", onClick);

  return {
    thumb: el.dataset.thumb,
    image: el.dataset.image,
    iframe: el.dataset.iframe || el.dataset.video,
    video: el.dataset.video ? true : false,
  };
}
