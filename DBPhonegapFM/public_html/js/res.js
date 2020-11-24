var db;
$(document).ready(function(){
    db = window.openDatabase("DBCONTACTO", "", "DBCONTACTO", 200000);
    window.alert(db.version);
    db.transaction(function(tx){
        var query="CREATE TABLE IF NOT EXISTS CONTACTOS (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nombre,telefono)";
        tx.executeSql(query);
    },errorDb,exitoDb);
    $("#tomarFoto").click(function(){
        navigator.camera.getPicture(exitoFoto,errorFoto,{quality:50});
    });
    $("#insertar").click(function(){
        var query="insert into CONTACTOS (nombre,telefono)values('eugenio','44444');";
        db.transaction(function(tx){
            tx.executeSql(query);
        },errorDb,exitoDb);
    });
    $("#leer").click(function(){
        var query="SELECT * FROM CONTACTOS;";
        db.transaction(function(tx){
            tx.executeSql(query,[],function(tx,rs){
                for(var i=0;i<rs.rows.length;i++){
                    window.alert("nombre="+rs.rows.item(i).nombre+"---telefono="+rs.rows.item(i).telefono);
                }
            });
        },errorDb,exitoDb);
    });
});
function exitoFoto(url){
    $("#contenedorFoto").attr("src",url);
    $("#contenedorFoto").show();
}
function errorFoto(){
    window.alert("error");
}
function exitoDb(){
    window.alert("exito");
}
function errorDb(){
    window.alert("error");
}

