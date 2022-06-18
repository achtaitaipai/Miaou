//enregistrer les données du formulaire
function chargerboite() {
  if (selection != null) {
    var i = selection.index();
    //cloner boite vide
    var charge = Object.assign({}, boitevide);
    //charger toutes les valeurs entrées dans le formulaire
    if ($("form #nom").val()) charge.nom = $("form #nom").val();
    else charge.nom = null;
    if ($("form #couleur").val()) charge.couleur = $("form #couleur").val();
    else charge.couleur = null;
    if ($("form #declencheur").val())
      charge.declencheur = $("form #declencheur").val().split(separateur);
    else charge.declencheur = "";
    if ($("form #reponse").text())
      charge.reponse = $("form #reponse").text().split(separateur);
    else charge.reponse = null;
    if ($(".check-boxes input:checked").val())
      charge.mode = $(".check-boxes input:checked").val();
    else charge.mode = null;
    if ($("form #drapeau").val())
      charge.drapeau = $("form #drapeau").val().split(separateur);
    else charge.drapeau = null;
    if ($("form #si").val()) charge.si = $("form #si").val();
    else charge.si = null;
    if ($("form #operation").val())
      charge.operation = $("form #operation").val();
    else charge.operation = null;
    if ($("form #lien").val()) charge.lien = $("form #lien").val();
    else charge.lien = null;
    if ($("form #variable").val())
      charge.variable = $("form #variable").val().split(separateur);
    else charge.variable = null;
    if ($("form #son").val()) charge.son = $("form #son").val();
    else charge.son = null;
    if ($("form #bruit").val()) charge.bruit = $("form #bruit").val();
    else charge.bruit = null;
    if ($("form #image").val()) charge.image = $("form #image").val();
    else charge.image = null;
    if ($("form #tag").val()) charge.tag = $("form #tag").val();
    else charge.tag = null;

    //charger les valeurs "invisibles" identifiants et sous-boites
    charge.identifiant = donnees.lireboite()[i].identifiant;
    charge.suite = donnees.lireboite()[i].suite;

    //remplacer la boite par la charge
    donnees.modifierboite(donnees.dialogues, charge, i);
    //modifier le nom affiché par la boite
    representerboite(selection, donnees.lireboite()[i]);
    //changer la couleur
    if (donnees.lireboite()[i].couleur != "#8f88f9")
      selection.css("color", donnees.lireboite()[i].couleur);
    else selection.removeAttr("style");
  }
}

//convertir tableau en string
function artostr(ficelle) {
  if (Array.isArray(ficelle)) {
    ficelle = ficelle.join(separateur);
  }
  return ficelle;
}

//afficher les données de la boite sélectionnée dans le formulaire
function chargerformulaire() {
  //charger la liste de liens possibles
  listeliens();
  listetags();
  if (selection != null && selection.length) {
    //charger les valeurs de la boite dans des variables
    var boite = donnees.lireboite();
    var i = selection.index();
    var nom = artostr(boite[i].nom);
    var couleur = artostr(boite[i].couleur);
    if (couleur == null) couleur = "#8f88f9";
    var declencheur = artostr(boite[i].declencheur);
    var reponse = artostr(boite[i].reponse);
    if (reponse == null) reponse = "";
    var mode = artostr(boite[i].mode);
    if (mode != "suite" && mode != "loop") {
      mode = "random";
    }
    var drapeau = artostr(boite[i].drapeau);
    var si = artostr(boite[i].si);
    var operation = artostr(boite[i].operation);
    var lien = artostr(boite[i].lien);
    var variable = artostr(boite[i].variable);
    var son = artostr(boite[i].son);
    var bruit = artostr(boite[i].bruit);
    var image = artostr(boite[i].image);
    var tag = artostr(boite[i].tag);

    //charger les valeurs dans le formulaire
    $("form #nom").val(nom);
    $("form #couleur").val(couleur);
    $("form #declencheur").val(declencheur);
    $("form #reponse").text(reponse);
    //$('form #mode').val(mode);
    $(".check-boxes input[value=" + mode + "]").prop("checked", true);
    $("form #drapeau").val(drapeau);
    $("form #si").val(si);
    $("form #operation").val(operation);
    //$('form #sauf').val(sauf);
    $("form #lien").val(lien);
    //charger nom du lien dans l'input nomlien
    idtonomlien();
    $("form #variable").val(variable);
    $("form #son").val(son);
    $("form #bruit").val(bruit);
    $("form #image").val(image);
    $("form #tag").val(tag);
  }
  //si aucune boite n'est sélectionnée vider le formulaire
  else {
    $("form #nom").val("");
    $("form #couleur").val("#8f88f9");
    $("form #declencheur").val("");
    $("form #reponse").text("");
    $("form #drapeau").val("");
    $("form #si").val("");
    $("form #operation").val("");
    $("form #lien").val("");
    $("form #variable").val("");
    $("form #son").val("");
    $("form #bruit").val("");
    $("form #image").val("");
    $("form #tag").val("");
  }
  affichercouleur();
  $("form #lien").nextAll(".error:first").hide();
}

