let details = document.getElementById("details")

let dataJson = localStorage.getItem("data")

let data = JSON.parse(dataJson)

details.innerHTML = `
    <img class="w-50" src="${data[0]}" alt="Food Fair">
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
            ${data[4]}
        </p>
        <p>
            ${data[5]}    
        </p>
        <p>
            ${data[6]}
        </p>
        <p>
            Assistance: ${data[7]}
        </p>
        <p>
            Price: ${data[8]}
        </p>
    </div>
    `