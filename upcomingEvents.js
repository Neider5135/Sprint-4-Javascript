import * as misFunciones from "./modulos/functions.js"

import { carrusel } from "./modulos/variables.js"

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url).then(
  data => data.json()
).then(data => {

  misFunciones.drawCards(data.events, carrusel, data.currentDate, "upcoming");

  misFunciones.generalFilter(data.events, data.events);

  misFunciones.drawCategories(data);

  misFunciones.buttonDetails()

})