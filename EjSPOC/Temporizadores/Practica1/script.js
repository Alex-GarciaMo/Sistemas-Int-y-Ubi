const mymap = L.map('sample_map').setView([40.4030212, -3.692763], 15);

//Leganes/Uni: 40.3325327, -3.7667927
//Mi casa: 40.4030212, -3.692763


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(mymap);




var watchId;  
// Inicializamos los marcadores para poder cambiar sus posiciónes.
var ubicacion = L.marker([4.1,-3.1]).addTo(mymap).bindPopup('Tu ubicación');
var destino = L.marker([4.1,-3.1]).addTo(mymap).bindPopup('Tu destino');
var circle1 = L.circleMarker([4.1,-3], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50,
    stroke: false,
}).addTo(mymap);
var circle2 = L.circleMarker([4.1,-3], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 20,
}).addTo(mymap);


mymap.on('click', function(coords) {
    //console.log(coords.latlng);
    destino.setLatLng(coords.latlng);
    circle1.setLatLng(coords.latlng);
    circle2.setLatLng(coords.latlng);  

    
 
  })

/*mymap.on('click', function(e){
    var latitud = e.latlng.lat;
    var longitud = e.latlng.lng;
    var circoodrs = [latitud,longitud];
    var circle = L.circle(circoodrs, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
})*/

//´La función watchPosition, detecta cambios en la posición del GPS.
if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(mostrarPosicion, mostrarErrores, opciones);   
} else {
    alert("Tu navegador no soporta la geolocalización, actualiza tu navegador.");
}

function mostrarPosicion(posicion) {
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;

    //Para ver coordenadas por consola
    //var position = [latitud,longitud]; 
    //console.log(position);
    
    // Actualizamos la posición del marcador.
    var newLatLng = new L.LatLng(latitud, longitud);
    //console.log(newLatLng);
    ubicacion.setLatLng(newLatLng); 

    //Calculamos la distancia en metros entre los dos marcadores
    var distance = mymap.distance(ubicacion._latlng, destino._latlng);
    if (distance <= 50){
        console.log(distance);
    }
    

    
}

function mostrarErrores(error) {
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

var opciones = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000
};


//function establecerDestino(){

//}

// Para detener la geolocalización en tiempo real.
/*function detener() {
    navigator.geolocation.clearWatch(watchId);
}*/

function vibratePhone() {
    // Comprobar si el dispositivo es compatible con la API de vibración
    console.log('Entramos en la funcion');
  
    // Hacer vibrar el teléfono durante 1 segundo
    navigator.vibrate(1000);
    console.log('Esta vibrando');
  }
  
  // Hacer que el teléfono vibre cada 10 segundos
  
  setInterval(vibratePhone, 10000);



