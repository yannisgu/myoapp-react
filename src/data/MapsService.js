var URL = "http://worldofo.com/m/findomaps.php?type=search&search={map}"

class MapsService {
    async getMaps(map) {
         var url = URL.replace("{map}", map);
         var response = await fetch(url);
         var maps = await response.json();
         return maps.data;
    }
}

let mapsService = new MapsService()

export default mapsService
