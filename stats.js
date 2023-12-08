import * as myModule from "./modulos/functions.js"

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url).then(
    response => response.json()
).then(
    data => {
        console.log(data);
        myModule.generalStatistics(data);
        myModule.statisticsCategoriesPast(data)
        myModule.statisticsCategoriesUpcoming(data)
    }
)
