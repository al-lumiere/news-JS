import './news.css';
import type { Article } from '../../../types';

class News {
    public draw(data: ReadonlyArray<Article>): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemp || !newsContainer) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(
                true
            ) as DocumentFragment;

            const card = newsClone.querySelector<HTMLElement>('.news__item');
            const photo =
                newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const author =
                newsClone.querySelector<HTMLElement>('.news__meta-author');
            const date =
                newsClone.querySelector<HTMLElement>('.news__meta-date');
            const title = newsClone.querySelector<HTMLElement>(
                '.news__description-title'
            );
            const source = newsClone.querySelector<HTMLElement>(
                '.news__description-source'
            );
            const content = newsClone.querySelector<HTMLElement>(
                '.news__description-content'
            );
            const link =
                newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (
                !card ||
                !photo ||
                !author ||
                !date ||
                !title ||
                !source ||
                !content ||
                !link
            ) {
                return;
            }

            if (idx % 2) {
                card.classList.add('alt');
            }

            if (item.urlToImage) {
                photo.style.backgroundImage = `url(${JSON.stringify(item.urlToImage)})`;
            }

            author.textContent = item.author || item.source.name;
            date.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            content.textContent = item.description ?? '';
            link.href = item.url;

            fragment.append(newsClone);
        });

        newsContainer.replaceChildren(fragment);
    }
}

export default News;