const local = document.querySelector('.local');
console.log(local)

function renderText(data) {
    local.textContent = `${data}`
}



function whereAmI (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(function (response) {
            if (!response.ok) throw new Error(`Something is wrong... ${response.status}`)
           return response.json()
        })
        .then((data) => {
            if (!data.state) throw new Error(`Can't found the state`)
            const total = [data.state, lat, lng]
            renderText(total)
        })
        .catch((err) => renderText(err.message))
}

whereAmI(52.508, 13.381);