import Freezer from 'freezer-js'
import oevents from '../data/OEventsService'
import localStorage from '../data/LocalStorage'
require('array.prototype.find');
var _ = require('lodash');

let store = new Freezer({events: []});

export default store;
async function loadEvents() {

    var items = JSON.parse(await localStorage.get("events")) || [];
    store.get().events.set(items);
    console.log(items)
    var lastUpdate = parseInt(await localStorage.get("lastEventsUpdate"));
    if(!lastUpdate){
        lastUpdate = 0;
    }
    var events = await oevents.getAll(lastUpdate);
    console.log(events)
    for(var i in items) {
        var item = items[i];
        var ev = events.find((e) => item.id == e.id);
        if(ev) {
            items[i] = ev;
        }
    }

    for(var i in events) {
        var item = events[i];
        var ev = items.find((e) => item.id == e.id);
        if(!ev) {
            items.push(item)
        }
    }
    console.log(items)
    var events = _.sortBy(items, 'date');
    console.log(events)

    await localStorage.set("events", JSON.stringify(events));
    store.get().events.set(events);
    await localStorage.set("lastEventsUpdate", new Date().getTime().toString());

}

loadEvents().catch((e) => console.log(e));
