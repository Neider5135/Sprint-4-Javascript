import { categories, carrusel, statistics, statisticsPast, statisticsUpcoming } from "./variables.js"

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
            <input type="submit" class="button" value="Details" name="${array[j].image}&${array[j].name}&${array[j].date}&${array[j].description}&${array[j].category}&${array[j].place}&${array[j].capacity}&${array[j].assistance}&${array[j].price}">
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
                if (a == array.length - 1) {
                    drawCards(pastEvents, where)
                }
            } else if (array[a].date < currentDate && time == "upcoming") {
                upcomingEvents.push(array[a]);
                if (a == array.length - 1) {
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
        if (e.target.value == "") {
            drawCards(array2, carrusel)
        }
    })
    categories.addEventListener("change", (e) => {
        let cheked = Array.from(
            document.querySelectorAll("input[type=checkbox]:checked")
        ).map((e) => e.value);
        filterSearch(cheked)
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

export function generalStatistics(data) {
    let listCapacity = largerCapacity(data)
    let hightPorcentList = [[0], [0], [0]]
    let lowPorcentList = [[99], [99], [99]]
    for (let i = 0; i < data.events.length; i++) {
        let assistance = data.events[i].assistance
        if (assistance == undefined) {
            continue
        }
        let porcent = assistancePorcent(data.events[i])
        if (porcent > (hightPorcentList[0])[0]) {
            hightPorcentList[0] = [porcent, data.events[i].name]
        } else if (porcent > (hightPorcentList[1])[0]) {
            hightPorcentList[1] = [porcent, data.events[i].name]
        } else if (porcent > (hightPorcentList[2])[0]) {
            hightPorcentList[2] = [porcent, data.events[i].name]
        }
        
        if (porcent < (lowPorcentList[0])[0]) {
            lowPorcentList[1] = lowPorcentList[0]
            lowPorcentList[0] = [porcent, data.events[i].name]
        } else if (porcent < (lowPorcentList[1])[0]) {
            lowPorcentList[2] = lowPorcentList[1]
            lowPorcentList[1] = [porcent, data.events[i].name]
        } else if (porcent < (lowPorcentList[2])[0]) {
            lowPorcentList[2] = [porcent, data.events[i].name]
        }
    }
    hightPorcentList[0][0] =  hightPorcentList[0][0]+" % "
    hightPorcentList[1][0] =  hightPorcentList[1][0]+" % "
    hightPorcentList[2][0] =  hightPorcentList[2][0]+" % "
    lowPorcentList[0][0] =  lowPorcentList[0][0]+" % "
    lowPorcentList[1][0] =  lowPorcentList[1][0]+" % "
    lowPorcentList[2][0] =  lowPorcentList[2][0]+" % "
    let generalStatisticsTable = [hightPorcentList, lowPorcentList, listCapacity]
    console.log(generalStatisticsTable);
    drawStats(statistics, generalStatisticsTable, "g")
}

export function statisticsCategoriesPast(data) {
    let listCategoriesPast = []
    for (let k = 0; k < data.events.length; k++) {
        if (data.events[k].date > data.currentDate) {

            continue
        } else if (listCategoriesPast.length == 0) {
            listCategoriesPast[0] = [data.events[k].category, revenues(data.events[k]), assistancePorcent(data.events[k])]
        } else {
            let l = 0
            while (!(listCategoriesPast[l] == undefined)) {
                l++
                if (listCategoriesPast[l - 1][0] == data.events[k].category) {
                    listCategoriesPast[l][1] = parseInt(parseFloat(listCategoriesPast[l][1]) + revenues(data.events[k]))
                    listCategoriesPast[l][2] = (parseInt(parseFloat(listCategoriesPast[l][2]) + assistancePorcent(data.events[k])) / 2)

                    break
                } else if (listCategoriesPast[l] == undefined) {
                    listCategoriesPast[l] = [data.events[k].category, revenues(data.events[k]), assistancePorcent(data.events[k])]

                    break
                } else if (listCategoriesPast[l][0] == data.events[k].category) {
                    listCategoriesPast[l][1] = parseInt(parseFloat(listCategoriesPast[l][1]) + revenues(data.events[k]))
                    listCategoriesPast[l][2] = (parseInt(parseFloat(listCategoriesPast[l][2]) + assistancePorcent(data.events[k])) / 2)

                    break
                } else {
                    continue
                }
            }
        }
    }
    console.log(listCategoriesPast);
    drawStats(statisticsPast, listCategoriesPast)
}

export function statisticsCategoriesUpcoming(data) {
    let listCategoriesUpcoming = []
    for (let k = 0; k < data.events.length; k++) {
        if (data.events[k].date < data.currentDate) {
            continue
        } else if (listCategoriesUpcoming.length == 0) {
            listCategoriesUpcoming[0] = [data.events[k].category, revenues(data.events[k]), assistancePorcent(data.events[k])]
        } else {
            let l = 0
            while (!(listCategoriesUpcoming[l] == undefined)) {
                l++
                if (listCategoriesUpcoming[l - 1][0] == data.events[k].category) {
                    listCategoriesUpcoming[l][1] = parseInt(parseFloat(listCategoriesUpcoming[l][1]) + revenues(data.events[k]))
                    listCategoriesUpcoming[l][2] = (parseInt(parseFloat(listCategoriesUpcoming[l][2]) + assistancePorcent(data.events[k])) / 2)

                    break
                } else if (listCategoriesUpcoming[l] == undefined) {
                    listCategoriesUpcoming[l] = [data.events[k].category, revenues(data.events[k]), assistancePorcent(data.events[k])]

                    break
                } else if (listCategoriesUpcoming[l][0] == data.events[k].category) {
                    listCategoriesUpcoming[l][1] = parseInt(parseFloat(listCategoriesUpcoming[l][1]) + revenues(data.events[k]))
                    listCategoriesUpcoming[l][2] = (parseInt(parseFloat(listCategoriesUpcoming[l][2]) + assistancePorcent(data.events[k])) / 2)

                    break
                } else {
                    continue
                }
            }
        }
    }
    console.log(listCategoriesUpcoming);
    drawStats(statisticsUpcoming, listCategoriesUpcoming)
}

export function largerCapacity(data) {
    let capacity = [[0], [0], [0]]
    for (let i = 0; i < data.events.length; i++) {
        if (data.events[i].capacity > (capacity[0])[0] + 1) {
            capacity[1] = capacity[0]
            capacity[0] = [data.events[i].capacity, data.events[i].name]
        } else if (data.events[i].capacity > (capacity[1])[0] + 1) {
            capacity[2] = capacity[1]
            capacity[1] = [data.events[i].capacity, data.events[i].name]
        } else if (data.events[i].capacity > (capacity[2])[0] + 1) {
            capacity[2] = [data.events[i].capacity, data.events[i].name]
        }
    }
    return capacity
}

export function revenues(events) {
    if (events.assistance == undefined) {
        let revenues = events.price * events.estimate
        return (revenues)
    } else {
        let revenues = events.price * events.assistance
        return (revenues)
    }
}

export function assistancePorcent(events) {
    if (events.assistance == undefined) {
        let porcent = (parseFloat(events.estimate) / parseFloat(events.capacity)) * 100
        return porcent
    } else {
        let porcent = (parseFloat(events.assistance) / parseFloat(events.capacity)) * 100
        return porcent
    }
}

function drawStats(where, array, g) {
    for (let i = 0; i < array.length; i++) {
        if (g == "g"){
            let tableRow = document.createElement("tr")
        tableRow.innerHTML = `
        <tr>
            <td>${array[0][i]}</td>
            <td>${array[1][i]}</td>
            <td>${array[2][i]}</td>
        </tr>
        `
        where.appendChild(tableRow)
        }else{
            let tableRow = document.createElement("tr")
        tableRow.innerHTML = `
        <tr>
            <td>${array[i][0]}</td>
            <td>${array[i][1]} $</td>
            <td>${array[i][2]} %</td>
        </tr>
        `
        where.appendChild(tableRow)
        }
    }  
}