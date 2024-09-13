const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = async function () {
    try {
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;

        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!resGeo.ok) throw new Error(`Problem getting location data`);

        const dataGeo = await resGeo.json();
        console.log(dataGeo.country)
        return `You are in ${dataGeo.country}`

        // const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        // if (!res.ok) throw new Error(`Problem getting country`);

        // const data = await res.json();
        // console.log(data);

    } catch (e) {
        console.error(e)
    }
}

const city = whereAmI()
console.log(city, '1')

const city2 = whereAmI()
    .then(city2 => city2)
console.log(city2)
console.log('first')




