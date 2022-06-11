$(document).ready(function(){
//boutons fichier : nouveau, sauver, ouvrir, exporter
		//tout supprimer
		$("#nouveau").on('click',function(){
			if (confirm('Tout le travail en cours sera effacé. Continuer ?')){
				donnees.dialogues=[];
				selection=null;
				naviguer("home");
				$("#formulaire fieldset").prop("disabled",true);
			}
		});

		//sauvegarder fichier json
		$("#sauver" ).on('click',function(){
			chargerboite();
			var sauvegarde=[...donnees.dialogues];
			//var style=myCodeMirror.getValue();
			//style=style+"/*^^*/";
			//sauvegarde.push(style);
			let dataStr = JSON.stringify(sauvegarde);
			let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

			let exportFileDefaultName = 'data.miaou';

			let linkElement = document.createElement('a');
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', exportFileDefaultName);
			linkElement.click();
		});

		//charger fenetre input
		$("#ouvrir" ).on('click',function(){
			if (confirm('Tout le travail en cours sera effacé. Continuer ?')){
				$("#boutons input").click()
			}
		});

		//charger fichier json
		(function(){
			function onChange(event) {
				var reader = new FileReader();
				reader.onload = onReaderLoad;
				reader.readAsText(event.target.files[0]);
				$(this).val("");
			}
			function onReaderLoad(event){
				var charge=event.target.result;
				ouvrir(charge);
			}
				document.getElementById('fichier').addEventListener('input', onChange);
		}());

		//télécharger
		$("#telecharger" ).on('click',function(){
			chargerboite();
			exporter();

		});
});

function ouvrir(fichier){
	var charge=fichier;
	naviguer("home");
	var tablo=entre(charge,"var dialogues =","//fintableau");
	if(tablo!=false){
		var tableau = JSON.parse(tablo);
		donnees.initier(tableau); 
	}
	var style = entre(charge,'<style type="text/css">\n','</style>');
	if(style!=false){
		style = style.replace(/^\s+|\s+$/g, '');
		myCodeMirror.setValue(style);
	}
	var par=entre(charge,'var parametres =','//finpar');
	if(par!=false)
		parametres=JSON.parse(par)[0];
	selection=null;
	actulisteboites();
	selectionner($('#listeboites li').eq(0));
	chargerformulaire();
	if(donnees.dialogues.length){
		selectionner($("#listeboites li").last());
		chargerformulaire();
		$("#formulaire fieldset").prop("disabled",false);
	}else{
		$("#formulaire fieldset").prop("disabled",true);            
	}
}

function exporter(){
	//Jsonifier les boites
	var tablo = JSON.stringify(donnees.dialogues);
	//Jsonifier les parametres
	var par = JSON.stringify(parametres);
	//charger le squelette dans template
	var template=lirefichier("expor/squelette.html");
	//charger miaou
	var miaoujs=lirefichier("js/miaou.js");
	//charger miaou
	var style=myCodeMirror.getValue();
	var expor = remplacermarqueur( template, "/*style*/", style);
	var expor = remplacermarqueur( expor, "//tablo", "var dialogues = "+tablo+"//fintableau");
	var expor = remplacermarqueur( expor, "//par", "var parametres = ["+par+"]//finpar");
	var expor = remplacermarqueur( expor, "//miaou", miaoujs);
	var titre="no-title";
	if(parametres.title!=null&&parametres.title!="")titre=parametres.title;
	telecharger(titre+".html",expor);
}

function lirefichier(fichier){
	var texte;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fichier, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                texte = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return texte;
}

function remplacermarqueur(template, marker, text) {
    var markerIndex = template.indexOf( marker );
    return template.substr( 0, markerIndex ) + text + template.substr( markerIndex + marker.length );
}

function entre(template, marker1,marker2) {
		var txt=template;
	    var i1 = txt.indexOf( marker1 );
	    var i2 = txt.indexOf( marker2 );
	    if(i1==-1||i2==-1){
	    	return false
	    }else{
		    i1+=marker1.length;
		    var result=txt.substring(i1,i2);
		    return result;
		}
}

function telecharger(filename, text) {
    var element = document.createElement('a');
	element.setAttribute('href', 'data:attachment/file;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function remplacerentre(template, marker1,marker2,remplacent) {
    var txt=template;
      var i1 = txt.indexOf( marker1 );
      var i2 = txt.indexOf( marker2 );
      if(i1==-1||i2==-1){
        return false
      }else{
        i1+=marker1.length;
        var result=txt.substring(0,i1)+remplacent+txt.substring(i2, txt.length);
        return result;
    }
}