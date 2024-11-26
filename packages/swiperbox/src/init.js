import { bind } from "./core/bind.js";

document.addEventListener("DOMContentLoaded", () => {
  const groups = {};

  document.querySelectorAll("[data-swiperbox]").forEach((el) => {
    const group = el.dataset.swiperbox;

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(el);
  });
  
  for (const group in groups) {
    bind(groups[group]);
  }
});
