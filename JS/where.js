/* Horizontal Scroll Animation */
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    scrub: 2, 
    end: "+=3000",
    pin: true,
    snap: {snapTo: 1 / (sections.length - 1), directional: false},
  }
});

var width;

/* North Philly Map JS */
function initializeNorthMap() {
  var zoomLevel = 10;
  const northPolygon = [ 
    [40.084192, -75.176304],
    [40.046619, -75.111073],
    [40.039103, -75.114392],
    [40.063627, -75.087082],
    [40.068718, -75.096535],
    [40.137734, -75.014332],
    [40.118562, -74.964183],
    [40.095204, -74.955504],
    [40.077143, -74.963164],
    [40.062956, -74.980673],
    [40.051919, -74.978613],
    [40.006045, -75.056548],
    [39.986213, -75.070687],
    [39.979916, -75.080761],
    [39.964860, -75.129549],
    [39.959840, -75.134460],
    [39.964302, -75.176143],
    [39.973106, -75.186187],
    [39.977684, -75.189432],
    [39.999954, -75.187169],
    [40.006866, -75.192892],
    [40.053576, -75.262890],
    [40.092720, -75.223652],
    [40.072756, -75.188216],
    [40.083994, -75.177257]
  ];

  const northBoundaries = [
    [40.143837, -74.841971],
    [40.004248, -74.737715],
    [39.839529, -75.181449],
    [40.091464, -75.343352]
  ];

  var map = L.map('northMap').setView([40.007447, -75.140599], zoomLevel);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxBounds: bounds,
      maxZoom: 14,
      minZoom: 9, 
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  var polygon = L.polygon([
      northPolygon
  ]).addTo(map);

  var bounds = L.latLngBounds([
    northBoundaries
  ]);
  map.setMaxBounds(bounds);
  map.on('drag', function() {
    var currentBounds = map.getBounds();
    if (!bounds.contains(currentBounds)) {
      map.panInsideBounds(bounds, { animate: false });
    }
  });
  
  polygon.getBounds().getCenter();

  var redCircle = L.circle([40.008236, -75.127896], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 6000
  }).addTo(map);

  var yellowCircle = L.circle([40.055861, -75.040068], {
    color: 'yellow',
    fillColor: '#FFFF00',
    fillOpacity: 0.5,
    radius: 3000
  }).addTo(map);

  var greenCircle = L.circle([40.097894, -75.002303], {
    color: 'green',
    fillColor: '#00FF00',
    fillOpacity: 0.5,
    radius: 3000
  }).addTo(map);

  var greenCircle2 = L.circle([40.061498, -75.220601], {
    color: 'green',
    fillColor: '#00FF00',
    fillOpacity: 0.5,
    radius: 3500
  }).addTo(map);

  redCircle.bindTooltip("Estimated amount of cases in this area: 500-660", { direction: 'top' });
  yellowCircle.bindTooltip("Estimated amount of cases in this area: 80-99", { direction: 'top' });
  greenCircle.bindTooltip("Estimated amount of cases in this area: 15-20", { direction: 'top' });
  greenCircle2.bindTooltip("Estimated amount of cases in this area: 1-5", { direction: 'top' });


  /* Resizing Leaflet Map */
  if (window.innerWidth <= 375) {
    map.setZoom(9);
  }
}


