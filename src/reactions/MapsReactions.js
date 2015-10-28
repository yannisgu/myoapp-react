import app from '../App'
import mapsStore from '../stores/MapsStore'
import mapsService from '../data/MapsService'

app.on("openMaps").subscribe(async (event) => {
    var maps = await mapsService.getMaps(event.map);
    var value = {};
    value[event.id] = maps;
    mapsStore.get().events.set(value);
});
