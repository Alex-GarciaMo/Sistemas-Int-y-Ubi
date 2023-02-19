const mymap = L.map('sample_map').setView([40.4030212, -3.692763], 15);

//Leganes/Uni: 40.3325327, -3.7667927
//Mi casa: 40.4030212, -3.692763


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(mymap);

mymap.on('click', function(e) {
  console.log(e);

})

var watchId;  
// Inicializamos el marcador para poder cambiarle su posición cuando se detecta un cambio.
var marker = L.marker([4.1,-3.1]).addTo(mymap);

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
    var position = [latitud,longitud]; 
    console.log(position);
    
    // Actualizamos la posición del marcador.
    var newLatLng = new L.LatLng(latitud, longitud);
    marker.setLatLng(newLatLng); 

    
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


// Para detener la geolocalización en tiempo real.
/*function detener() {
    navigator.geolocation.clearWatch(watchId);
}*/