/* South Philly Map JS */
function initializeSouthMap() {

  const southPhillyPolygon = [
    [39.943196, -75.200320],
    [39.941023, -75.194179],
    [39.946395, -75.186228],
    [39.940552, -75.141941],
    [39.897695, -75.136011],
    [39.889908, -75.142511],
    [39.884745, -75.192917],
    [39.889995, -75.193373],
    [39.884364, -75.197045],
    [39.872667, -75.216274],
    [39.875996, -75.215805],
    [39.872667, -75.240427],
    [39.876536, -75.262352],
    [39.887153, -75.264932],
    [39.932967, -75.242727],
    [39.932449, -75.237658],
    [39.938149, -75.235124],
    [39.938020, -75.240192],
    [39.942100, -75.243487],
    [39.946375, -75.231745],
    [39.942813, -75.207922],
  ];

  const southPhillyBounds = [
    [39.957007, -75.162629], //top 
    [39.912277, -75.060055], //right
    [39.816367, -75.168424], //bottom 
    [39.922179, -75.278431]  //left
  ];

  var southPhillyMap = L.map('southMap').setView([39.923078, -75.172518], 11);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxBounds: boundsSouth,
      maxZoom: 14,
      minZoom: 10, 
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(southPhillyMap);

  var polygonSouth = L.polygon([
      southPhillyPolygon
  ]).addTo(southPhillyMap);

  var boundsSouth = L.latLngBounds([
      southPhillyBounds
  ]);
  southPhillyMap.setMaxBounds(boundsSouth);
  southPhillyMap.on('drag', function() {
    var currentBounds = southPhillyMap.getBounds();
    if (!boundsSouth.contains(currentBounds)) {
      southPhillyMap.panInsideBounds(boundsSouth, { animate: false });
    }
  });

  polygonSouth.getBounds().getCenter();

  var circle = L.circle([39.906752, -75.205992], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 4750
  }).addTo(southPhillyMap);

  circle.bindTooltip("Estimated amount of cases in this area: 117-130", { direction: 'top' });

   /* Resizing Leaflet Map */
   /*
   window.addEventListener('resize', function(event){
    var width = window.innerWidth;
    console.log(width);
    if (width < 1440) { 
      map.setView(new L.LatLng(39.926567, -75.169428, 8))
    } else if (width < 1024) {
      map.setView(new L.LatLng(39.926106, -75.168055, 8))
    } else if (width < 981) {
      map.setView(new L.LatLng(39.925316, -75.171488, 8));
    } else if (width < 768) {
      map.setView(new L.LatLng(39.922486, -75.176467, 8));
    }
  });
  */

}

