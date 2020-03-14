const RAF = requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame || msRequestAnimationFrame;
const BRANTH = {};

BRANTH.Canvas = document.createElement("canvas");
BRANTH.Ctx = BRANTH.Canvas.getContext("2d");
BRANTH.Css = document.createElement("style");
BRANTH.Css.innerHTML = "*{margin:0;padding:0;}body:{}";

BRANTH.Time = {
	time: 0,
	lastTime: 0,
	deltaTime: 0,
	update: function(t) {
		this.lastTime = this.time;
		this.time = t;
		this.deltaTime = this.time - this.lastTime;
	}
};

BRANTH.Draw = {
	ctx: BRANTH.Ctx,
	setCtx: function(ctx) {
		this.ctx = ctx;
	},
	resetCtx: function() {
		this.ctx = BRANTH.Ctx;
	},
	setFill: function(color) {
		this.ctx.fillStyle = color;
	},
	setStroke: function(color) {
		this.ctx.strokeStyle = color;
	},
	draw: function(outline) {
		if (outline) this.ctx.stroke();
		else this.ctx.fill();
	},
	rect: function(x, y, w, h, outline) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.draw(outline);
	}
};

BRANTH.start = function(w, h) {
	BRANTH.Canvas.width = w;
	BRANTH.Canvas.height = h;
	BRANTH.Canvas.style.backgroundColor = 'blue';
	document.head.appendChild(BRANTH.Css);
	document.body.appendChild(BRANTH.Canvas);
	BRANTH.render(0);
}

BRANTH.render = function(t) {
	BRANTH.Time.update(t);
	BRANTH.Ctx.clearRect(0, 0, BRANTH.Canvas.width, BRANTH.Canvas.height);
	BRANTH.Draw.setFill('black');
	BRANTH.Draw.rect(150 + Math.sin(t * 0.01) * 80, 10, 44, 12);
	RAF(BRANTH.render);
}

BRANTH.start(300, 150);