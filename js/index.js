            var datos_dat=new Map(); 
			var profes=new Map(); 
			 var fechas_map=new Map();
			
			var capturfechas = new Array();
		    
		    var fechainicio='';
		    var fechafin='';
			var file1=false;
			var file2=false;
  
			  function leerArchivo(e) {
				  
		             
				  var archivo = e.target.files[0];
				  if (!archivo) {
					return;
				  }
				  var lector = new FileReader();
				  lector.onload = function(e) {
					var contenido = e.target.result; 
					var lines = contenido.trim().split('\n');
					for(var line = 0; line < lines.length; line++){
						
						var linevec=(lines[line].trim().replace(RegExp("\\t", "g"), ";").replace(RegExp("\\s", "g"), ";")).split(';');
						var fecha=linevec[1];
						
						if(!capturfechas.includes(fecha)){
							capturfechas.push(fecha);
						}
						
						if(datos_dat.has(linevec[0])){
							var valuein = datos_dat.get(linevec[0]);
							var valueinput = new Array(); 
								valueinput.fecha=fecha;
								valueinput.hora=linevec[2];
								
							    valuein.push(valueinput);
						        datos_dat.set(linevec[0],valuein); 
 
						}else{
								var valueinput = new Array(); 
								valueinput.fecha=linevec[1];
								valueinput.hora=linevec[2];
								datos_dat.set(linevec[0],new Array(valueinput)); 
						}
					}
					 file1=true;  validabuton();
				  };
				  lector.readAsText(archivo);
				  
				}
				
			 function openFileprofesores(e) {
				 
				  
				   var archivo = e.target.files[0];
				  if (!archivo) {
					return;
				  }
				  var lector = new FileReader();
				  lector.onload = function(e) {
					var contenido = e.target.result;  
							var lines = contenido.trim().split('\n');
								for(var line = 0; line < lines.length; line++){
									var lineass = lines[line].split(';'); 
											if(!profes.has(lineass[0])){ 
													profes.set(lineass[0],lineass[1].trim().replace(RegExp("\\n", "g"), ";").replace(RegExp("\\t", "g"), ";"));  
											}  			
									
								}
					file2=true; 
					validabuton();
				  };
				  lector.readAsText(archivo);
				 
				}
		function validabuton(){
			 
				if(file2==true&&file1==true){
					$("#botonvalidar").prop("disabled", false);
					$('#botonvalidar').show(); 
					 importarScript("js/trfdp.js");
				}else{
					$("#botonvalidar").prop("disabled", true);
					$('#botonvalidar').hide(); 
					 removeJS("trfdp.js");
				}
				

		}
 
 function validar(){ 
	 removeJS("ttrfdp.js");
	 
	var dias=["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var meses=["Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov",
        "Dic"];
	
	
	     ///var fechas = new Array();
				 capturfechas.sort(function(a, b) {
					var dateA = new Date(a), dateB = new Date(b);
					return dateA - dateB;
				}); 
				var dateini=new Date(fechainicio+' 00:00:00'); 
				var datefin=new Date(fechafin+' 00:00:00'); 
				var dateuno=parseInt(dateini.getFullYear()+""+(((dateini.getMonth()+1)<10)?"0"+(dateini.getMonth()+1):(dateini.getMonth()+1))+((dateini.getDate()<10)?"0"+dateini.getDate():dateini.getDate())); 
				var datedos=parseInt(datefin.getFullYear()+""+(((datefin.getMonth()+1)<10)?"0"+(datefin.getMonth()+1):(datefin.getMonth()+1))+((datefin.getDate()<10)?"0"+datefin.getDate():datefin.getDate())); 
			 
			 
		 
			
			 var puntero=1099;
			 
			  
				for(var index in capturfechas){ 
				      var datenow=new Date(capturfechas[index]+' 00:00:00'); 
					  
					   var ahora=parseInt(datenow.getFullYear()+""+(((datenow.getMonth()+1)<10)?"0"+(datenow.getMonth()+1):(datenow.getMonth()+1))+((datenow.getDate()<10)?"0"+datenow.getDate():datenow.getDate())); 
					 
					  if(dateuno<=ahora&&ahora<=datedos){
							// fechas.push(capturfechas[index]);
 							   
						    if(fechas_map.has("table"+puntero)){
								var valuein = fechas_map.get("table"+puntero);
								 valuein.push(capturfechas[index]); 
								 fechas_map.set("table"+puntero,valuein); 
								 if(valuein.length>=15){
									 puntero++;
								 }
	 
							}else{
								 fechas_map.set("table"+puntero,new Array(capturfechas[index])); 
							}
								 
							 
					  }
				  }
				 var salidalineas='';
					fechas_map.forEach(function(fechas, idtable) { 
					  
					  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
								   var out=new Map();	
							 salidalineas+='<table id="'+idtable+'" class="table"> '; 
							datos_dat.forEach(function(valor, clave) {
								 
								   var datosfinal = new Array(fechas.length);
								  for(var indexo in valor){ 
									 if(fechas.includes(valor[indexo].fecha)){
										 
										 var puntero =fechas.indexOf(valor[indexo].fecha);
										 
										 if(datosfinal[puntero]=== undefined){
											 datosfinal[puntero]=valor[indexo].hora;
										 }else{ 
											// var fechaultimo=datosfinal[puntero].split('<br>'); 
											// if( restarHoras(fechaultimo[fechaultimo.length-1],valor[indexo].hora)){
												datosfinal[puntero]=datosfinal[puntero]+'<br>'+valor[indexo].hora;  
											// }   
										 }
										 
									 }
									 
									 // else{
										// console.log("no :"+valor[indexo].fecha); 
									 // }
									 
								  } 
								  out.set(clave,datosfinal);
								 
								}); 
				
				 
								salidalineas+=('<thead class="thead-dark"><tr><th style="width: 40px;">ID</th><th style="width: 120px;">NOMBRE</th>');
								for(var index in fechas){ 
									var fechaindexxx=new Date(fechas[index]+' 00:00:00'); 
										salidalineas+=('<th style="width: 66px;">'+meses[fechaindexxx.getMonth()]+' - '+fechaindexxx.getDate()+'<br>'+dias[fechaindexxx.getDay()]+'</th>');
							  }
								salidalineas+=('</tr></thead><tbody>');	  
								
						profes.forEach(function(valor, clave) {
							   if(out.has(clave)){
								   salidalineas+=('<tr><td style="vertical-align: middle;">'+clave+'</td><td style="font-size:11px;vertical-align: middle;text-align: left;">'+valor+'</td>');
								   var arrayinout=out.get(clave); 
									 for(var i=0;i<arrayinout.length;i++){ 
										 if (arrayinout[i]=== undefined) {
											 salidalineas+=('<td style="font-size:12px;vertical-align: middle;"></td>');
										  }else{
											 salidalineas+=('<td style="font-size:12px;vertical-align: middle;">'+arrayinout[i]+'</td>');
										  } 
									 }
								  salidalineas+=('</tr>');	  
							   }else{
								 salidalineas+=('<tr><td style="vertical-align: middle;">'+clave+'</td><td style="font-size:11px;vertical-align: middle; text-align: left;">'+valor+'</td></tr>');
							   }
							});
						salidalineas+=('</tbody></table>');	
					  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	}); 
				
				
				
				
				
				
				
				
			
			
			
			
			
			
			     $('#cuerpo1').hide(); 
			     $('#cuerpo3').hide(); 
			     $('#cuerpo4').hide(); 
				 $('#cuerpo2').show(); 
	  $('#tabless').html(salidalineas);
		// var blob = new Blob([salidalineas], {type: 'plain/text',   endings: 'native'});
		 // saveAs(blob, "time_"+moment().format()+".csv");
		 
	      importarScript("js/ttrfdp.js"); 
	 $('#tabless table').map(function( pos, tabla ) { 
		  console.log($(tabla).attr('id'));
		});
 }
 
 
 
 function seleciondefechas(start, end) { 
	   fechainicio=start.format('YYYY-MM-DD');
	   fechafin=end.format('YYYY-MM-DD'); 
	   $("#botonavalidar").prop("disabled", false);
       $('#botonavalidar').show(); 
}
	
 function sig(){ 
  $("#botonavalidar").prop("disabled", true);
  $('#botonavalidar').hide(); 
  
 $("#fechasistencia").daterangepicker({
    forceUpdate: true,
    autoUpdateInput:true,
    autoApply:true,
    showDropdowns: true, 
   
    maxDate:moment(),
    minDate: moment().subtract(3, 'months'),
     
    locale: {
      separator: " hasta ",
      format: "YYYY-MM-DD", 
      applyLabel: "Seleccionar",
      cancelLabel: "cancelar",
      fromLabel: "Desde",
      toLabel: "Hasta",
      customRangeLabel: "Seleccionar rango",
      daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
        "Diciembre"],
      firstDay: 1
    }
     
    },seleciondefechas);	
	 
	$('#cuerpo1').hide(); 
	$('#cuerpo2').hide(); 
	$('#cuerpo3').hide(); 
	 $('#cuerpo4').show(); 
	       
 }
 
 function print(){ 
	   
		var doc = new jsPDF('l', 'mm', 'letter');
		doc.setProperties({ title: 'Asistencia'  }); 
		
      
	   
	 
	  
	  
	  
	  
	  $('#tabless table').map(function( pos, tabla ) { 
		 
		if(pos==0){
			doc.setFontSize(6);
			moment.locale('es');
			doc.text(moment().format('LLLL'),14, 14);
			doc.setFontSize(12);
			centrarText(doc,"SISTEMA DE CONTROL BIOMETRICO",20); 
			doc.setFontSize(11);  
			centrarText(doc,'Unidad Educativa "LA MERCED"',26);
			doc.setFontSize(10);  
			doc.setFontStyle('bold'); 
			centrarText(doc,'Lista de Asistencia  ('+(pos+1)+' de '+fechas_map.size+')',35);
			doc.setFontStyle('normal');
			 doc.autoTable({html: '#'+$(tabla).attr('id'),theme: 'striped',
      styles: {
        lineColor: [211, 211, 211],
        lineWidth: 0.2,
        halign: 'center',
		valign: 'middle',
		fontSize:6
      },
      headStyles: {
        fillColor: [203, 207, 212] ,
        textColor:[0, 0, 0] ,
        fontStyle:'bold',
		fontSize:6
       },startY: 42});
		}else{
			doc.addPage();
			doc.setFontSize(6);
			moment.locale('es');
		    doc.text(moment().format('LLLL'),14, 14);
			doc.setFontSize(12);
			centrarText(doc,"SISTEMA DE CONTROL BIOMETRICO",20); 
			doc.setFontSize(11);  
			centrarText(doc,'Unidad Educativa "LA MERCED"',26);
			doc.setFontSize(10);  
			doc.setFontStyle('bold');
			centrarText(doc,'Lista de Asistencia  ('+(pos+1)+' de '+fechas_map.size+')',35);
			doc.setFontStyle('normal');
			doc.autoTable({html: '#'+$(tabla).attr('id'),theme: 'striped',
      styles: {
        lineColor: [211, 211, 211],
        lineWidth: 0.2,
        halign: 'center',
		valign: 'middle',
		fontSize:6
      },
      headStyles: {
        fillColor: [203, 207, 212] ,
        textColor:[0, 0, 0] ,
        fontStyle:'bold',
		fontSize:6
       },startY: 42 });
		}
		
		});
	  
	  
	  
	  
	  
	  
	  
        //doc.autoPrint();
       // doc.output("dataurlnewwindow");
      $("#planout").attr("src",doc.output('datauristring')); 		
		 $('#cuerpo1').hide(); 
		  $('#cuerpo2').hide(); 
		  $('#cuerpo3').show(); 
		
 }
 function centrarText(doc,texto,posvertical){
  var pageSize = doc.internal.pageSize;
  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  var dime=doc.getTextDimensions(texto); 
  doc.text(texto,(pageWidth/2)-(dime.w/2),posvertical);
}
 
 function returnini(){
	location.reload(); 
 }
 
 
