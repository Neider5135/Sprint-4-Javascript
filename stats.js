let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url).then(
    response => response.json()
).then(
    data => {
        generalStatistics(data);
    }
)

let statistics = document.getElementById("statistics")
let statisticsUpcoming = document.getElementById("statisticsUpcoming")
let statisticsPast = document.getElementById("statisticsPast")




function generalStatistics(data) {
    let listCapacity = largerCapacity(data)
    let hightPorcentList = [[0], [0], [0]]
    let lowPorcentList = [[99], [99], [99]]
    for (let i = 0; i < data.events.length; i++) {
        assistance = data.events[i].assistance
        if (assistance == undefined){
            continue
        }
        let porcent = assistancePorcent(assistance, data.events[i].capacity)
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
    let generalStatisticsTable = [hightPorcentList, lowPorcentList, listCapacity]
    console.log(generalStatisticsTable);
}


function largerCapacity(data) {
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

function revenues(price, assistance) {
    let revenues = price * assistance
    return (revenues + "$")
}

function assistancePorcent(assistance, capacity) {
    let porcent = (parseFloat(assistance) / parseFloat(capacity)) * 100
    return porcent
}

function statisticsCategories(data) {
    let listCategories = [[]]
    for (let k = 0; k < array.length; k++) {
        if (listCategories.length == 0) {
            listCategories[0] = [data.events[k].category, ]
        } else {
            l=0
            while (listCategories[l][l] == data.events[k].category) {
                
            }
        }
    }
}

function next(list, data) {
    if (list[l] == data.events[l].category){
        list[l+1]
    }
}