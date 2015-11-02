import Emitter from './Emitter'

class App extends Emitter {

    constructor() {
        super()
        this.on("openEvent").subscribe((event) => {
            this._navigator.push({name: "eventDetail", event: event});
        });

        this.on("openMaps").subscribe((event) => {
            this._navigator.push({name: "mapsList", event: event});
        });

        this.on("openResults").subscribe((event) => {
            this._navigator.push({name: "resultsIndex", event: event})
        });

        this.on("openResultsForCategory").subscribe((data) => {
            this._navigator.push({name: "resultsByCategory", category: data.category, results: data.results})
        });

        this.on("openResultsForRunner").subscribe((data) => {
            this._navigator.push({name: "resultsByRunner", runner: data.runner, results: data.results})
        });
    }

    setNavigator(navigator) {
        this._navigator = navigator;
    }

}

var app = new App();
export default app;