function importarScript(nombre) {
	
    var s = document.createElement("script");
    s.src = nombre;
	 
    document.querySelector("body").appendChild(s);
}

function removeJS(filename){
 var tags = document.getElementsByTagName('script');
 for (var i = tags.length; i >= 0; i--){  
  if (tags[i] && tags[i].getAttribute('src') != null && tags[i].getAttribute('src').indexOf(filename) != -1)
   tags[i].parentNode.removeChild(tags[i]); 
 }
}      
function restarHoras(inicio,fin) {
 
  var paso=true;
  inicioMinutos = parseInt(inicio.substr(3,2));
  inicioHoras = parseInt(inicio.substr(0,2));
  
  finMinutos = parseInt(fin.substr(3,2));
  finHoras = parseInt(fin.substr(0,2));

  transcurridoMinutos = finMinutos - inicioMinutos;
  transcurridoHoras = finHoras - inicioHoras;
  
  if (transcurridoMinutos < 0) {
    transcurridoHoras--;
    transcurridoMinutos = 60 + transcurridoMinutos;
  } 
  if(transcurridoHoras==0){
	  if(transcurridoMinutos<20){
		  paso=false;
	  }else{
		paso=true;  
	  }
  }else{
	  paso=true;
  }
  
 return paso; 
}
			
				document.getElementById('file-input')
				  .addEventListener('change', leerArchivo, false);
				document.getElementById('profes')
				  .addEventListener('change', openFileprofesores, false);
				  
				  
  
 