$(window).keydown(function(e) {
  if(!$(e.target).is(':input, [contenteditable]')&&!playmode&&!cssmode){
    //gauche
    if(e.keyCode == 37) {
      if(selection!=null)fleches("gauche");
    }
    //droite
    else if(e.keyCode == 39) {
      if(selection!=null)fleches("droite")
    }
    //bas
    else if (e.keyCode ==40) {
      if(selection!=null)fleches("bas")
      
    }
    //haut
    else if (e.keyCode ==38) {
      if(selection!=null)fleches("haut")
      
    }
    //retour
    else if (e.keyCode==78) {
      creerboite();         
    }
    //suprimer
    else if(e.keyCode == 46) {
      suprimerboite();
    }
    //entrer
    else if (e.keyCode==13&&selection!=null) {
      chargerboite();
      var indice = selection.index();
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
    }
    //retour
    else if (e.keyCode==8) {
      precedent();         
    }
    //copier
    else if(e.keyCode==67&&e.ctrlKey){
      copier();
    }
    //couper
    else if(e.keyCode==88&&e.ctrlKey){
      couper();
    }
    //coller
    else if(e.keyCode==86&&e.ctrlKey){
      coller();
    }
  }
});

function fleches(dir){
  switch (dir) {
    case "gauche":
      if(selection.index()>0){
      selectionner($("#listeboites li").eq(selection.index()-1))
      }
    break;
    case "droite":
      if(selection.index()<donnees.lireboite().length-1){
      selectionner($("#listeboites li").eq(selection.index()+1))
      }
      break;
    case "bas":
      var dest=getnrow()+selection.index();
      if(dest<donnees.lireboite().length&&dest!=selection.index()){
        selectionner($("#listeboites li").eq(dest));
      }
      else{
        selectionner($("#listeboites li").last());
      }
    break;
    case "haut":
      var dest=selection.index()-getnrow();
      if(dest>=0&&dest!=selection.index()){
        selectionner($("#listeboites li").eq(dest));
      }else{
        selectionner($("#listeboites li").eq(0));
      }
    break;
  }

}