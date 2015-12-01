import LocalStorage from './LocalStorage'

var URL = "http://oevents.herokuapp.com/events?{query}"

class OEventsService {
    async getAll(lastModification) {
         var query = {};
         query.lastModification = {"$gt": lastModification};
         query.source = "solv"
         query["$sort"] = {"date": 1}
         var url = URL.replace("{query}", encodeURIComponent(JSON.stringify(query)));
         console.log(url)

         var response = await fetch(url);
         var events = await response.json();
         return events;
    }
}

let oevents = new OEventsService()

export default oevents