//selectionner une boite
function selectionner(element) {
  chargerboite();
  $(selection).toggleClass("selected");
  selection = element;
  $(selection).toggleClass("selected");
  chargerformulaire();
}

//supprimer une boite et sa représentation
function suprimerboite() {
  if (selection != null) {
    //supprimer la boite de la liste
    var index = selection.index();
    donnees.lireboite().splice(index, 1);
    //supprimer la représentation de la boite
    selection.remove();
    //si on supprime la derniere boite selectionner la nouvelle dernière
    if (
      index == donnees.lireboite().length &&
      $("#listeboites li").eq(index - 1).length
    ) {
      selection = null;
      selectionner($("#listeboites li").eq(index - 1));
    }
    //autrement supprimer la boite qui suit la boite supprimée
    else if ($("#listeboites li").eq(index).length) {
      selection = null;
      selectionner($("#listeboites li").eq(index));
    }
    //s'il n'y a aucune boite ne rien sélectionnée et désactiver le formulaire
    else {
      selection = null;
      $("#formulaire fieldset").prop("disabled", true);
      chargerformulaire();
    }
  }
}
function representerboite(rep, boite) {
  rep.children(".titre").html(boite.nom);
  if (boite.couleur != "#8f88f9") rep.css("color", boite.couleur);
  if (boite.suite.length) rep.addClass("pleine");
  else rep.removeClass("pleine");
  rep = rep.children(".box-icons");
  if (boite.si == null) rep.children(".icon-attention-circled").hide();
  else rep.children(".icon-attention-circled").show();
  if (boite.drapeau == null && boite.variable == null)
    rep.children(".icon-flag").hide();
  else rep.children(".icon-flag").show();
  if (boite.lien == null) rep.children(".icon-link").hide();
  else rep.children(".icon-link").show();
  if (boite.image == null) rep.children(".icon-picture-1").hide();
  else rep.children(".icon-picture-1").show();
  if (boite.son == null) rep.children(".icon-note-beamed").hide();
  if (boite.bruit == null) rep.children(".icon-note-beamed").hide();
  else rep.children(".icon-note-beamed").show();
  if (boite.tag == null) rep.children(".icon-tag").hide();
  else rep.children(".icon-tag").show();
}

//créer une boite et sa représentation
function creerboite(box) {
  //sauvegarder les données
  if (donnees.lireboite().length) chargerboite();
  //créer une représentation de la boite
  var html = "";
  html += '<li class="editmode"> ';
  html += "<div class='titre editmode'>";
  html += "box " + donnees.lireboite().length;
  html += "</div>";
  html += '<div class="box-icons editmode">';
  html += '<span class="icon-attention-circled"></span>';
  html += '<span class="icon-flag"></span>';
  html += '<span class="icon-link"></span>';
  html += '<span class="icon-picture-1"></span>';
  html += '<span class="icon-note-beamed"></span>';
  html += '<span class="icon-tag"></span>';
  html += "</div>";
  html += "</li>";
  $("#listeboites").append(html);
  //créer une boite vide, lui attribuer un nom, un identifiant et une suite vide
  var boite = [];
  if (box == null) {
    boite.nom = "box " + donnees.lireboite().length;
    boite.suite = [];
    boite.identifiant = Date.now();
  } else boite = box;
  representerboite($("#listeboites li").last(), boite);
  //activer le formulaire
  $("#formulaire fieldset").prop("disabled", false);
  //ajouter la nouvelle boite aux données
  donnees.lireboite().push(boite);
  //sélectionner la boite créée
  selectionner($("#listeboites li").last());
  //scroller au plus bas
  $("#boites").scrollTop($("#boites")[0].scrollHeight);
}

//copier/couper/coller
var copie;
//copier
function copier() {
  if (selection != null) {
    var index = selection.index();
    copie = $.extend(true, {}, donnees.lireboite()[index]);
    copie.nom += " copy";
  }
}

//couper
function couper() {
  if (selection != null) {
    var index = selection.index();
    copie = $.extend(true, {}, donnees.lireboite()[index]);
  }
  suprimerboite();
}

