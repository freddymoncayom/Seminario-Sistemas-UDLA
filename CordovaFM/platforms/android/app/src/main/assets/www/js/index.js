
var app = {
   
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    
    receivedEvent: function(id) {
        document.getElementById("Tomar_foto").onclick=Tomar_foto;
        console.log('Received Event: ' + id);
        document.getElementById("videoCapture").onclick=videoCapture;
        console.log('Received Event: ' + id);
    }
};

function Tomar_foto(){
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.FRONT,
        saveToPhotoAlbum: true
        }
    );

    function onSuccess(ruta_de_la_foto) {
        document.getElementById("fotos").innerHTML+=
        "<div class='foto'><img src='"+ruta_de_la_foto+"'></div>"
    }
        function onFail(error) {
       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
}

function videoCapture() {
    var options = {
       limit: 1,
       duration: 10
    };
    navigator.device.capture.captureVideo(onSuccess, onError, options);
 
    function onSuccess(mediaFiles) {
       var i, path, len;
       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.log(mediaFiles);
          document.getElementById("videos").innerHTML+=
        "<div class='video'><video src='"+path+"'></video></div>"
       }
       
    }
 
    function onError(error) {
       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
 }
 function consultar(){
    nombre = $('#txtNombre').val();
    alert(nombre);

    var API_KEY = '16214558-f6b970016255961287754d201';
    var dir = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(nombre);

    $.ajax({
        url:dir,
        error:function(err){
            alert("No hay coincidencias");
            console.log(err);
        },
        beforeSend:function(){
            $("#divCargando").show();
        }
    }).done(function(data){
        $("#divCargando").hide();
        console.log('Iniciar la busqueda');
        const api = new XMLHttpRequest();
        api.open('GET', dir, true)
        api.send();
        api.onreadystatechange = function(){

            if(this.readyState == 4 && this.status==200){
                let datos = JSON.parse(this.responseText);
                console.log(datos.hits);
                let resultado = document.querySelector('#resultado')
                resultado.innerHTML = '';
                for(let item of datos.hits){
                    console.log(item.previewURL)
                    resultado.innerHTML += `<a class="black-text" href="${(item.pageURL)}"><img src="${(item.previewURL)}"/><h5>Tags:${(item.tags)}</h5><h5>Type:${(item.type)}</h5><h5>Author:${(item.user)}</h5></a>`;
                }
            }
        }
    });
            
}

app.initialize();