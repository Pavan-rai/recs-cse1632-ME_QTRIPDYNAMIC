import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  console.log('From init()');
  console.log(config.backendEndpoint);
  console.log(cities);


  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
   let res = fetch(config.backendEndpoint+"/cities").then((res) =>{
      return res.json();
   }).catch((err)=>{
     console.log(err);
     return null;
   });
  return res;

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div");
  container.className = "col-12 col-sm-6 col-lg-3 mb-4";
  let innerHTML = `<a id="${id}" href="pages/adventures/?city=${id}">
  <div class="tile">
    <img src="${image}" />
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
  </div>
</a>`;
  container.innerHTML =  innerHTML;
  document.getElementById("data").appendChild(container);

}

export { init, fetchCities, addCityToDOM };
