import Emitter from './Emitter'

class App extends Emitter {

    constructor() {
        super()
        this.on("openEvent").subscribe((event) => {
            this._navigator.push({name: "eventDetail", title: event.name, event: event});
        });

        this.on("openMaps").subscribe((event) => {
            this._navigator.push({name: "mapsList", title: event.map, event: event});
        });

        this.on("openResults").subscribe((event) => {
            this._navigator.push({name: "resultsIndex", title: event.name, event: event})
        });

        this.on("openResultsForCategory").subscribe((data) => {
            this._navigator.push({name: "resultsByCategory", title: data.category.name, category: data.category, results: data.results})
        });

        this.on("openResultsForRunner").subscribe((data) => {
            this._navigator.push({name: "resultsByRunner", title: data.runner.fullName ,runner: data.runner, results: data.results, category: data.category})
        });

        this.on("openResultsLeg").subscribe((data) => {
            this._navigator.push({name: "resultsByLeg", title: data.category.name + ": " + data.leg,leg: data.leg, results: data.results, category: data.category})
        });
    }

    setNavigator(navigator) {
        this._navigator = navigator;
    }

}

var app = new App();
export default app;
