(function(win) {
	function startApp(ev) {
		$("#container").empty();
		//console.log('4')
		var img = ev.image;
		var stage = new Kinetic.Stage({
			container : 'container',
			width : img.width,
			height : img.height
		}), layer = new Kinetic.Layer(), kimage = new Kinetic.Image({
			x : 0,
			y : 0,
			image : img
		});
		layer.add(kimage);
		stage.add(layer);
		layer.draw();
		if ( typeof App === "function") {
			var app = new App(stage);
			app.start();
			win.MainApp = app;
		}
	}

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
			var reader = new FileReader();
			reader.onload = function(evt) {
				var img = new Image();
				img.src = evt.target.result;
				var wait = function(){
					var ev = $.Event('IMAGE_DRAGGED', {
						image : img
					});
					//console.log("3")
					if(img.width == 0 && img.height == 0){
						console.log("Estamos en 0!")
						setTimeout(function(){
							wait()
						}, 100)
					}else {
						$("#dropbox").trigger(ev);
					}
				}
				wait();				
			};
			
			reader.readAsDataURL(file);
			//console.log("2")
		}
	}
	var show_thumbnail = function(ev) {
		var img = ev.image, miniatura = $("#miniatura");
		miniatura.empty();
		miniatura.append($(img));
	}
	var on_image_dragged = function(ev) {
		startApp(ev);
		show_thumbnail(ev)
	}
	var on_drop = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var dt = evt.dataTransfer || evt.originalEvent.dataTransfer || alert("No se reconoce la acción de arrastre!"), files = dt.files, file = files[0];

		if (files.length != 1 || !file.type.match(/^image\//)) {
			alert("Sólo se admite una imagen!")
		} else {
			//console.log("1")
			show_in_canvas(file);
			
		}
	}

	$("#dropbox").on("dragover", ignoreDrag).on("drop", on_drop).on('IMAGE_DRAGGED', on_image_dragged);
})(window)
