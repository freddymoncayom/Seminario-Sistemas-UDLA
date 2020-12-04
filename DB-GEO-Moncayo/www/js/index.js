var map;
var coord= {lat:-0.091990, lng:-78.475246};
var carolina= {lat:-0.195829,lng:-78.430377};
function iniciarMap(){
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom:10,
        center: coord,
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
    var marker = new google.maps.Marker({
        position: carolina,
        map: map
    });

    var distancia=[coord,carolina]
    var trazo = new google.maps.Polyline({path:distancia,strokeColor:"#01B91A",strokeOpacity:0.8,strokeWeight:3});
    trazo.setMap(map);
}