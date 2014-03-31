var current = {};

function render_element(obj,stage,layer){
  layer.add(obj);
  stage.add(layer);  
}

$('#addtextbutton').click(function() {  
  var textoptions = [];  
  textoptions['text'] = 'This is my presentation';  
  textoptions['width'] = 1000;  
  textoptions['fontFamily'] = 'Arial';  
  textoptions['fontSize'] = 20;  
  textoptions['x'] = Math.floor((Math.random()*700)+1);  
  textoptions['y'] = Math.floor((Math.random()*400)+1);  
  textadd = AddText(textoptions);  
  render_element(textadd,current.stage,current.layer);  
});

var $textref;
function AddText(args){
  text = args['text'] || 'default';
  fontSize = args['fontSize'] || 30;
  fontFamily = args['fontFamily'] || 'Calibri';
  width = args['width'] || 1000;
  x = args['x'] || false;
  y = args['y'] || false;
  align = args['align'] || false;
  return new Kinetic.Text({
    width: width,
    text: text,
    fontSize: fontSize,
    fontFamily: fontFamily,
    draggable: true,
    fill: 'green',
    padding: 10,
    align: align,
    x: x,
    y: y
  })
  .on('dblclick', function(){
    $textref = this;
    settextediton($textref);
  });
}

function init(){  
  var stage = new Kinetic.Stage({  
    container: 'container',  
    width: 1000,  
    height: 600  
  });  
  var layer = new Kinetic.Layer();  
  current.stage = stage;  
  current.layer = layer;  
  //Adding some default objects on blank slide  
  var textoptions = [];  
  textoptions['text'] = 'This is my presentation';  
  textoptions['width'] = 1000;  
  textoptions['fontFamily'] = 'Calibri';  
  textoptions['fontSize'] = 50;  
  textoptions['align'] = 'center';  
  heading = AddText(textoptions);  
  render_element(heading,stage,layer);  
  //blank addition over  
}
init();

function settextediton($ref){
  $('#textedit_textfield').val($ref.getText());
  $('#textedit_fontsize ').val($ref.fontSize());
  $('#textedit').show(); // to make div visible after setting values.
}

$('#textedit_textfield').keyup(function() {
  $textref.setText($('#textedit_textfield').val());
  current.layer.draw();
});
$('#textedit_fontfield').change(function() {
  $textref.fontFamily($('#textedit_fontfield').val());
  current.layer.draw();
});
$('#textedit_fontsize').keyup(function() {
  $textref.fontSize($('#textedit_fontsize').val());
  current.layer.draw();
});

$('#exittextedit').click(function(){
  $textref = null;
  $('#textedit').hide();
});

$('#deletetext').click(function() {
  $textref.remove();
  current.layer.draw();
  $( "#exittextedit" ).trigger( "click" );
});