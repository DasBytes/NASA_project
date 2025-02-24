const NASA_API_KEY = "rwX3pO8mONvdxngtstqSuNfwhrwMoGTy6clxqSnu"; 
const NASA_BASE_URL = "https://api.nasa.gov";


async function fetchAPOD() {
    const response = await fetch(`${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`);
    const data = await response.json();
    document.getElementById("apod-container").innerHTML = `
        <h3>${data.title}</h3>
        <img src="${data.url}" alt="APOD Image">
        <p>${data.explanation}</p>
    `;
}


async function fetchMarsPhotos() {
    const sol = document.getElementById("sol").value;
    const camera = document.getElementById("camera").value;
    const response = await fetch(`${NASA_BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${NASA_API_KEY}`);
    const photos = await response.json();
    document.getElementById("mars-container").innerHTML = photos.photos.slice(0, 5).map(photo => `
        <img src="${photo.img_src}" alt="Mars Photo">
    `).join('');
}

async function fetchEarthImage() {
    const response = await fetch(`${NASA_BASE_URL}/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=${NASA_API_KEY}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    document.getElementById("earth-container").innerHTML = `<img src="${url}" alt="Earth Image">`;
}




async function fetchAsteroids() {
    const response = await fetch(`${NASA_BASE_URL}/neo/rest/v1/feed?start_date=2025-02-23&end_date=2025-02-24&api_key=${NASA_API_KEY}`);
    const data = await response.json();
    const asteroidList = data.near_earth_objects[Object.keys(data.near_earth_objects)[0]];
    document.getElementById("asteroid-container").innerHTML = asteroidList.map(asteroid => `
        <li>${asteroid.name} - ${asteroid.estimated_diameter.meters.estimated_diameter_max ? `Diameter: ${asteroid.estimated_diameter.meters.estimated_diameter_max}m` : 'Diameter information not available'}</li>
    `).join('');
}

    function changeSize() {
        const apodContainer = document.getElementById('apod-container');
        if (apodContainer.style.width === '200px') {
            apodContainer.style.width = '400px';
            apodContainer.style.height = '400px';
        } else {
            apodContainer.style.width = '200px';
            apodContainer.style.height = '200px';
        }
    }

    function changeShape() {
        const apodContainer = document.getElementById('apod-container');
        if (apodContainer.style.borderRadius === '50%') {
            apodContainer.style.borderRadius = '0';
        } else {
            apodContainer.style.borderRadius = '50%';
        }
    }
