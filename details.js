let details = document.getElementById("details")

let dataJson = localStorage.getItem("data")

let data = JSON.parse(dataJson)

let assistance

if(data[8] == "undefined"){
    data[8] = data[9]
}

details.innerHTML = `
    <img class="w-50" src="${data[0]}" alt="${data[1]}">
    <div class="w-25 d-flex align-items-center flex-column">
        <h5>
            ${data[1]}
        </h5>
        <p>
            ${data[2]}
        </p>
        <p>
            ${data[3]}
        </p>
        <p>
            Category: ${data[4]}
        </p>
        <p>
            Place: ${data[5]}    
        </p>
        <p>
            Capacity: ${data[6]}
        </p>
        <p>
            Price: ${data[7]}
        </p>
        <p>
            Assistance: ${data[8]}
        </p>
    </div>
    `