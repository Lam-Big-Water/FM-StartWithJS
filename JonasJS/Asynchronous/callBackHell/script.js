// Welcome to Callback Hell

const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

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


// handle
const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    renderCountry(data);

    // Get neighbor
    const [neighbor] = data.borders;
    console.log(neighbor);

    if (!neighbor) return;

    // Call Country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/name/${neighbor}`);
    request2.send();

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2[0].flags.svg);

      renderCountry(data2[0], "neighbor");
    });
  });
};

btn.addEventListener("click", () => getCountryAndNeighbor("usa"));

//? What about render more country? => the code will very grow to right side