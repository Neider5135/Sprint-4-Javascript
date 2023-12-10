import * as misFunciones from "./modulos/functions.js"

import { carrusel, upcomingEvents } from "./modulos/variables.js"

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url).then(
  data => data.json()
).then(data => {

  misFunciones.drawCards(data.events, carrusel, data.currentDate, "upcoming");

  misFunciones.generalFilter(upcomingEvents, upcomingEvents);

  misFunciones.drawCategories(data);

  misFunciones.buttonDetails()

})