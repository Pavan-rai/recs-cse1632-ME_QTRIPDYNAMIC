
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURESc
  // 1. Extract the city id from the URL's Query Param and return it
  let str = search.split('=');
  return str[1];
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let res = await fetch(config.backendEndpoint+"/adventures?city="+city).then((res) =>{
    return res.json();});
   return res;
  } catch(err){
     return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.forEach(function(item){
    let container = document.createElement("div");
    container.className = "col-6 col-lg-3 mb-3";
    let innerHTML = `<a id="${item.id}" href="detail/?adventure=${item.id}">
    <div class="activity-card">
    <div class="category-banner" >${item.category}</div>
      <img src="${item.image}"  class="activity-card img"  />
      <div class="adventure-detail-card">
        <h5 >${item.name}</h5>
        <p >₹ ${item.costPerHead} </p>
        <h5 >Duration </h5>
        <p >${item.duration} Hours</p>
      </div>
    </div>
  </a>`;
    container.innerHTML =  innerHTML;
    document.getElementById("data").appendChild(container);

  });



}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  for(let i = 0; i < list.length ; i++){
      if(list[i].duration >= low && list[i].duration <= high){
        filteredList.push(list[i]);
      }
  }
  return filteredList

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  for(let i = 0; i < list.length ; i++){
      if(categoryList.includes(list[i].category)){
        filteredList.push(list[i]);
      }
  }
  return filteredList

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredList = [];
  if(filters["duration"].length > 0 && filters["category"].length > 0){
    let duration = filters["duration"].split("-");
    filteredList = filterByDuration(list,Number(duration[0]),Number(duration[1]));
    filteredList = filterByCategory(filteredList,filters["category"]);
  } else if (filteres["duration"].length > 0){
    let duration = filters["duration"].split("-");
    filteredList = filterByDuration(list,Number(duration[0]),Number(duration[1]));
  } else if(filters["category"].length > 0){
    filteredList = filterByCategory(list,filters["category"]);
  } else {
    filteredList = list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
   let filters = JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filters;


  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let duration = filters.duration.split("-");
  let data = getFiltersFromLocalStorage();
  filters.category.forEach(function(item){
    let container = document.createElement("div");
    container.className = "category-filter";
    let innerHTML = `<p>${item}</p>`;
    container.innerHTML =  innerHTML;
    document.getElementById("category-list").appendChild(container);
  });


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
