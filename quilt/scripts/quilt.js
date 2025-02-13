import { quilts } from '../data/quilt.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');

    quilts.forEach(quilt => {
        const article = document.createElement('article');
        article.style.setProperty('--index', quilt.index);

        const articleImgDiv = document.createElement('div');
        articleImgDiv.classList.add('article-img');
        const img = document.createElement('img');
        img.src = quilt.imgSrc;
        img.alt = quilt.imgAlt;
        articleImgDiv.appendChild(img);

        const articleInfoDiv = document.createElement('div');
        articleInfoDiv.classList.add('article-info');
        if (quilt.heading) {
            const h2 = document.createElement('h2');
            h2.textContent = quilt.heading;
            articleInfoDiv.appendChild(h2);
        }
        if (quilt.paragraph) {
            const p = document.createElement('p');
            p.textContent = quilt.paragraph;
            articleInfoDiv.appendChild(p);
        }
        if (quilt.linkText && quilt.linkHref) {
            const a = document.createElement('a');
            a.href = quilt.linkHref;
            a.textContent = quilt.linkText;
            articleInfoDiv.appendChild(a);
        }

        article.appendChild(articleImgDiv);
        article.appendChild(articleInfoDiv);
        main.appendChild(article);
    });

    const articleImgs = document.querySelectorAll('.article-img');
    const articleImgsImgs = document.querySelectorAll('.article-img img');

    articleImgs.forEach(articleImg => {
        articleImg.style.animation = 'in-n-out both linear';
    });

    articleImgsImgs.forEach(articleImgImg => {
        articleImgImg.style.animation = 'filter-out both linear';
    });

    if (window.innerWidth >= 768) {
        articleImgs.forEach(articleImg => {
            articleImg.style.animation = 'brighten both linear';
        });

        articleImgsImgs.forEach(articleImgImg => {
            articleImgImg.style.animation = 'clip-out both linear';
        });
    }
});