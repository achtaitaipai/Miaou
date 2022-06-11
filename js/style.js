var theme;
$(document).ready(function(){
	//$("#formulaireCSS").html(theme);
	  var editor=document.querySelector("#formulaireCSS");
  myCodeMirror = CodeMirror(editor, {
  value: theme,
  mode:  "css",
  viexportMargin:"Infinity",
  lineWrapping:true
});
  var delay;
  myCodeMirror.on("change",function(){
	  clearTimeout(delay);
	  delay=setTimeout(upPreview,1000);
})

$("#theme").on('change',function(){
  $(this).blur();
  var path=$("#theme option:selected").val();
  $("#theme option").first().prop("selected","true");
  if(confirm("Les données actuelles seront effacées")){
    theme=lirefichier(path);
    myCodeMirror.setValue(theme);
  }
});
function upPreview(){
	var previewFrame=document.getElementById("preview");
	var preview=previewFrame.contentDocument || previewFrame.contentWindow.document;
	var rendu =apercu();
	preview.open();
	preview.write(rendu);
	preview.close();
}
var appercu=lirefichier("apercu.html");

function apercu(){
	//charger le squelette dans template
	//charger miaou
	var style=myCodeMirror.getValue();
	var expor = remplacerentre( appercu, '<style type="text/css">','</style>', "\n"+style+"\n");
	return expor;
}

upPreview();

});

function remplacerentre(appercu, marker1,marker2,remplacent) {
    var txt=appercu;
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