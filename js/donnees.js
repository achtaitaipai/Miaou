var donnees = {
  initier: function (tableau) {
    donnees.data = [...tableau];
    donnees.dialogues = [...donnees.data];
    donnees.chemin = new Array();
    donnees.cheminvisible = "";
  },

  lireboite: function () {
    if (donnees.chemin.length < 1) return donnees.dialogues;
    donnees.data = donnees.dialogues;
    for (var i = 0; i < donnees.chemin.length; i++) {
      for (var j = 0; j < donnees.data.length; j++) {
        if (donnees.data[j].identifiant == donnees.chemin[i]) {
          donnees.data = donnees.data[j].suite;
          break;
        }
      }
    }
    return donnees.data;
  },

  modifierboite: function (object, newValue, indice) {
    if (donnees.chemin.length < 1) {
      object[indice] = newValue;
    } else {
      for (var i = 0; i < donnees.chemin.length; i++) {
        for (var j = 0; j < object.length; j++) {
          if (object[j].identifiant == donnees.chemin[i]) {
            object = object[j].suite;
            break;
          }
        }
      }
      object[indice] = newValue;
    }
  },

  actucheminvisible: function () {
    if (!donnees.chemin.length) {
      donnees.cheminvisible = "/";
    } else {
      donnees.cheminvisible = "";
      donnees.data = [...donnees.dialogues];
      for (var i = 0; i < donnees.chemin.length; i++) {
        for (var j = 0; j < donnees.data.length; j++) {
          if (donnees.data[j].identifiant == donnees.chemin[i]) {
            donnees.cheminvisible += "/" + donnees.data[j].nom;
            donnees.data = [...donnees.data[j].suite];
            break;
          }
        }
      }
    }
  },

  modifierchemin: function (indice) {
    if (indice == "home") {
      donnees.chemin = new Array();
      donnees.cheminvisible = "/";
    } else if (indice == -1 && donnees.chemin.length)
      donnees.chemin.splice(-1, 1);
    else donnees.chemin.push(donnees.lireboite()[indice].identifiant);
    donnees.actucheminvisible();
  },

  listeliens: function () {
    var liste = new Array();
    var encours = donnees.dialogues;
    var suivants = new Array();
    while (encours.length) {
      encours.forEach(function (boite) {
        if (boite.suite.length) {
          suivants = suivants.concat(boite.suite);
        }
        if (boite.suite.length) {
          liste.push(boite);
        }
      });
      encours = suivants;
      suivants = new Array();
    }
    return liste;
  },

  listetags: function () {
    var liste = new Array();
    var encours = donnees.dialogues;
    var suivants = new Array();
    while (encours.length) {
      encours.forEach(function (boite) {
        if (boite.suite.length) {
          suivants = suivants.concat(boite.suite);
        }
        if (boite.tag != null) {
          liste.push(boite.tag);
        }
      });
      encours = suivants;
      suivants = new Array();
    }
    //supprimer doublons
    var retour = new Set(liste);
    return retour;
  },
};
