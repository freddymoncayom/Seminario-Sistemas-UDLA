
var app = {
   
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

  
    onDeviceReady: function() {
      

        document.getElementById("Llamar").onclick=Llamar_WebServices;



        function Llamar_WebServices() {
            var path="http://api.openweathermap.org/data/2.5/weather?q=";
            var ciudad= document.getElementById('ciudad').value;
            var key="&APPID=c49917228477976296507b48108b1fa1";
                 console.log("hola2");
                fetch(path+ciudad+key).
                then((respuesta) => {
              return respuesta.json();
              console.log("hola");
          } ).then((respuesta) => {
              console.log(respuesta);
              document.getElementById('nombre').value = respuesta.name;
              document.getElementById('temperatura').value = respuesta.main.temp;
			  document.getElementById('presion').value = respuesta.main.pressure;
			  document.getElementById('humedad').value = respuesta.main.humidity;
			  document.getElementById('wind').value = respuesta.wind.speed;
            }
          )}
        


    },






    receivedEvent: function(id) {
        
    }
};

app.initialize();