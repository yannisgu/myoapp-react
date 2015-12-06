var URL = "http://ol.zimaa.ch/api/events/solv/{id}"

class ResultsService {
    async getResults(event) {
      return await (await fetch(URL.replace("{id}", event.resultsId))).json();
    }
}

let resultsService = new ResultsService()

export default resultsService
