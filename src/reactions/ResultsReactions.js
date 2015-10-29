import app from '../App'
import resultsStore from '../stores/ResultsStore'
import localStorage from '../data/LocalStorage'
import resultsService from '../data/ResultsService'

app.on("openResults").subscribe(async (event) => {
    if(!resultsStore.get().events[event.id]) {
        try {
            var cacheValue = await localStorage.get("results-" + event.id);
            var results = null;
            if(cacheValue) {
                results = JSON.parse(cacheValue);
            }
            else {
                console.log(event)
                results = await resultsService.getResults(event);
                await localStorage.set("results-" + event.id, JSON.stringify(results));
            }

            var value = {};
            value[event.id] = results;
            console.log(results)
            resultsStore.get().events.set(value);
        }
        catch(error) {
            console.log(error)
        }
    }
});
