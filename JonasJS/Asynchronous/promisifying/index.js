
// setTimeout(() => {
//     console.log('1');
//     setTimeout(() => {
//         console.log('2');
//         setTimeout(() => {
//             console.log('3');
//             setTimeout(() => {
//                 console.log('4');
                
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

// // VS

// // Promisifying setTimeout
// const wait = function (sec) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, sec * 1000);
//     });
// };

// wait(1)
//     .then(() => {
//         console.log('1-p');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('2-p');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('3-p');
//         return wait(1);
//     })
//     .then(() => console.log('4-p'))

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.error(x))

// Promisifying the Geolocation API
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
console.log(getPosition().then(pos => console.log(pos)));

function whereAmI () {
    getPosition()
        .then(pos => {
            const {latitude: lat, longitude: lng} = pos.coords;
            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then(res => {
            if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
            return res.json()
        })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
        })
        .catch(err => console.error(err.message));
}

whereAmI()