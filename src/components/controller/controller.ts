import AppLoader from './appLoader';
import { Endpoint } from '../../types';
import type {
    ApiCallback,
    NewsResponse,
    SourcesResponse,
} from '../../types';

class AppController extends AppLoader {
    public getSources(callback: ApiCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(event: MouseEvent,
        callback: ApiCallback<NewsResponse>): void {
        const newsContainer = event.currentTarget;

        if (
            !(event.target instanceof HTMLElement) ||
            !(newsContainer instanceof HTMLElement)
        ) {
            return;
        }

        let target: HTMLElement | null = event.target;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (
                    sourceId &&
                    newsContainer.getAttribute('data-source') !== sourceId
                ) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
