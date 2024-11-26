# SwiperBox Gallery Popup
A simple and lightweight image gallery popup with swiper slider.

## Installation
```bash
npm install @swiperbox/swiperbox
```

### Peer dependencies
```bash
npm install swiper @fortawesome/fontawesome-free
```

## Usage
```js
import { Swiperbox } from '@swiperbox/swiperbox';

const items = [
    {
        thumb: 'https://lipsum.app/id/01/192x144',
        image: 'https://lipsum.app/id/01/1024x780',
        alt: 'First image',
    },
    {
        thumb: 'https://lipsum.app/id/02/192x144',
        image: 'https://lipsum.app/id/02/1024x780',
        alt: 'Second image',
    },
    {
        thumb: 'https://lipsum.app/id/03/192x144',
        iframe: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        video: true,
        alt: 'Third video',
    },
    {
        thumb: 'https://lipsum.app/id/06/192x144',
        iframe: 'https://vimeo.com/726994568',
        video: true,
        alt: 'Fourth video',
    },
];

Swiperbox.open({ items });
```

## Options
```js
Swiperbox.open({
    index: 0, // initial slide index
    swiper: {}, // Swiper options
    icons: {
        close: '<i class="fa-solid fa-xmark fa-2xl"></i>',
        next: '<i class="fa-solid fa-chevron-right"></i>',
        prev: '<i class="fa-solid fa-chevron-left"></i>',
        zoomIn: '<i class="fa-solid fa-search-plus fa-xl"></i>',
        zoomOut: '<i class="fa-solid fa-search-minus fa-xl"></i>',
        play: '<i class="fa-solid fa-play fa-xl"></i>',
        thumbsToggle: '<i class="fa-solid fa-th fa-xl"></i>',
    },
    items: [], // Array of items
});
```