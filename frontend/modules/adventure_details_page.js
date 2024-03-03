import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

    let str = search.split('=');
  // Place holder for functionality to work in the Stubs
  return str[str.length - 1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try{
    let res = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId).then((res) =>{
      return res.json();});
     return res;
    } catch(err){
       return null;
    }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
   document.getElementById("adventure-name").innerHTML = adventure.name;
   document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

   adventure.images.map((image)=>{
    let element = document.createElement("div");
        element.className = "activity-card-image";
        element.innerHTML = `<img  src="${image}" />`;

        document.getElementById("photo-gallery").appendChild(element);
   });

   


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
    document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div  id="car"  class="carousel-inner">
      
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;

  var flag = true;

  images.map((image)=>{

    let element = document.createElement("div");
        if(flag){
          element.className = "carousel-item active";
          flag = false;
        }else {
         element.className = "carousel-item";
        }
        element.innerHTML = `<img  src="${image}" />`;

        document.getElementById("car").appendChild(element);
   });




}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
   if(adventure.available == true){
     let ele = document.getElementById("reservation-panel-sold-out");
         ele.style.display = "none";
    let ele1 = document.getElementById("reservation-panel-available");
         ele1.style.display = "block";
    let ele2 = document.getElementById("reservation-person-cost");
        ele2.innerHTML = String(adventure.costPerHead);

   } else {
    let ele = document.getElementById("reservation-panel-sold-out");
        ele.style.display = "block";
   let ele1 = document.getElementById("reservation-panel-available");
       ele1.style.display = "none";
   }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let name = document.getElementsByName('name');
  let date = document.getElementsByName('date');
  let person = document.getElementsByName('person');
  const update = {
    name: name,
    date: date,
    person: person,
    adventure: adventure.id,
    };
   
   

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    };

let loginForm = document.getElementById("myForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(config.backendEndpoint+"/reservations/new",options)
  .then(data => {
      if (data.ok) {
        alert("Sucess!");
        location.reload();
       } else{
        alert("Failed!");
       }   
      })
   });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let ele = document.getElementById("reserved-banner");

   if(adventure.reserved == false){
    ele.style.display = "none";
   } else {
    ele.style.display = "block";

   }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
