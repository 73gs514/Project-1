// global variables
let key;
let data;
let labels = [];
const searchBtn = document.querySelector("#search-button");
const filterBtn = document.querySelector(".filterBtn");
const table = document.querySelector(".table");

//returns the covid data in full
//will give this inform to function that makes a table
//@ apiKey STRING Required
//@ place STRING optional
//@ type STING optional
function getCovidData(apiKey, place, type) {
  fetch(`https://api.covidactnow.org/v2/states.json?apiKey=${apiKey}`)
    .then(res => res.json())
    .then(res => {
      console.log("covid res", res);
      //call another function that will display in table
      makeTables(res, labels);
    });
}

function getCovidKey() { 
  console.log("inside getCovidKey")
  fetch("../../apiKeys.json")
    .then(res => {
      console.log("inside .then of covidKey()")
      return res.json();
    })
    .then(res => {
      console.log("res", res);
      getCovidData(res.covidNowKey);
    }); 
};

searchBtn.addEventListener("click", function () {
  //gives you filters
  getChecked();
  //give you data
  getCovidKey();
});

let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    componentRestrictions: {'country' ['US']}
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
        document.getElementById('autocomplete').placeholder = 'Enter a place';
    } else 
        {console.log(place)}
    
}

//getChecked returns an ARRAY of filters to narrow what displays on the table
const getChecked = () => {
  //@ marked ARRAY of input type=CHECKBOX
  let marked = document.getElementsByName("filter");
  labels = [];
  //@ m is an individual checkbox elem of ARRAY marked
  //Each m has an ARRAY of labels of length 1
  for (let m of marked) {
    if (m.checked) {
      labels.push(m.labels[0].innerText.replace(/\s/g, ""));
    }
  }
  console.log(labels);
}

function toggleFilter () {

}

function makeTables (data, filters) {
  //for the columns take the length of filters
  //for the rows, make a check to only read the data that has the words that filters has.
  //the way you make these is after iterating
  //table (look at link for further help" https://stackoverflow.com/questions/14643617/create-table-using-javascript)
}

