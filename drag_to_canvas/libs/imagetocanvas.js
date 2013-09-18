var stage = new Kinetic.Stage({
	container : 'container',
	width : 800,
	height : 800
}), layer = new Kinetic.Layer(), dropbox = $("#dropbox");

var ignoreDrag = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}
var handleDragOver = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}
var show_in_canvas = function(file) {
	if ( typeof FileReader !== "undefined") {
		var img = new Image(),
			reader = new FileReader(),
			kimage;
		reader.onload = function(evt) {
			img.src = evt.target.result;
			kimage = new Kinetic.Image({
				x : 0,
				y : 0,
				image : img
			});
			
			layer.add(kimage);
			console.log(layer);
			layer.draw();
		};
		//
		reader.readAsDataURL(file);
		
	}
}
var on_drop = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var dt = evt.dataTransfer || evt.originalEvent.dataTransfer || alert("No se reconoce la acción de arrastre!"), files = dt.files, file = files[0];

	if (files.length != 1 || !file.type.match(/^image\//)) {
		alert("Sólo se admite una imagen!")
	} else {
		show_in_canvas(file);
	}
}

stage.add(layer);
dropbox.on("dragover", ignoreDrag).on("drop", on_drop);
