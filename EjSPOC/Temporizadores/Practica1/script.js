// Zoom con el que iniciamosla visión del mapa
var zoomInicial = 15;
var inicialRadio1 = 50, inicialRadio2 = 25;
  
// Creación del mapa
const mymap = L.map('sample_map', {
    zoomControl: true, // habilita los controles de zoom
    zoomSnap: 1, // establece la cantidad de zoom en 0.5
    doubleClickZoom: false, // deshabilita el zoom al hacer doble clic
    touchZoom: 'center', // establece el punto de enfoque del zoom en el centro de la pantalla
    wheelPxPerZoomLevel: 1000 // establece la cantidad de píxeles en 200
}).setView([40.4030212, -3.692763], zoomInicial);

//Leganes/Uni: 40.3325327, -3.7667927
//Mi casa: 40.4030212, -3.692763

// Mapa y el zoom máximo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(mymap);


var permission = false; // Si el usuario no permite la ubicación
 

// // Inicializamos o solo creamos las variables las cuales vamos a usar más adelante
var ubicacion = L.marker([4.1,-3.1]).addTo(mymap).bindPopup('Tu ubicación');
var watchId, destino, circle1, circle2, route;


// LOCALIZACIÓN

// La función watchPosition, detecta cambios en la posición del GPS.
if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(mostrarPosicion, mostrarErrores, opciones);   
} else {
    mymap.removeLayer(ubicacion);
    mymap.removeLayer(circle1);
    mymap.removeLayer(circle2);
    alert("Tu navegador no soporta la geolocalización, actualiza tu navegador.");
}

// Si al pedir la ubicación se genera algún error los gestionamos con esta función
function mostrarErrores(error) {
  // El permiso se deniega y eliminamos todos los marcadores precreados para tener el mapa limpio
    permission = false;
    mymap.removeLayer(ubicacion);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('Permiso denegado por el usuario'); 
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Posición no disponible');
            break; 
        case error.TIMEOUT:
            alert('Tiempo de espera agotado');
            break;
        default:
            alert('Error de Geolocalización desconocido :' + error.code);
    }
}

// Opciones de la función watchPosition
var opciones = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000
};

// MARCADOR UBICACIÓN

// Recogemos las coordenadas del usuario y las introducimos en el marcador
function mostrarPosicion(posicion) {
    permission = true; // Actualizamos, el permiso ha sido concedido
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;

    
    // Actualizamos la posición del marcador.
    var newLatLng = new L.LatLng(latitud, longitud);

    ubicacion.setLatLng(newLatLng); // Establecemos las nuevas coordenadas

    //Calculamos la distancia en metros entre los dos marcadores cada vez que detecta movimiento
    calcularDistancia();   
}


function calcularDistancia(){
  // Primero comprovamos que ambos marcadores están creados
  if (ubicacion != undefined & destino != undefined){
    var distance = mymap.distance(ubicacion._latlng, destino._latlng); 
    if (distance <= 50 & distance > 25){ // Si estamos al menos a 50 metros el movil vibra medio segundo
      console.log(distance);
      navigator.vibrate([4000]);
      setTimeout(function(){
        navigator.vibrate([]);
      },500);
    }
    if (distance <= 25){ // Si estamos al menos a 25 metros ya llegamos y vibra 2 segundos, para 1 y vibra otros 2
      console.log(distance);
      navigator.vibrate([2000]);
    }
  }
}

// ON CLICK

// Al clicar queremos crear los marcadores de destino y los círculos de rango.
mymap.on('click', function(coords) {
  if (permission) {
    reconocerDestino(coords.latlng)

    if (! route){ // Si la ruta no está creada, la creamos
        route = L.Routing.control({
            waypoints: [
                L.latLng(ubicacion._latlng),
                L.latLng(destino._latlng)
            ],
            routeWhileDragging: true
        }).addTo(mymap); 
    }
    
    
  }
})

