import '@swiperbox/swiperbox/dist/style.css';
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
        image: 'https://lipsum.app/id/03/1024x780',
        alt: 'Third image',
    },
    {
        thumb: 'https://lipsum.app/id/04/192x144',
        image: 'https://lipsum.app/id/04/1024x780',
        alt: 'Fourth image',
    },
    {
        thumb: 'https://lipsum.app/id/05/192x144',
        iframe: 'https://www.youtube.com/watch?v=Cp69t-n-UhA',
        video: true,
        alt: 'Fifth video',
    },
    {
        thumb: 'https://lipsum.app/id/06/192x144',
        iframe: 'https://vimeo.com/726994568',
        video: true,
        alt: 'Sixth video',
    },
    {
        thumb: 'https://lipsum.app/id/07/192x144',
        image: 'https://lipsum.app/id/07/1024x780',
        alt: 'Seventh image',
    },
    {
        thumb: 'https://lipsum.app/id/08/192x144',
        image: 'https://lipsum.app/id/08/1024x780',
        alt: 'Eighth image',
    },
    {
        thumb: 'https://lipsum.app/id/09/192x144',
        image: 'https://lipsum.app/id/09/1024x780',
        alt: 'Ninth image',
    },
    {
        thumb: 'https://lipsum.app/id/10/192x144',
        image: 'https://lipsum.app/id/10/1024x780',
        alt: 'Tenth image',
    },
];

const btn = document.getElementById('open');
btn.addEventListener('click', () => {
    Swiperbox.open({ items });
});