//coller
function coller() {
  if (copie != null) {
    var idi = Date.now();
    copie.identifiant = idi;
    idi++;
    var encours = copie.suite;
    var suivants = new Array();
    while (encours.length) {
      encours.forEach(function (boite) {
        if (boite.suite != null) {
          if (boite.suite.length) suivants = suivants.concat(boite.suite);
        }
        boite.identifiant = idi;
        idi++;
        boite.nom += " copy";
        boite.lien = "";
      });
      encours = suivants;
      suivants = new Array();
    }
    //copie.suite=[];
    creerboite(copie);
  }
}

//nombre de boites dans une rangée
function getnrow() {
  var L = $("#listeboites li").length;
  var x = 0;
  var px = 0;
  for (var i = 0; i < $("#listeboites li").length; i++) {
    var x = $("#listeboites li").eq(i).offset().left;
    if (x < px) return i;
    px = x;
  }
  return 0;
}

//couleur
//afficher couleur
function affichercouleur() {
  $(".select").toggleClass("select");
  $(".couleurs div[data-col='" + $("#couleur").val() + "']").toggleClass(
    "select"
  );
}

//liens :id <=> nom
//transférer la valeur du lien choisi à l'input caché "lien" et remplacé la valeur de l'input visible
//par le nom de la boite
function nomlientoid() {
  if ($("form #nomlien").val() == "") {
    $("form #lien").val("");
    return;
  }
  //identifiant
  var valeur = $("form #nomlien").val();
  var nom;
  //cas 1 l'utilisateur a cliqué sur une option qui a une value(identifian)
  //on compare la value aux value de la liste
  //une fois trouvée on choppe l'identifiant, on le met dans l'input caché lien
  //on choppe le nom(.html())et on le met dans l'input nom
  $("form #lienlist option").each(function (i, el) {
    if ($(el).val() == valeur) {
      nom = $(el).html();
      $("form #lien").val(valeur);
      $("form #nomlien").val(nom);
      $("form #lien").nextAll(".error:first").hide();
      return;
    }
  });
  //cas 2 l'utilisateur a entré le nom d'une boite
  //on compare le nom aux noms de la liste
  //une fois trouvée on choppe l'identifiant, on le met dans l'input caché lien
  //on choppe le nom(.html())et on le met dans l'input nom
  //l'inconvéniant est que si plusieurs boites ont le même noms ce sera la première qui sera liée
  if (nom == null) {
    $("form #lienlist option").each(function (i, el) {
      if ($(el).html() == valeur) {
        nom = $(el).html();
        $("form #lien").val($(el).val());
        $("form #nomlien").val(nom);
        $("form #lien").nextAll(".error:first").hide();
        return;
      }
    });
  }
  //cas 3 l'utilisateur a entré un nom invalide
  //on vide les inputs et on affiche une alerte
  if (nom == null) {
    $("form #lien").val("");
    $("form #nomlien").val("");
    $("form #lien").nextAll(".error:first").show();
  }
}

function idtonomlien() {
  var valeur = $("form #lien").val();
  var nom;
  //on compare la value de lien aux values de la liste
  //on choppe le nom(.html())et on le met dans l'input visible : nom
  $("form #lienlist option").each(function (i, el) {
    if ($(el).val() == valeur) {
      nom = $(el).html();
      $("form #nomlien").val(nom);
      return;
    }
  });
  //si on n'a rien trouvé vider l'input lien in vide
  if (nom == null) {
    $("form #lien").val("");
    $("form #nomlien").val("");
  }
}

//charger la liste des liens sélectionnables dans l'input
function listeliens() {
  var liste = [...donnees.listeliens()];

  $("form #lienlist").empty();
  $("form #lienlist").append(
    $("<option>").attr("value", "return").text("return")
  );
  $("form #lienlist").append($("<option>").attr("value", "home").text("home"));
  for (var i = 0; i < liste.length; i++) {
    $("form #lienlist").append(
      $("<option>").attr("value", liste[i].identifiant).text(liste[i].nom)
    );
  }
}

//charger la liste des tags sélectionnables dans l'input
function listetags() {
  var liste = [...donnees.listetags()];
  $("form #taglist").empty();
  for (var i = 0; i < liste.length; i++) {
    $("form #taglist").append($("<option>").text(liste[i]));
  }
}

//changer d'emplacement dans l'arborescence
function naviguer(indice) {
  //modifier l'emplacement
  donnees.modifierchemin(indice);
  //afficher le nouveau chemin
  $("#chemin").html(donnees.cheminvisible);
  donnees.cheminvisible === "/"
    ? $("#location").hide()
    : $("#location").css("display", "flex");
  console.log(donnees.cheminvisible);
  //représenter les boites selon la position
  actulisteboites();
}

