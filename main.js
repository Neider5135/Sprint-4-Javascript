import * as misFunciones from "./modulos/functions.js"

import { carrusel } from "./modulos/variables.js"

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url).then(
    data => data.json()
).then(data => {
    misFunciones.drawCards(data.events, carrusel);

    misFunciones.generalFilter(data.events, data.events);

    misFunciones.drawCategories(data);




})
let Cards = document.getElementById("carouselPrincipal")
Cards.addEventListener("click", (e) => {
    if (e.target.name != undefined) {
        let data = (e.target.name).split("&")
        let dataJson = JSON.stringify(data)
        if (data.lenth != 0) {
            console.log("1");
            localStorage.setItem("data", dataJson)
            if (data == "") {
                console.log("2");
            } else {
                location.href = "./Details.html"
            }
        }
    }
})
