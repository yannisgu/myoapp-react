import Freezer from 'freezer-js'
import oevents from '../data/OEventsService'
import localStorage from '../data/LocalStorage'

let store = new Freezer({events: []});

export default store;

async function loadEvents() {
    var items = JSON.parse(await localStorage.get("events"));
    store.get().events.set(items);

    var lastUpdate = parseInt(await localStorage.get("lastEventsUpdate"));
    if(!lastUpdate){
        lastUpdate = 0;
    }
    var events = await oevents.getAll(lastUpdate);
    await localStorage.set("events", JSON.stringify(events));
    store.get().events.set(events);
    await localStorage.set("lastEventsUpdate", new Date().getTime().toString());

}

loadEvents().catch((e) => console.log(e));
