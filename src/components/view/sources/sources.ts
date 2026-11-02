import './sources.css';
import type { Source } from '../../../types';


class Sources {
    public draw(data: ReadonlyArray<Pick<Source, 'id' | 'name'>>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourceItemTemp || !sourcesContainer) {
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector<HTMLElement>(
                '.source__item-name'
            );
            const source =
                sourceClone.querySelector<HTMLElement>('.source__item');

            if (!name || !source) {
                return;
            }

            name.textContent = item.name;
            source.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.replaceChildren(fragment);
    }
}

export default Sources;
