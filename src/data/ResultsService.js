var URL = "http://ol.zimaa.ch/api/events/solv/{id}"
var SOLV_URL = "http://o-l.ch/cgi-bin/fixtures?json=1&mode=results&year={year}"

import solvLoader from "./ResultsRanking/solv-loader"

class ResultsService {
    async getResults(event) {
        var date = new Date(event.date);
        var year = date.getFullYear();
        var solvURL = SOLV_URL.replace("{year}", year);
        var eventsResponse = await fetch(solvURL);
        var events = JSON.parse((await eventsResponse.text()).replace(/\t/g, ' ')).ResultLists;
        var id;

        for(var i in events) {
            if(events[i].UniqueID == event.idSource) {
                id = events[i].ResultListID;
            }
        }

         return await solvLoader(id);
    }
}

let resultsService = new ResultsService()

export default resultsService
