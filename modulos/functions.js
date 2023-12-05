import { categories, carrusel } from "./variables.js"

export function drawCards(array, where, currentDate, time) {
    if (time == undefined && currentDate == undefined) {
        where.innerHTML = "";
        if (array.length == 0) {
            where.innerHTML = '<p class="noResults"> No results found </p>'
        }
        for (let i = 0; i < array.length; i += 4) {
            let carruselItem;
            if (i < 4) {
                carruselItem = document.createElement("div");
                carruselItem.classList.add("carousel-item", "active");
            } else {
                carruselItem = document.createElement("div");
                carruselItem.classList.add("carousel-item");
            }
            let contenedor = document.createElement("div");
            contenedor.classList.add("d-flex", "justify-content-around", "containerCards");

            for (let j = i; j < i + 4; j++) {
                if (array[j] != undefined) {
                    let card = document.createElement("div");
                    card.classList.add("card", "tamañoCartas");
                    card.innerHTML = `
            <div class="imgCardSizing">
            <img src="${array[j].image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${array[j].name}</h5>
                <p class="card-text">${array[j].description}</p>
            </div>
            <div class="card-body cardEnd">
            <p>Price: ${array[j].price}</p>
            <a href="/Details.html" class="button">Details</a>
            </div>`;
                    contenedor.appendChild(card);
                }
            }
            carruselItem.appendChild(contenedor);
            where.appendChild(carruselItem);
        }
    } else {

    let pastEvents = []

    let upcomingEvents = []

    for (let a = 0; a < array.length; a++) {
        if (array[a].date > currentDate && time == "past") {
            pastEvents.push(array[a]);
            if (a == array.length - 1){
                drawCards(pastEvents, where)
            }
        } else if (array[a].date < currentDate && time == "upcoming") {
            upcomingEvents.push(array[a]);
            if (a == array.length - 1){
                drawCards(upcomingEvents, where)
            }
        }
    }
    }
    
}

export function drawCategories(data) {
    let categoriesin = [];
    for (let k = 0; k < data.events.length; k++) {
        if (categoriesin.includes(data.events[k].category)) {
            continue;
        } else {
            let categoryElement = document.createElement("div");
            categoryElement.classList.add("form-check", "form-check-inline");
            categoryElement.innerHTML = `
  <input class="form-check-input" type="checkbox" id="inlineCheckbox${categoriesin.length + 1
                }" value="${data.events[k].category}">
  <label class="form-check-label" for="inlineCheckbox${categoriesin.length + 1
                }">${data.events[k].category}</label>
  `;
            categories.appendChild(categoryElement);
            categoriesin.push(data.events[k].category);
        }
    }
}

export function generalFilter(array, array2) {
    filterSearch(array);
    let search = document.getElementById("search")
    search.addEventListener("keyup", e => {
        if (e.target.value == ""){
            drawCards(array2, carrusel)
        }
    })
    categories.addEventListener("change", (e) => {
        let cheked = Array.from(
            document.querySelectorAll("input[type=checkbox]:checked")
        ).map((e) => e.value);
        filterSearch (cheked)
        filterCategories(array, array2, cheked);
    });
}

export function filterCategories(array, array2, arrayCategories) {
    let lastArrayCat = array.filter((e) => arrayCategories.includes(e.category));
    if (lastArrayCat.length == 0) {
        drawCards(array2, carrusel);
    } else {
        drawCards(lastArrayCat, carrusel)
        filterSearch(lastArrayCat);
    }
}

export function filterSearch(array) {
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", (e) => {
        let search = document.getElementById("search").value;
        let lastArraySea = [];
        for (let b = 0; b < array.length; b++) {
            let finalFilter = array[b].name
                .toLocaleLowerCase()
                .indexOf(search.toLocaleLowerCase());
            if (finalFilter != -1) {
                lastArraySea.push(array[b]);
            } else {
                for (let b = 0; b < array.length; b++) {
                    let finalFilter = array[b].category
                        .toLocaleLowerCase()
                        .indexOf(search.toLocaleLowerCase());
                    if (finalFilter != -1 && !lastArraySea.includes(array[b])) {
                        lastArraySea.push(array[b]);
                    }
                }
            }
        }
        drawCards(lastArraySea, carrusel);
    });
}
