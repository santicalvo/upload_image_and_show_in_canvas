function Rectangulo(rect, x, y, w, h){
	this.shape = rect;
	this.x = rect.getWidth() >= 0 ? rect.getX() : rect.getX() + rect.getWidth();
	this.y = rect.getHeight() >= 0 ? rect.getY() : rect.getY() + rect.getHeight();
	this.width = Math.abs(rect.getWidth());
	this.height = Math.abs(rect.getHeight());
}

var App = function(stage) {
	this.stage = stage;
	this.layer = new Kinetic.Layer();
	this.stage.add(this.layer),
	this.rects = [];
}
App.prototype = {
	createRectangle: function(rect){
		var rectangle = new Kinetic.Rect({
				x : rect.x,
				y : rect.y,
				width : rect.width,
				height : rect.height,
				stroke : 'red', 
				fill: 'red'
			});
		rectangle.setOpacity(0.2);
		this.layer.add(rectangle);
		this.layer.draw();
	},
	start : function() {
		//console.log('5')
		var x0 = 0, y0 = 0,
			move = false,
			tmp_rect,
			that = this,
			stg = this.stage;

		var changeRectSize = function(r,w, h) {
			r.setSize(w, h)
			that.layer.draw()
		}

		var on_mouse_down = function() {
			var pos = that.stage.getMousePosition();
			//console.log(pos)
			move = true;
			x0 = pos.x;
			y0 = pos.y;
			tmp_rect = new Kinetic.Rect({
				x : x0,
				y : y0,
				width : 1,
				height : 1,
				stroke : 'green'
			});
			tmp_rect.on("click", function(ev) {
				for (var i = 0; i < that.rects.length; i++) {
					if (that.rects[i].shape === this) {
						that.rects.splice(i, 1);
						break;
					}
				}
				this.remove()
				that.layer.draw()
			})
			that.layer.add(tmp_rect)
		}

		var on_mouse_move = function() {
			if (move) {
				var pos = that.stage.getMousePosition(), w = pos.x - x0, h = pos.y - y0;
				changeRectSize(tmp_rect, w, h);
			}
		}

		var on_mouse_up = function() {
			var size = tmp_rect.getSize();
			if (Math.abs(size.width) > 1 && Math.abs(size.height) > 1) {
				that.rects.push( new Rectangulo(tmp_rect) );
				tmp_rect.n = that.rects.length - 1;
			} else {
				tmp_rect.remove();
			}
			tmp_rect = null;
			move = false;
		}
		this.stage.on('mousedown', on_mouse_down)
		this.stage.on('mousemove', on_mouse_move)
		this.stage.on('mouseup', on_mouse_up)
	}
}
