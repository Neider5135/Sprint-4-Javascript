import * as misFunciones from "./modulos/functions.js"

import { carrusel, pastEvents } from "./modulos/variables.js"

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url).then(
  data => data.json()
).then(data => {

  misFunciones.drawCards(data.events, carrusel, data.currentDate, "past");

  misFunciones.generalFilter(pastEvents, pastEvents);

  misFunciones.drawCategories(data);

  misFunciones.buttonDetails()
  
})