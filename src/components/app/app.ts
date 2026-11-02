import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector<HTMLElement>('.sources');

        if (!sources) {
            return;
        }

        sources.addEventListener('click', (event: MouseEvent) => {
            this.controller.getNews(event, (data) => {
                this.view.drawNews(data);
            });
        });

        this.controller.getSources((data) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
