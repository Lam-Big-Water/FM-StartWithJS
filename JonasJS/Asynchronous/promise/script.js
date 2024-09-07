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


const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0]);
      renderCountry(data[0]);
    })
}

const getCountryAndNeighbors = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      renderCountry(data[0]);

      const neighbor = data[0].borders[0];
      console.log(neighbor);

      if (!neighbor) return;

      // neighbor
      return fetch(`https://restcountries.com/v3.1/name/${neighbor}`);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[0], 'neighbor')
    })
}

btn.addEventListener('click', () => getCountryData('usa'));
btn2.addEventListener('click', () => getCountryAndNeighbors('usa'));