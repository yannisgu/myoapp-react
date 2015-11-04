import Freezer from 'freezer-js'
import oevents from '../data/OEventsService'
import localStorage from '../data/LocalStorage'

let store = new Freezer({events: []});

export default store;

async function loadEvents() {
    var items = JSON.parse(await localStorage.get("events"));
    store.get().events.set(items);

    var events = await oevents.getAll();
    await localStorage.set("events", JSON.stringify(events));
    store.get().events.set(events);

}

loadEvents().catch((e) => console.log(e));
