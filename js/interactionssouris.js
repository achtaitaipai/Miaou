//attendre que la page soit chargée
$(document).ready(function(){

	//cliquer et double-cliquer sur une boite
		//moment du dernier clique
		var touchtime = 0;
		//index de la dernière boite cliquée
		var cliquai=-1;

		$("#listeboites").on("click",'li', function() {
			//si c'est la 2e fois d'affiler qu'on clique sur la même boite en moins de 0.8 secondes
			if (((new Date().getTime()) - touchtime) < 800&&cliquai==$(this).index()) {
				//enregistrer les changements, rentrer dans la boite cliquée, représenter la nouvelle liste de boites...
				chargerboite();
				var indice = $(this).index();
				naviguer(indice);
				var actuel=donnees.lireboite();
				if(actuel.length){
					selectionner($("#listeboites li").last());
				}
				else{
					selection=null;
					$("#formulaire fieldset").prop("disabled",true);
					chargerformulaire();
				}
				touchtime = 0;
				cliquai=-1;
			} else {
				//actualiser touchtime et cliquai
				touchtime = new Date().getTime();
				cliquai=$(this).index();
				//quitter les inputs
				$('input').each(function(){
					$(this).trigger('blur');
				})
				$("div[contentEditable]").blur();
				//sélectionner la boite
				selectionner($(this));
			}
		});

	//trier les boites
		$( function() {
			var prov;
			$("#listeboites").sortable({
				start: function(event, ui) {
					//cloner la boite déblacer
				    prov=donnees.lireboite()[ui.item.index()];
				    //supprimer la boite
				    donnees.lireboite().splice(ui.item.index(), 1);
				},
				stop: function(event, ui) {
					//insérer la boite à sa nouvelle position
				    donnees.lireboite().splice(ui.item.index(),0, prov);
				    //sélectionner la boite
				    selectionner(ui.item);
				}
			});
			$("#listeboites").disableSelection();
		});

	//boutons navigation
		//bouton home
		$("#home").on('click',function(){
			if(selection!=null)chargerboite();
			if(donnees.chemin.length){
				naviguer("home");
				selectionner($("#listeboites li").last());
				$("#formulaire fieldset").prop("disabled",false);
			}
			chargerformulaire();
		});
		//bouton retour
		$("#retour").on('click',function(){
			precedent();
		});

	//boutons plus, moins, settings, style
		//nouvelle boîte
		$("#creer .bouton").click(function(){
			//déselectionner le bouton
			$(this).blur();
			creerboite();
		});
		//bouton supprimer
		$("form #moins").click(function(){
			//déselectionner le bouton
			$(this).blur();
			suprimerboite();
		});

		//bouton CSS
		$("#plusmoins #stylesheet").click(function(){
			chargerboite();
			//déselectionner le bouton
			$(this).blur();/*
			$("#formulaireCSS").toggle("visible");
			$("#boites").toggle("visible");
			$("#listeboites").toggle("visible");
			$("#preview").toggle("visible");*/
			$("#formulaire").hide();
			$("#boites").hide();
			$("#formulaireCSS").show();
			$("#preview").show();
			$("#plusmoins #setting").hide();
			$("#plusmoins #stylesheet").hide();
			$("#plusmoins #back").css("display","inline-block");
			myCodeMirror.refresh();
			cssmode=!cssmode;
		});


		$("#plusmoins #back").click(function(){
			$(this).blur();
			$("#preview").hide();
			$("#formulaireCSS").hide();
			$("#boites").show();
			$("#formulaire").show();
			$("#plusmoins #setting").show();
			$("#plusmoins #stylesheet").show();
			$("#plusmoins #back").hide();
			cssmode=!cssmode;
		});
		var presspar=0;
		$(document).mouseup(function(e){
			$(this).blur();
			var cible=$("#formulaireParametres");
			if(cible.is(":visible")&&!cible.is(e.target)&&cible.has(e.target).length==0&&presspar<Date.now()){
				cible.hide();
				sauverparametres();
				presspar=Date.now()+500;
			}
		});

		//afficher parametres
		$("#setting").click(function(){
			if(presspar<Date.now()){
				presspar=Date.now()+500;
				$("#formulaireParametres").css({
				'position' :'absolute',
					'left':$(this).offset().left+$(this).width(),
					'top':$(this).offset().top-$("#formulaireParametres").height(),
				}).show();
				afficherparametres();
			}
		});

	//formulaire
		//actualiser la liste des liens lorsqu'on modifie le checkbox liable
		/*$('form #liable').on('click',function(){
			chargerboite();
			listeliens();
		});*/
		//lorsquon clique sur une option lien
		$('form #nomlien').on('change',function(e){
			nomlientoid();
		});
		//lorsqu'on désélectionne l'input nomlien
		$('form #nomlien').on('blur',function(){
			nomlientoid();
		});
		//enregistrer et afficher la boite au changement du nom ou de la couleur
		$('form #nom').on('change',function(){
			chargerboite();
			chargerformulaire();
		});
		//selectionner une couleur
		$("form .couleurs div").click(function(){
			if(!playmode&&!cssmode){
				var col=$(this).data("col");
				$("#couleur").val(col);
				chargerboite();
				chargerformulaire();
			}
		})

		//tester condition
		$('form #si').on('change',function(){
			testercondition();
		});
		//tester operation
		$('form #operation').on('change',function(){
			testeroperation();
		});
		//dérouler/enrouler une partie du formulaire
		$("#formulaire .accordion").click(function(){
			$(this).blur();
			this.classList.toggle("active");
			var txt =$(this).html();
			if($(this).next().css("display")=="none"){
				$(this).next().css("display","block");
				txt=txt.replace('<span>▸</span>','<span>▾</span>');
				$(this).html(txt);
			}
			else{
				$(this).next().css("display","none");
				txt=txt.replace('<span>▾</span>','<span>▸</span>');
				$(this).html(txt);
			}
		});
		//masquer/afficher l'aide
		$('form input, form .check-boxes, form .txta').on('click',function(){
			$(".help").hide();
			$(this).nextAll(".help:first").show();
		});

    //ouvrir et fermer la console
    	//ouvrir
		$("#console #parler").click(function() {
			playmode=true;
			//modifier l'aspet de la page
			$(".editmode").toggleClass("playmode");
			$(".editmode").removeClass("editmode");
			//sauvegarder boite en cours
			chargerboite()
			//afficher la console
			$("#console #parler").css("display", "none");
			$("#console #chat").css("display", "block");
			//désactiver l'édition
			$("#formulaire fieldset").prop("disabled", true);
			$("#plusmoins #plus").prop("disabled", true);
			$("#plusmoins #moins").prop("disabled", true);
			$("#listeboites").sortable("disable");
			//charger le bot
			var dialogues=[...donnees.dialogues];
			miaou.initier(dialogues);
		});

		//fermer
		$("#console #chat button").click(function() {
			playmode=false;
			//modifier l'aspet de la page
			$(".playmode").toggleClass("editmode");
			$(".playmode").removeClass("playmode")
			//masquer la console
			$("#console #parler").css("display", "block");
			$("#console #chat").css("display", "none");
			//réactiver l'édition
			$("#formulaire fieldset").prop("disabled", false);
			$("#plusmoins #plus").prop("disabled", false);
			$("#plusmoins #moins").prop("disabled", false);
			$("#listeboites").sortable("enable");
			//vider la console
			$("#console #chat #output p").html("");
			$("#console #chat textarea").val('');
		});
	//menu
		$(".levelun").on('click',function(){
			$("#menu").addClass("visible");
		});
		/*$(document).mouseup(function(e){
			$(".levelun").each(function(){
				var cible=$(this);
				if(!cible.is(e.target)&&cible.has(e.target).length==0){
					$(this).removeClass("visible");
				}
			})
			
		});*/
		$("#boutons").on('mouseleave',function(){
			$("#menu").removeClass("visible");
		});

	//tools
		$(".tools li").on('click','a',function(){
			$(this).toggleClass("checked");
			var ac=$(this).attr("data");
			$(ac).toggleClass("visible");
		});

	//exemples
		$(".exemple").on('click',function(){
			var ac=$(this).attr("data");
			var file=lirefichier("exemples/"+ac);
			ouvrir(file);
		});
	    
});