$(document).ready(function(){


	//envoyer texte depuis la console
	$("#console #chat textarea").keypress(function (e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) {
			e.preventDefault();
			bot.discuter($("#console #chat textarea"),$("#console #chat #output p"),$("#console #output"));
		}
	});

});

var bot={
	'prochainereponse' :'',

	find:function(template, marker1,marker2) {
		var fin=false;
		var txt=template;
		var retour=new Array();
		while(!fin){
			var result=[];
		    var i1 = txt.indexOf( marker1 );
		    var i2 = txt.indexOf( marker2 );
		    if(i1==-1||i2==-1){
		    	fin=true;
		    	break;
		    }else{
			    i1+=marker1.length;
			    result.entre=txt.substring(i1,i2);
			    i1-=marker1.length;
			    i2+=marker2.length;
			    result.tout=txt.substring(i1,i2);
			    txt=txt.substring(i2,txt.length)
			    retour.push(result);
			}
		}
		if(retour.length)return retour;
		else return false;

	},

	temps:function(texte){
		var nomVars=bot.find(texte,"((","))");
		if(nomVars!=null){
			for (var search = 0; search < nomVars.length; search++) {								
				var nomVar=nomVars[search];
				if(nomVar!=null){
					texte=texte.replace(nomVar.tout,"");
					nomVar=parseInt(nomVar.entre);
				}
				return retour={'temps':nomVar , 'texte':texte};
			}
				return retour={'temps':0 , 'texte':texte}
		}
	},

	repondre : function(texte,output,block){
		if(texte!="NOTHING"){
			var sortie=output.html()+"<br>"+texte+"";
			output.html(sortie);
			block.scrollTop( block[0].scrollHeight );
		}
	},

	discuter : function(input,output,block){
		var requete=input.val();
		var retour=miaou.chercher(requete);
		var reponse=["miaou n'a pas trouvé de boite qui corresponde à la requête"];
		var delai=0;
		if(retour!=null){
			var reponse=retour.reponse;
			donnees.chemin=[...retour.chemin];
			donnees.actucheminvisible();
			$("#chemin").html(donnees.cheminvisible);
			actulisteboites();
			selectionner($("#listeboites li").eq(retour.index));
		}
		var sortie=output.html()+"<br>>>"+requete;
		output.html(sortie);
		input.val('');
		block.scrollTop( block[0].scrollHeight );
		for (var i = 0; i < reponse.length; i++) {
			var traite=bot.temps(reponse[i]).texte;
			delai=bot.temps(reponse[i]).temps*1000;
			var temps=delai;
			if(new Date().getTime()<this.prochainereponse){
				if (delai==0)delai=100;
				temps=delai+this.prochainereponse-new Date().getTime();
			}
			this.prochainereponse=temps+new Date().getTime();
			var out=traite;
			setTimeout(this.repondre,temps,out,output,block);
		}
	},
}