// Reconoce si el marcador destino está creado o no
function reconocerDestino(coordenadas){

  if (destino != undefined){ // Si ya está creada solo le cambiamos la posición
    if(destino._mapToAdd == null){
      destino.addTo(mymap);
      circle1.addTo(mymap);
      circle2.addTo(mymap);
      destino.setLatLng(coordenadas);
      circle1.setLatLng(coordenadas);
      circle2.setLatLng(coordenadas);
    }
    
  } 
  else { // Si no está creado, lo creamos y le llevamos los marcadores circulares de rango
    destino = L.marker(coordenadas).addTo(mymap).bindPopup('Tu ubicación');
    circle1 = L.circle(coordenadas, { // Coordenadas aleatorias que no se vea en la posicion inicial
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: inicialRadio1,
      stroke: false,
    }).addTo(mymap);
    
    circle2 = L.circle(coordenadas, { 
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: inicialRadio2,
    }).addTo(mymap);

    //reescalarCirculos();
  }   
}


//APARTADO ZOOM


// // Cada vez que hacemos zoom recogemos la capa en la que estamos y reescalamos
// mymap.on('zoomend', function() {
//   //var newZoomLevel = mymap.getZoom();
//   if (destino != undefined){
//     //reescalarCirculos(); // Reescalado de los marcadores circulares de rango
//   }
  

//});

// Leaflet tiene la manía de que los marcadores cambian gráficamente de tamaño.
// Para no liar al usuario y ver siempre el mismo rango, reescalamos estos
// marcadores de la siguiente manera:

/* Calculamos la capa de zoom en la que estamos. En un primer intento 
intentamos simplemente ir operando con el radio de los marcadores circulares.
Sin embargo, si hacíamos zoom muy rápido, este reescalado no era estable.
Conseguimos regularlo para los usuarios del ordenador alterando el wheelPxPerZoomLevel
pero en el móvil seguíamos teniendo el mismo problema.
Esta implementación calcula el radio que deberían tener los marcadores ciruclares
en función de la capa en la que se ha quedado el usuario*/

// function reescalarCirculos(){

//   // La diferencia entre la capa de zoom en la que está el usuario y la capa inicial
//   var newZoomLevel = mymap.getZoom();
  
//   var difference = newZoomLevel - zoomInicial

//   // Radios iniciales
//   var newRadius1 = inicialRadio1;
//   var newRadius2 = inicialRadio2;

//   // Tratamos todas las posibilidades
//   if (difference > 0){    
    
//     for (var i = 1; i <= difference; i++) { // Cálculo del radio equivalente para esa capa
//       newRadius1 = newRadius1 * 2; 
//       newRadius2 = newRadius2 * 2;
      
//     }

//     circle1.setRadius(newRadius1);
//     circle2.setRadius(newRadius2);
//   }
//   if (difference < 0){
    
//     for (var i = 1; i <= (difference*(-1)); i++) {
//       newRadius1 = newRadius1 / 2;
//       newRadius2 = newRadius2 / 2;
      
//     }

//     circle1.setRadius(newRadius1);
//     circle2.setRadius(newRadius2);
//   }
  
//   if (difference == 0){
    
//     circle1.setRadius(14);
//     circle2.setRadius(7);
//   }
// };

// Para detener la geolocalización en tiempo real.
/*function detener() {
    navigator.geolocation.clearWatch(watchId);
}*/

// Añadimos a las variables de control un botón para que esté dentro del mapa
var customDeleteButton = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function () {
        var button = L.DomUtil.create('button', 'custom-control-button');
        button.innerHTML = 'Delete marker';
        button.addEventListener('click', function(e) { // Eliminamos marcador
            e.stopPropagation();
            if (destino){
              destino.setLatLng([0,0]);
              circle1.setLatLng([0,0]);
              circle2.setLatLng([0,0]);
              mymap.removeLayer(destino);
              mymap.removeLayer(circle1);
              mymap.removeLayer(circle2);
              mymap.removeControl(route);
              route = null;
            }
            
        });
        return button;
    }
});

var customStopGPSButton = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function () {
        var button = L.DomUtil.create('button', 'custom-control-button');
        button.innerHTML = 'Stop GPS';
        button.addEventListener('click', function(e) { // Eliminamos marcador
            e.stopPropagation();
            navigator.geolocation.clearWatch(watchId);
            permission = false;
            mymap.removeLayer(ubicacion);
            mymap.removeLayer(destino);
            mymap.removeLayer(circle1);
            mymap.removeLayer(circle2);
            alert('Ya no calcularemos su ubicación. \nRecarga la página para recuperarla')
        });
        return button;
    }
});

mymap.addControl(new customDeleteButton());
mymap.addControl(new customStopGPSButton());

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);