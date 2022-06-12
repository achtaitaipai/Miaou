var miaou = {
  initier: function (donnees) {
    miaou.datas = donnees;
    miaou.dialogue = donnees;
    miaou.chemin = new Array();
    miaou.drapeaux = "";
    miaou.variables = [];
    miaou.compteurs = [];
    miaou.stocker = [];
    miaou.visites = [];
    miaou.derniererequete = Date.now();
    miaou.debutemps = Date.now();
  },

  adresse: function (id, tableau) {
    var encours = tableau;
    var suivants = new Array();
    var resultat = "";
    var chem = new Array();
    var cheminssuivants = new Array();
    var indice;
    while (encours.length) {
      indice = 0;
      encours.forEach(function (boite, index) {
        if (boite.identifiant == id) {
          var precedent = chem[index];
          if (precedent == null) precedent = "";
          else precedent += "/";
          resultat = precedent + boite.identifiant;
        }
        if (boite.suite.length) {
          suivants = suivants.concat([...boite.suite]);
          var precedent = chem[index];
          if (precedent == null) precedent = "";
          else precedent += "/";
          for (var i = 0; i < boite.suite.length; i++) {
            cheminssuivants[indice + i] = precedent + boite.identifiant;
          }
          indice += boite.suite.length;
        }
      });
      encours = suivants;
      suivants = new Array();
      chem = cheminssuivants;
      cheminssuivants = new Array();
    }
    if (resultat == "") return null;
    return resultat.split("/");
  },

  si: function (index) {
    if (miaou.dialogue[index].si == null) return true;
    var reg = RegExp(miaou.dialogue[index].si);
    return reg.test(miaou.drapeaux);
  },

  sauf: function (index) {
    if (miaou.dialogue[index].sauf == null) return true;
    var reg = RegExp(miaou.dialogue[index].sauf);
    return !reg.test(miaou.drapeaux);
  },

  find: function (template, marker1, marker2) {
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
  },

  conditionner: function (condition) {
    //var reg=RegExp('\\[.*?\\]');
    //var nomVars=[...condition['matchAll']('\\[.*?\\]')];
    var nomVars = miaou.find(condition, "[", "]");
    if (nomVars != null) {
      for (var search = 0; search < nomVars.length; search++) {
        var nomVar = nomVars[search];
        var Var = miaou.variables[nomVar.entre];
        if (Var == null) Var = 0;
        if (typeof Var === "string" || Var instanceof String)
          Var = '"' + Var + '"';
        condition = condition.replace(nomVar.tout, Var);
      }
    }
    return condition;
  },

  condition: function (index) {
    if (miaou.dialogue[index].si == null) return true;
    miaou.conditionner(miaou.dialogue[index].si);
    try {
      var condi = miaou.conditionner(miaou.dialogue[index].si);
      if (eval(condi)) return true;
      else return false;
    } catch (error) {
      console.error(
        "erreure dans la condition de la boite :" + miaou.dialogue[index].nom
      );
      console.error(error);
      return true;
    }
  },

  operations: function (index) {
    if (miaou.dialogue[index].operation == null) return;
    var op = miaou.dialogue[index].operation;
    var nomVars = miaou.find(op, "[", "]");
    if (nomVars.length) {
      for (var search = 0; search < nomVars.length; search++) {
        var nomVar = nomVars[search];
        op = op.replace(nomVar.tout, 'miaou.variables["' + nomVar.entre + '"]');
        if (miaou.variables[nomVar.entre] == null)
          miaou.variables[nomVar.entre] = 0;
      }
    }
    try {
      eval(op);
    } catch (error) {
      console.error(
        "erreure dans l'opération' de la boite :" + miaou.dialogue[index].nom
      );
      console.error(error);
      return true;
    }
  },

  predef: function (recherche) {
    //date
    var date = new Date();
    //jour de la semaine
    var nday = date.getDay();
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    miaou.variables["DAY"] = days[nday];
    var jours = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];
    miaou.variables["JOUR"] = jours[nday];
    //mois
    var nmonth = date.getMonth();
    var months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    miaou.variables["MONTH"] = months[nmonth];
    var mois = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    miaou.variables["MOIS"] = mois[nmonth];
    //annee
    miaou.variables["YEAR"] = date.getFullYear();

    //heure
    var he = date.getHours();
    var min = date.getMinutes();
    miaou.variables["HOUR"] = he + ":" + min;
    //delai secondes
    miaou.variables["DURATION"] = Math.floor(
      (Date.now() - miaou.debutemps) / 1000
    );
    miaou.variables["DELAY"] = Math.floor(
      (Date.now() - miaou.derniererequete) / 1000
    );
    miaou.derniererequete = Date.now();

    //dernière phrase de l'utilisateur
    miaou.variables["LAST"] = recherche;

    //random
    miaou.variables["RANDOM"] = Math.floor(Math.random() * 10);
    miaou.variables["RAND"] = Math.floor(Math.random() * 12);
  },

  chercher: function (recherche) {
    //variables pré-définies
    miaou.predef(recherche);

    var retour = {
      reponse: null,
      index: null,
      chemin: new Array(),
    };
    recherche = recherche.toLowerCase();
    if (miaou.stocker.length) {
      for (var vr = 0; vr < miaou.stocker.length; vr++) {
        miaou.variables[miaou.stocker[vr]] = recherche;
      }
    }

    // /!\ VOUS RENTREZ DANS LES BOUCLES i ET J
    for (i = 0; i < miaou.dialogue.length; i++) {
      for (j = 0; j < miaou.dialogue[i].declencheur.length; j++) {
        var declencheur = miaou.dialogue[i].declencheur[j].toLowerCase();
        var reg = RegExp(declencheur);
        if (reg.test(recherche) && miaou.condition(i)) {
          var rand;
          //nombre de visites
          var identifiant = miaou.dialogue[i].identifiant;
          if (miaou.visites[identifiant] == null)
            miaou.visites[identifiant] = 0;
          else miaou.visites[identifiant]++;

          //si plusieurs réponses possibles
          if (Array.isArray(miaou.dialogue[i].reponse)) {
            //si mode random

            //si mode suite
            if (miaou.dialogue[i].mode == "suite") {
              var nr = miaou.visites[identifiant];
              if (nr >= miaou.dialogue[i].reponse.length)
                nr = miaou.dialogue[i].reponse.length - 1;
              rand = miaou.dialogue[i].reponse[nr];
            }
            //si mode loop
            else if (miaou.dialogue[i].mode == "loop") {
              var nr =
                miaou.visites[identifiant] % miaou.dialogue[i].reponse.length;
              rand = miaou.dialogue[i].reponse[nr];
            } else {
              rand =
                miaou.dialogue[i].reponse[
                  Math.floor(Math.random() * miaou.dialogue[i].reponse.length)
                ];
            }
            //rand=miaou.dialogue[i].reponse.join(sousseparateur);
          } else rand = miaou.dialogue[i].reponse;
          if (rand == null) rand = "";

          //chemin renvoyé pour l'interface
          retour.chemin = [...miaou.chemin];

          //medias
          retour.son = miaou.dialogue[i].son;
          retour.bruit = miaou.dialogue[i].bruit;
          retour.image = miaou.dialogue[i].image;

          //tags et couleurs
          retour.couleur = miaou.dialogue[i].couleur;
          if (retour.couleur == "#8f88f9") retour.couleur = null;
          retour.tag = miaou.dialogue[i].tag;

          //ajouter drapeaux
          if (miaou.dialogue[i].drapeau != null) {
            for (var dr = 0; dr < miaou.dialogue[i].drapeau.length; dr++) {
              var nomDrapeau = miaou.dialogue[i].drapeau[dr];
              nomDrapeau = nomDrapeau.replace("[", "");
              nomDrapeau = nomDrapeau.replace("]", "");
              if (miaou.variables[nomDrapeau] == null)
                miaou.variables[nomDrapeau] = 1;
              else miaou.variables[nomDrapeau]++;
            }
          }
          //variables
          //var nomVars=[...rand['matchAll']('\\[.*?\\]')];
          var nomVars = miaou.find(rand, "[", "]");
          if (nomVars != null) {
            for (var search = 0; search < nomVars.length; search++) {
              var nomVar = nomVars[search];
              var Var = miaou.variables[nomVar.entre];
              if (Var != null) rand = rand.replace(nomVar.tout, Var);
              else rand = rand.replace(nomVar.tout, "");
            }
          }

          if (miaou.dialogue[i].variable != null) {
            for (var vr = 0; vr < miaou.dialogue[i].variable.length; vr++) {
              miaou.stocker[vr] = miaou.dialogue[i].variable[vr];
            }
          } else miaou.stocker = [];

          miaou.operations(i);
          //dialogues imbriqués
          if (miaou.dialogue[i].suite.length) {
            miaou.chemin.push(miaou.dialogue[i].identifiant);
          }
          //retour avant
          if (miaou.dialogue[i].retour == "on") {
            miaou.chemin.splice(-1, 1);
          }
          //liens
          if (miaou.dialogue[i].lien != null) {
            if (miaou.dialogue[i].lien == "") {
              //rien
            } else if (miaou.dialogue[i].lien == "return") {
              //retour
              miaou.chemin.splice(-1, 1);
            } else if (miaou.dialogue[i].lien == "home") {
              miaou.chemin = new Array();
            } else {
              var prov = miaou.adresse(miaou.dialogue[i].lien, miaou.datas);
              if (prov != null) miaou.chemin = prov;
            }
          }
          //charger le chemins
          if (miaou.chemin != null) {
            miaou.objet = [...miaou.datas];
            if (!miaou.chemin.length) miaou.chemin = new Array();
            miaou.suivant;
            for (var n = 0; n < miaou.chemin.length; n++) {
              for (var j = 0; j < miaou.objet.length; j++) {
                if (miaou.objet[j].identifiant == miaou.chemin[n]) {
                  miaou.objet = [...miaou.objet[j].suite];
                  break;
                }
              }
            }
            miaou.dialogue = [...miaou.objet];
          }
          rand = rand.split(sousseparateur);
          retour.reponse = rand;
          retour.index = i;
          return retour;
        }
      }
    }
  },
};
