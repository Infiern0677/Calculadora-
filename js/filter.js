let ancho_r = [1200, 1220, 1220, 1220];
let dens_r = [7.85, 8.4, 7.85];


var tablaData = localStorage.getItem("tablaDataS");
tablaData = JSON.parse(tablaData);
if(tablaData == null){
  var tablaData = [];
}

var idP = localStorage.getItem("idP");
idP = JSON.parse(idP);
if(idP == null){
  var idP = 0;
}


function ShowSelected() {
  /* Para obtener el valor */
  var cod = document.getElementById("Type_c").value;
  //alert(cod);
  
  document.getElementById("tb_an").innerHTML = ancho_r[cod - 1];
  listar();
  
}

function eliminar(){
  localStorage.removeItem("tablaDataS");
  location.reload();

}

function guardar(){
   

  var _precio = document.getElementById("da").value;
  var _stock = document.getElementById("cr").value;

  if(_precio == "" | _stock == ""){

  }else{

    var objData = JSON.stringify({
      id: (idP > 0) ? idP : (tablaData.length + 1),
      da: _precio,
      cr: _stock
    });

    //if(idP > 0){for(){}}



    console.log(objData);
    tablaData.push(objData);
    localStorage.setItem("tablaDataS", JSON.stringify(tablaData));
    
  }
  document.getElementById("da").value = "";
  document.getElementById("cr").value = "";
  
}

function Calculart(){

  var _D27 = document.getElementById("D27").value;
  var _D26 = document.getElementById("D26").value;
  var _D25 = document.getElementById("D25").value;
  var _D24 = document.getElementById("D24").value;

  var resDEF, resPF;

  if(_D25 != "" & _D26 != "" & _D27 != ""){

    if(_D27 > 0 ){
      resPF = (7.85*3.1416*(_D25)/4)*(_D27*_D27/100 - (_D24*_D24)/100)/10000;
      //console.log(resPF);
    }else{
      resPF = 0;
    }
  
    if(_D26 > 0){
      resDEF = Math.sqrt((_D26*10000/(7.85*3.1416*(_D25)/4))+(_D24*_D24)/100)*10; 
      //console.log(resDEF);
    }else{
      resDEF = 0;
    }
  
    document.getElementById("res").innerHTML = "Diametro Externo fleje: "+ Math.trunc(resDEF) +" mm <br> Peso Fleje: "+ Math.trunc(resPF)+" kg";
  
  }else{
    document.getElementById("res").innerHTML = "<p class='text-danger' > Error no pueden quedar campos vacios</p>"
  }
  

  
}

function listar(){

  var dataFila = '';
  var _pr =  0;
  var _ar = document.getElementById("tb_an").innerHTML;
  var _dax_f= 0;


  if (tablaData.length > 0){

    

    for (const i in  tablaData){
      var vardata = JSON.parse(tablaData[i]);

      _pr += parseFloat(vardata.cr); 

    }
    for (const i in  tablaData){
      var vardata = JSON.parse(tablaData[i]);
      var _pu = 0;
      var _f = 0;
      var _cte = 0;
      var _crx_f = 0;

      if(vardata.da > 0){
        _pu = (parseFloat(vardata.da) / _ar )*_pr;
        //console.log(_pu);
      }else{
        _pu = 0;
      }

      if(_pu != 0){
        if(Math.floor(vardata.cr/_pu)){
          _f = Math.floor(vardata.cr/_pu);
        }else{
          _f = 0;
        };

      }else{
        _f = 0;
      }
      
      _cte = _f*_pu;
     
      _crx_f = vardata.da * _f;

      _dax_f += _crx_f;
      //console.log("cr "+vardata.da + "_F "+ _f);
      //console.log("_crx_f "+_crx_f);
      //console.log("ml "+_dax_f);


      dataFila += "<tr>";
      dataFila += "<td>"+vardata.id+"</td>";
      dataFila += "<td>"+vardata.da+"</td>";
      dataFila += "<td>"+vardata.cr+"</td>";
      dataFila += "<td>"+Math.trunc(_pu)+"</td>";
      dataFila += "<td>"+_f+"</td>";
      dataFila += "<td>"+Math.trunc(_cte)+"</td>";
      dataFila += "<td> <button class='btn btn-warning' onclick='editar("+vardata.id+")'>Editar</button></td>";

      


      dataFila += "</tr>";

    }

    
    document.getElementById("tb_pr").innerHTML = _pr;
    document.getElementById("tb_rm").innerHTML = (_ar-(_dax_f));
    document.getElementById("tb_rdp").innerHTML = ((_ar-_dax_f)/_ar)*100;
    document.getElementById("tb_rdk").innerHTML = Math.trunc(((_ar-_dax_f)/_ar)*_pr);
    
    document.getElementById("tablita").innerHTML = dataFila;
  }
}

function editar(id){
  if(id > 0){
    //Sacar inf y editar
    console.log(id);

  }else
  {
    console.log("No tienes registros");
  }
}

// wefwerfw

function ShowSelected2() {
  /* Para obtener el valor */
  var cod = document.getElementById("_sele_D").value;
  //alert(cod);
  
  document.getElementById("tb_dens").innerHTML = dens_r[cod - 1];
  //calcular();
}


