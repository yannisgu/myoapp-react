var URL = "http://oevents.aws.af.cm/events?{query}"

class OEventsService {
    async getAll(lastModification) {

        lastModification = 0;
         var query = {};
         query.lastModification = {"$gt": lastModification};
         query.source = "solv"
         query["$sort"] = {"date": 1}
         var url = URL.replace("{query}", encodeURIComponent(JSON.stringify(query)));
         
         var response = await fetch(url);
         var events = await response.json();
         return events;
    }
}

let oevents = new OEventsService()

export default oevents
