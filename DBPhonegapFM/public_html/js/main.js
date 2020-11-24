var db;
$(document).ready(function(){
    $("#tomarFoto").click(function(){
        navigator.camera.getPicture(exitoFoto,errorFoto,{quality:50});
    });
    db=window.openDatabase("CONTACTOS2","","DESCRIPCION",200000);
    db.transaction(function(tx){
        tx.executeSql("CREATE TABLE CONTACTO(id integer not null primary key autoincrement,nombre,telefono);");
    },errorDB,exitoDB);
    $("#insertar").click(function(){
        db.transaction(function(tx){
            tx.executeSql("INSERT INTO CONTACTO(nombre,telefono)VALUES('FREDDY','12345678');");
        },errorDB,exitoDB);        
    });
    $("#leer").click(function(){
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM CONTACTO;",[],function(tx,rs){
                for(var i=0;i<rs.rows.length;i++){
                    var p=rs.rows.item(i);
                    window.alert("nombre="+p.nombre+"------telefono"+p.telefono);
                }
            });
        },errorDB,exitoDB);        
    });
});
function exitoFoto(url){
    $("#contenedorFoto").attr("src",url);
    $("#contenedorFoto").show();
}
function errorFoto(){
    window.alert("error");
}
function errorDB(){
    window.alert("error bd");
}
function exitoDB(){
    window.alert("exito bd");
}
