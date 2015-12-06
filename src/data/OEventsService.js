import LocalStorage from './LocalStorage'

var URL = "http://o-api.azurewebsites.net/api/extendedEvents?{query}"

class OEventsService {
    async getAll(lastModification) {
        var currentYear = new Date().getFullYear();
        var returnEvents = [];
        for(var year = currentYear - 1; year <= currentYear + 2; year++) {
            var url = URL.replace("{query}", "lastModification=" + lastModification + "&year=" +year);
            console.log(url)
            var response = await fetch(url);
            var events = (await response.json()).events;
            for (var i = 0, len = events.length; i < len; ++i) {
                returnEvents.push(events[i]);
            }
        }
        return returnEvents;
    }
}

let oevents = new OEventsService()

export default oevents