//actualiser les boites représentées en fonction de la position dans l'arborescence("chemin")
function actulisteboites() {
  //suprimer les représentations
  $("#listeboites").empty();
  //créer une liste des boites à représenter
  var actuel = donnees.lireboite();
  if (actuel != null) {
    //représenter les boites
    for (var i = 0; i < actuel.length; i++) {
      var html = "";
      html += '<li class="editmode"> ';
      html += "<div class='titre'>";
      html += "</div>";
      html += '<div class="box-icons editmode">';
      html += '<span class="icon-attention-circled"></span>';
      html += '<span class="icon-flag"></span>';
      html += '<span class="icon-link"></span>';
      html += '<span class="icon-picture-1"></span>';
      html += '<span class="icon-note-beamed"></span>';
      html += '<span class="icon-tag"></span>';
      html += "</div>";
      html += "</li>";
      $("#listeboites").append(html);
      //changer la couleur
      representerboite($("#listeboites li").last(), actuel[i]);
    }
  }
  selection = null;
}

//retour
function precedent() {
  if (selection != null) chargerboite();
  if (donnees.chemin.length) {
    naviguer(-1);
    selectionner($("#listeboites li").last());
    $("#formulaire fieldset").prop("disabled", false);
  }
}

//tester une condition
function testercondition() {
  var condition = $("form #si").val();
  var condi = conditionner(condition);
  try {
    if (eval(condi) != true && eval(condi) != false)
      console.log("la condition n'en est pas une");
    //console.log('la condition fonctionne')
    else $("form #si").nextAll(".error:first").hide();
  } catch (error) {
    $("form #si").nextAll(".error:first").show();
    console.error(error);
  }
}

//tester une operation
function testeroperation() {
  var op = $("form #operation").val();
  var variables = [];
  var nomVars = find(op, "[", "]");
  if (nomVars.length) {
    for (var search = 0; search < nomVars.length; search++) {
      var nomVar = nomVars[search];
      op = op.replace(nomVar.tout, 'variables["' + nomVar.entre + '"]');
      if (variables[nomVar.entre] == null) variables[nomVar.entre] = 0;
    }
  }
  try {
    eval(op);
    $("form #operation").nextAll(".error:first").hide();
  } catch (error) {
    $("form #operation").nextAll(".error:first").show();
    console.error(error);
  }
}

function find(template, marker1, marker2) {
  var fin = false;
  var txt = template;
  var retour = new Array();
  while (!fin) {
    var result = [];
    var i1 = txt.indexOf(marker1);
    var i2 = txt.indexOf(marker2);
    if (i1 == -1 || i2 == -1) {
      fin = true;
      break;
    } else {
      i1 += marker1.length;
      result.entre = txt.substring(i1, i2);
      i1 -= marker1.length;
      i2 += marker2.length;
      result.tout = txt.substring(i1, i2);
      txt = txt.substring(i2, txt.length);
      retour.push(result);
    }
  }
  if (retour.length) return retour;
  else return false;
}

function conditionner(condition) {
  //var reg=RegExp('\\[.*?\\]');
  var nomVars = find(condition, "[", "]");
  if (nomVars != null) {
    for (var search = 0; search < nomVars.length; search++) {
      var nomVar = nomVars[search];
      Var = 15;
      condition = condition.replace(nomVar.tout, Var);
    }
  }
  return condition;
}

//parametres
function sauverparametres() {
  parametres.title = $("#formulaireParametres #title").val();
  parametres.defaultanswer = $("#formulaireParametres #defaultanswer").val();
  parametres.botname = $("#formulaireParametres #botname").val();
  parametres.usrname = $("#formulaireParametres #usrname").val();
  parametres.defaulttime = $("#formulaireParametres #defaulttime").val();
  parametres.begin = $("#formulaireParametres #begin").val();
  parametres.colorto = $("#formulaireParametres #colorto").val();
}

function afficherparametres() {
  $("#formulaireParametres #title").val(parametres.title);
  $("#formulaireParametres #defaultanswer").val(parametres.defaultanswer);
  $("#formulaireParametres #botname").val(parametres.botname);
  $("#formulaireParametres #usrname").val(parametres.usrname);
  $("#formulaireParametres #defaulttime").val(parametres.defaulttime);
  $("#formulaireParametres #begin").val(parametres.begin);
  $("#formulaireParametres #colorto").val(parametres.colorto);
}
