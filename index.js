//test connection
//console.log("hello")

// create map & tiles
let map = L.map('map').setView([33.630554, -112.366669], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// obtain user's location
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
    var marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
}

let cords = getCoords()
console.log(cords)

// foursquare fetch
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
    }
  };
  
  fetch('https://api.foursquare.com/v3/places/search', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// foursquare business
async function placeSearch() {
    try {
        const searchParams = new URLSearchParams({
          query: 'coffee',
          near: 'Surprise, AZ',
          open_now: 'true',
          sort: 'DISTANCE'
        });
        const results = await fetch(
          `https://api.foursquare.com/v3/places/search?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8=',
            }
          }
        );
        const data = await results.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}



