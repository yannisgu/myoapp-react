import Freezer from 'freezer-js'
import oevents from '../data/OEventsService'
import localStorage from '../data/LocalStorage'
require('array.prototype.find');
var _ = require('lodash');

let store = new Freezer({events: []});

export default store;
async function loadEvents() {

    var items = JSON.parse(await localStorage.get("eventsNew")) || [];
    store.get().events.set(items);
    console.log(items)
    var lastUpdate = parseInt(await localStorage.get("lastEventsUpdateNew"));
    if(!lastUpdate){
        lastUpdate = 0;
    }

    var events = await oevents.getAll(lastUpdate);
    console.log(events)
    for(var i in items) {
        var item = items[i];
        var ev = events.find((e) => item.idSource == e.idSource);
        if(ev) {
            items[i] = ev;
        }
    }

    for(var i in events) {
        var item = events[i];
        var ev = items.find((e) => item.idSource == e.idSource);
        if(!ev) {
            items.push(item)
        }
    }

    var events = _.sortBy(items, 'date');
    

    await localStorage.set("eventsNew", JSON.stringify(events));
    store.get().events.set(events);
    await localStorage.set("lastEventsUpdateNew", new Date().getTime().toString());

}

loadEvents().catch((e) => console.log(e));
