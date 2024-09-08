// Welcome to Callback Hell

const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");
const btn2 = document.querySelector(".btn-countries");

// render
const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getJSON = (url, errorMsg = 'Something is wrong...') => {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)

    return response.json();
  })
}


const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Can't found the country...`)
    .then(function (data) {
      console.log(data);
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.error(`${err}`)
    })
}

const getCountryAndNeighbors = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Can't found the country...`)
    .then(function (data) {
      renderCountry(data[0]);

      const neighbor = data[0].borders[0];
      console.log(neighbor);

      if (!neighbor) return;

      // neighbor
      return getJSON(`https://restcountries.com/v3.1/name/${neighbor}`, `Can't found the neighbor`);
    })
    .then(function (data) {
      renderCountry(data[1], 'neighbor')
    })
    .catch((err) => {
      console.error(`${err}`)
    })
}

btn.addEventListener('click', () => getCountryData('usa'));
btn2.addEventListener('click', () => getCountryAndNeighbors('usa'));