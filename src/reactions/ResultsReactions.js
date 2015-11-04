import app from '../App'
import resultsStore from '../stores/ResultsStore'
import localStorage from '../data/LocalStorage'
import resultsService from '../data/ResultsService'
import * as resultsRanking from "../data/ResultsRanking"

app.on("openResults").subscribe(async (event) => {
    if(!resultsStore.get().events[event.id]) {
        try {
            var cacheValue = await localStorage.get("results-" + event.id);
            var results = null;
            if(cacheValue) {
                results = JSON.parse(cacheValue);
            }
            else {
                results = await resultsService.getResults(event);
                await localStorage.set("results-" + event.id, JSON.stringify(results));
            }

            for(var i in results.categories) {
                var cat = results.categories[i];
                results.categories[i] = resultsRanking.parseRanking(cat);
            }

            var value = {};
            value[event.id] = results;
            resultsStore.get().events.set(value);
        }
        catch(error) {
        }
    }
});