/* West Philly Map */
function initializeWestMap() {
  const westPhillyPolygon = [
    [39.973861, -75.280426],
    [40.011904, -75.205398],
    [40.010472, -75.203798],
    [40.007031, -75.192707],
    [40.005740, -75.191092],
    [40.003804, -75.190601],
    [39.999643, -75.190864],
    [40.000156, -75.186843],
    [39.996627, -75.187429],
    [39.992391, -75.185921],
    [39.978526, -75.188853],
    [39.977628, -75.189356],
    [39.973391, -75.186843],
    [39.973262, -75.185628],
    [39.964087, -75.175967],
    [39.964179, -75.182590],
    [39.959705, -75.179060],
    [39.955193, -75.179035],
    [39.955259, -75.179979],
    [39.947232, -75.186417],
    [39.947561, -75.187189],
    [39.942823, -75.193712],
    [39.944534, -75.200235],
    [39.944139, -75.203025],
    [39.941441, -75.205857],
    [39.942856, -75.208003],
    [39.945770, -75.235195],
    [39.942320, -75.243428],
    [39.942741, -75.246722],
    [39.951325, -75.251222],
    [39.956921, -75.249301],
    [39.958772, -75.250454],
    [39.960665, -75.247929],
    [39.963694, -75.248258],
    [39.965019, -75.254104],
    [39.963262, -75.256914],
    [39.965179, -75.258586],
    [39.966025, -75.260519],
    [39.965787, -75.262259],
    [39.966032, -75.267209],
    [39.968319, -75.270626],
    [39.974496, -75.281247],
  ]

  const westPhillyBounds = [
    [40.030139, -75.201167], //top 
    [39.956580, -75.074355], //right
    [39.876283, -75.226318], //bottom 
    [39.980732, -75.331632]  //left
  ];

  var westPhillyMap = L.map('westMap').setView([39.973798, -75.225443], 11);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      minZoom: 10, 
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(westPhillyMap);
  
  var polygonWest = L.polygon([
      westPhillyPolygon
  ]).addTo(westPhillyMap);
  
  var boundsWest = L.latLngBounds([
    westPhillyBounds
  ]);
  westPhillyMap.setMaxBounds(boundsWest);
  westPhillyMap.on('drag', function() {
    var currentBounds = westMap.getBounds();
    if (!boundsWest.contains(currentBounds)) {
      westPhillyMap.panInsideBounds(boundsWest, { animate: false });
    }
  });  

  polygonWest.getBounds().getCenter();

  var redCircle = L.circle([39.969334, -75.251614], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 2500
  }).addTo(westPhillyMap);

  var yellowCircle = L.circle([39.987619, -75.211102], {
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.5,
    radius: 1500
  }).addTo(westPhillyMap);

  var yellowCircle2 = L.circle([39.965519, -75.202004], {
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.5,
    radius: 1500
  }).addTo(westPhillyMap);

  var greenCircle = L.circle([39.952493, -75.221745], {
    color: 'green',
    fillColor: '#00FF00',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(westPhillyMap);

  redCircle.bindTooltip("Estimated amount of cases in this area: 180-200", { direction: 'top' });
  yellowCircle.bindTooltip("Estimated amount of cases in this area: 42-76", { direction: 'top' });
  yellowCircle2.bindTooltip("Estimated amount of cases in this area: 42-57", { direction: 'top' });
  greenCircle.bindTooltip("Estimated amount of cases in this area: 10-18", { direction: 'top '});

}



/* Controlling Map Functions */
var northMap = document.getElementById('northMap');
var southMap = document.getElementById('southMap');
var westMap = document.getElementById('westMap');

/* Click to Expand */
var clickToExpandNorth = document.getElementById('expandMapNorth');
var clickToExpandSouth = document.getElementById('expandMapSouth');
var clickToExpandWest = document.getElementById('expandMapWest')

/* Click to Close */
var closeMapButtonNorth = document.getElementById('closeMapNorth'); 
var closeMapButtonSouth = document.getElementById('closeMapSouth'); 
var closeMapButtonWest = document.getElementById('closeMapWest')


function expandMap(causeId) {
  if (causeId === 'northPhilly') {
    clickToExpandNorth.style.display = 'none';
    closeMapButtonNorth.style.display = 'block'; 
    northMap.classList.remove('hidden');
    northMap.classList.add('visible');

    initializeNorthMap();
  } else if (causeId === 'southPhilly') {
    clickToExpandSouth.style.display = 'none';
    closeMapButtonSouth.style.display = 'block'; 
    southMap.classList.remove('hidden');
    southMap.classList.add('visible');

    initializeSouthMap();
  } else if (causeId === 'westPhilly') {
    clickToExpandWest.style.display = 'none';
    closeMapButtonWest.style.display = 'block'; 
    westMap.classList.remove('hidden');
    westMap.classList.add('visible');

    initializeWestMap();
  }
}

function closeMap() {
  northMap.classList.remove('visible');
  northMap.classList.add('hidden');
  southMap.classList.remove('visible');
  southMap.classList.add('hidden');
  westMap.classList.remove('visible');
  westMap.classList.add('hidden');

  // Add back the click to expand 
  clickToExpandSouth.style.display = 'block';
  clickToExpandNorth.style.display = 'block';
  clickToExpandWest.style.display = 'block';

  // Remove the Close Button 
  closeMapButtonNorth.style.display = 'none'; 
  closeMapButtonSouth.style.display = 'none'; 
  closeMapButtonWest.style.display = 'none';
}

/* Loading */
var preloader = document.getElementById("preloader")

window.addEventListener("load", removePreloader);

function removePreloader() {
  preloader.classList.add("removePreloader");
}

