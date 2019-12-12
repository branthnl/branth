const C = {
	red: '#f1334d',
	blue: '#68c2ff',
	gray: 'gray',
	black: 'black',
	white: 'white',
	ltgray: 'lightgray',
	yellow: '#f8b500'
}

const Align = {
	l: 'left',
	r: 'right',
	c: 'center',
	t: 'top',
	m: 'middle',
	b: 'bottom'
}

const Shape = {
	rect: 'rect',
	circle: 'circle'
}

const KeyCode = {
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	Up: 38,
	Down: 40,
	Left: 37,
	Right: 39,
	Space: 32,
	Enter: 13,
	U: 85,
	Escape: 27
}

Math.clamp = function(a, b, c) {
	return Math.min(c, Math.max(b, a));
}

Math.range = function(min, max) {
	return Math.random() * (max - min) + min;
}

Math.degtorad = function(d) {
	return d * Math.PI / 180;
}

Math.radtodeg = function(r) {
	return r * 180 / Math.PI;
}

Math.lengthDirX = function(l, d) {
	return -Math.sin(Math.degtorad(d)) * l;
}

Math.lengthDirY = function(l, d) {
	return Math.cos(Math.degtorad(d)) * l;
}

Math.randomNegator = function(n) {
	return Math.range(0, 100) < (n || 50)? 1 : -1;
}

function BranthTime() {
	this.time = 0;
	this.lastTime = 0;
	this.deltaTime = 0;
	this.fixedDeltaTime = 1000 / 60;
	this.update = function(t) {
		this.lastTime = this.time || 0;
		this.time = t || 0;
		this.deltaTime = this.time - this.lastTime || this.fixedDeltaTime;
	}
	this.toSeconds = function(t) {
		return Math.ceil(t / 1000);
	}
	this.toMinutes = function(t) {
		return Math.ceil(t / 60000);
	}
	this.toClockSeconds = function(t) {
		return Math.floor(t / 1000) % 60;
	}
	this.toClockMinutes = function(t) {
		return Math.floor(t / 60000) % 60;
	}
	this.toClockSeconds0 = function(t) {
		let s = Math.abs(this.toClockSeconds(t));
		return (s < 10? '0' : '') + s;
	}
	this.toClockMinutes0 = function(t) {
		let m = Math.abs(this.toClockMinutes(t));
		return (m < 10? '0' : '') + m;
	}
}

function BranthScene(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.def = {
		x: x,
		y: y
	}
	this.mid = {
		x: x + w / 2,
		y: y + h / 2,
		w: w / 2,
		h: h / 2
	}
	this.end = {
		x: x + w,
		y: y + h
	}
	this.alarm = [];
	this.shakeInterval = 0;
	this.shakeMagnitude = 0;
	this.shake = function(mag, int) {
		this.shakeInterval = int;
		this.shakeMagnitude = mag;
		this.alarm[0] = this.shakeInterval;
	}
	this.update = function() {
		this.mid.x = this.x + this.mid.w;
		this.mid.y = this.y + this.mid.h;
		this.end.x = this.x + this.w;
		this.end.y = this.y + this.h;
		if (this.alarm[0] > 0) {
			let intervalScale = this.alarm[0] / this.shakeInterval;
			this.x = this.shakeMagnitude * Math.randomNegator() * intervalScale;
			this.y = this.shakeMagnitude * Math.randomNegator() * intervalScale;
		}
		this.alarmUpdate();
	}
	this.alarmUpdate = function() {
		if (this.alarm != null) {
			for (let i = 0; i < this.alarm.length; i++) {
				if (this.alarm[i] != null) {
					if (this.alarm[i] > 0) {
						this.alarm[i] = Math.max(0, this.alarm[i] - Time.deltaTime);
					}
					else if (this.alarm[i] != -1) {
						switch (i) {
							case 0:
								this.x = this.def.x;
								this.y = this.def.y;
								break;
							default: break;
						}
						if (this.alarm[i] <= 0) this.alarm[i] = -1;
					}
				}
			}
		}
	}
}

function BranthKey(keyCode) {
	this.keyCode = keyCode;
	this.hold = false;
	this.pressed = false;
	this.released = false;
	this.triggerCount = 0;
	this.triggerCountThreshold = 2;
	this.up = function() {
		this.hold = false;
		this.released = true;
		this.triggerTime = 0;
	}
	this.down = function() {
		this.hold = true;
		this.pressed = true;
		this.triggerTime = 0;
	}
	this.update = function() {
		this.triggerTime++;
		if (this.triggerTime >= this.triggerCountThreshold) {
			this.pressed = false;
			this.released = false;
		}
	}
}

function BranthInput() {
	this.key = [];
	for (let key in KeyCode) {
		this.key.push(new BranthKey(KeyCode[key]));
	}
	this.keyUp = function(keyCode) {
		for (let i = 0; i < this.key.length; i++) {
			const k = this.key[i];
			if (keyCode === k.keyCode) {
				if (k.released) {
					return true;
				}
			}
		}
		return false;
	}
	this.keyDown = function(keyCode) {
		for (let i = 0; i < this.key.length; i++) {
			const k = this.key[i];
			if (keyCode === k.keyCode) {
				if (k.pressed) {
					return true;
				}
			}
		}
		return false;
	}
	this.keyHold = function(keyCode) {
		for (let i = 0; i < this.key.length; i++) {
			const k = this.key[i];
			if (keyCode === k.keyCode) {
				if (k.hold) {
					return true;
				}
			}
		}
		return false;
	}
	this.up = function(e) {
		for (let i = 0; i < this.key.length; i++) {
			const k = this.key[i];
			if (e.which == k.keyCode || e.keyCode == k.keyCode) {
				k.up();
			}
		}
	}
	this.down = function(e) {
		for (let i = 0; i < this.key.length; i++) {
			const k = this.key[i];
			if (e.which == k.keyCode || e.keyCode == k.keyCode) {
				if (!k.hold) k.down();
			}
		}
	}
	this.update = function() {
		for (let i = 0; i < this.key.length; i++) {
			this.key[i].update();
		}
	}
}

function BranthCanvas(w, h, c) {
	let cnv = document.createElement('canvas');
	cnv.width = w;
	cnv.height = h;
	cnv.style.backgroundColor = c;
	return cnv;
}

function BranthDraw(ctx) {
	this.setAlpha = function(n) {
		ctx.globalAlpha = n;
	}
	this.setColor = function(s) {
		ctx.fillStyle = s;
	}
	this.setHAlign = function(s) {
		ctx.textAlign = s;
	}
	this.setVAlign = function(s) {
		ctx.textBaseline = s;
	}
	this.setShadow = function(x, y, b, c) {
		ctx.shadowBlur = b || 0;
		ctx.shadowColor = c || C.black;
		ctx.shadowOffsetX = x;
		ctx.shadowOffsetY = y;
	}
	this.resetShadow = function() {
		this.setShadow(0, 0, 0, C.black);
	}
	this.font = function(s) {
		ctx.font = s + ' Montserrat, sans-serif';
	}
	this.text = function(x, y, text) {
		ctx.fillText(text, x, y);
	}
	this.rect = function(x, y, w, h) {
		ctx.fillRect(x, y, w, h);
	}
	this.circle = function(x, y, r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
	this.clearRect = function(x, y, w, h) {
		ctx.clearRect(x, y, w, h);
	}
}

function BranthObject(k) {
	this.k = k;
	this.o = [];
	for (let i = 0; i < this.k.length; i++) {
		this.o.push([]);
	}
	this.getIndex = function(k) {
		for (let i = 0; i < this.k.length; i++) {
			if (k == this.k[i]) {
				return i;
			}
		}
		return -1;
	}
	this.add = function(k, o) {
		let i = this.getIndex(k);
		this.o[i].push(o);
	}
	this.take = function(k) {
		let i = this.getIndex(k);
		return this.o[i];
	}
	this.trash = function(k, j) {
		let i = this.getIndex(k);
		delete this.o[i][j];
	}
	this.clear = function(k) {
		let i = this.getIndex(k);
		this.o[i] = [];
	}
	this.clearAll = function() {
		for (let i = 0; i < this.o.length; i++) {
			this.o[i] = [];
		}
	}
	this.getNotNullLength = function(k) {
		let i = this.getIndex(k);
		let count = 0;
		for (let j = 0; j < this.o[i].length; j++) {
			if (this.o[i][j] != null) {
				count++;
			}
		}
		return count;
	}
	this.update = function() {
		for (let i = 0; i < this.o.length; i++) {
			for (let j = 0; j < this.o[i].length; j++) {
				let o = this.o[i][j];
				if (o != null) {
					o.update();
				}
			}
		}
	}
}

function BranthParticle(x, y, dx, dy, size, life, c, shape, opacity, key) {
	this.x = x;
	this.y = y;
	this.r = size / 2;
	this.mid = {
		size: size / 2
	}
	this.size = size;
	this.dx = dx;
	this.dy = dy;
	this.c = c;
	this.a = opacity;
	this.i = OBJ.take(key).length;
	this.life = life;
	this.opacityShift = 1 - opacity;
	this.update = function() {
		this.a = Math.max(0, (this.a) - (Time.deltaTime / this.life));
		if (this.a <= 0) {
			OBJ.trash(key, this.i);
		}
		this.x += this.dx;
		this.y += this.dy;
		this.render();
	}
	this.render = function() {
		Draw.setAlpha(this.a);
		Draw.setColor(this.c);
		switch (shape) {
			case Shape.rect: Draw.rect(this.x - this.mid.size, this.y - this.mid.size, this.size, this.size); break;
			case Shape.circle: Draw.circle(this.x, this.y, this.r); break;
			default: break;
		}
		Draw.setAlpha(1);
	}
}

function BranthEmitter(defLayer) {
	this.x = {
		min: 0,
		max: 100
	}
	this.y = {
		min: 0,
		max: 100
	}
	this.size = {
		min: 5,
		max: 10
	}
	this.life = {
		min: 2000,
		max: 4000
	}
	this.speed = {
		min: 2,
		max: 5
	}
	this.color = C.red;
	this.shape = Shape.rect;
	this.opacity = {
		min: 1,
		max: 1
	}
	this.direction = {
		min: 0,
		max: 360
	}
	this.objectKey = defLayer;
	this.defaultLayer = defLayer;
	this.setArea = function(xmin, xmax, ymin, ymax) {
		this.x.min = xmin;
		this.x.max = xmax;
		this.y.min = ymin;
		this.y.max = ymax;
	}
	this.setSize = function(min, max) {
		this.size.min = min;
		this.size.max = max;
	}
	this.setLife = function(min, max) {
		this.life.min = min;
		this.life.max = max;
	}
	this.setSpeed = function(min, max) {
		this.speed.min = min;
		this.speed.max = max;
	}
	this.setColor = function(c) {
		this.color = c;
	}
	this.setShape = function(s) {
		this.shape = s;
	}
	this.setOpacity = function(min, max) {
		this.opacity.min = min;
		this.opacity.max = max;
	}
	this.setDirection = function(min, max) {
		this.direction.min = min;
		this.direction.max = max;
	}
	this.setLayer = function(layer) {
		this.objectKey = layer;
	}
	this.resetLayer = function() {
		this.objectKey = this.defaultLayer;
	}
	this.preset = function(k) {
		switch (k) {
			case 'dot':
				this.setSize(5, 10);
				this.setLife(500, 500);
				this.setSpeed(0, 0);
				this.setColor(C.white);
				this.setShape(Shape.circle);
				this.setOpacity(0.8, 1);
				this.setDirection(0, 0);
			break;
			case 'fire':
				this.setSize(3, 5);
				this.setLife(500, 1000);
				this.setSpeed(1, 2);
				this.setColor(C.red);
				this.setShape(Shape.circle);
				this.setOpacity(0.5, 0.5);
				this.setDirection(170, 190);
			break;
			case 'puff':
				this.setSize(5, 10);
				this.setLife(250, 400);
				this.setSpeed(2, 3);
				this.setColor(C.white);
				this.setShape(Shape.circle);
				this.setOpacity(0.8, 1);
				this.setDirection(0, 360);
			break;
			case 'largefire':
				this.setSize(20, 30);
				this.setLife(2000, 4000);
				this.setSpeed(1, 2);
				this.setColor(C.red);
				this.setShape(Shape.circle);
				this.setOpacity(0.5, 0.5);
				this.setDirection(170, 190);
			break;
			default: break;
		}
	}
	this.emit = function(amount) {
		for (let i = 0; i < amount; i++) {
			let spd = Math.range(this.speed.min, this.speed.max);
			let dir = Math.range(this.direction.min, this.direction.max);
			OBJ.add(this.objectKey, new BranthParticle(
				Math.range(this.x.min, this.x.max),
				Math.range(this.y.min, this.y.max),
				Math.lengthDirX(spd, dir),
				Math.lengthDirY(spd, dir),
				Math.range(this.size.min, this.size.max),
				Math.range(this.life.min, this.life.max),
				this.color,
				this.shape,
				Math.range(this.opacity.min, this.opacity.max),
				this.objectKey
			));
		}
	}
	this.spawn = function(x, y, c, shape) {
		let spd = Math.range(this.speed.min, this.speed.max);
		let dir = Math.range(this.direction.min, this.direction.max);
		OBJ.add(this.objectKey, new BranthParticle(
			x, y,
			Math.lengthDirX(spd, dir),
			Math.lengthDirY(spd, dir),
			Math.range(this.size.min, this.size.max),
			Math.range(this.life.min, this.life.max),
			c, shape, Math.range(this.opacity.min, this.opacity.max), this.objectKey
		));
	}
}

/* Objects goes here
*
*
*
* */

const BranthRequestAnimationFrame = window.requestAnimationFrame
	|| window.msRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| function(f) { return setTimeout(f, 1000 / 60) }

window.addEventListener('keyup', (e) => { Inpt.up(e); });
window.addEventListener('keydown', (e) => { Inpt.down(e); });

const World = {
	scene: {
		c: '',
		list: {
			menu: 'menu',
			game: 'game'
		},
		transition: {
			time: 0,
			alpha: 0,
			color: C.white,
			delay: 500,
			interval: 1000
		},
		isTransitioning: false
	},
	startTransition: function() {
		this.scene.transition.time = 0;
		this.scene.transition.alpha = 1;
		this.scene.isTransitioning = true;
	},
	changeScene: function(s) {
		OBJ.clearAll();
		this.scene.c = s;
		this.start();
	},
	start: function() {
		switch (this.scene.c) {
			case this.scene.list['menu']:
				Emtr.preset('puff');
				Emtr.setArea(Room.x, Room.mid.x, Room.y, Room.end.y);
				Emtr.setColor(C.red);
				Emtr.emit(20);
				break;
			case this.scene.list['game']:
				Emtr.preset('puff');
				Emtr.setArea(Room.mid.x, Room.end.x, Room.y, Room.end.y);
				Emtr.setColor(C.blue);
				Emtr.emit(20);
				break;
			default:
				this.changeScene(this.scene.list['menu']);
				break;
		}
	},
	update: function() {
		if (this.scene.isTransitioning) {
			this.scene.transition.time += Time.deltaTime;
			if (this.scene.transition.time >= this.scene.transition.delay) {
				this.scene.transition.alpha = Math.clamp(this.scene.transition.alpha - (Time.deltaTime / this.scene.transition.interval), 0, 1);
			}
			if (this.scene.transition.alpha <= 0) {
				this.scene.isTransitioning = false;
			}
		}
		switch (this.scene.c) {
			case this.scene.list['menu']:
				if (!this.scene.isTransitioning) {
					Emtr.preset('fire');
					Emtr.setArea(Room.mid.x, Room.end.x, Room.y, Room.end.y);
					Emtr.setColor(C.blue);
					Emtr.emit(1);
					if (Inpt.keyDown(KeyCode.Enter)) {
						this.changeScene(this.scene.list['game']);
					}
				}
				break;
			case this.scene.list['game']:
				Emtr.preset('fire');
				Emtr.setArea(Room.x, Room.mid.x, Room.y, Room.end.y);
				Emtr.setColor(C.red);
				Emtr.emit(1);
				if (Inpt.keyDown(KeyCode.Escape)) {
					this.changeScene(this.scene.list['menu']);
				}
				break;
			default: break;
		}
	}
};

const Time = new BranthTime();
const Room = new BranthScene(0, 0, 640, 360);
const View = new BranthScene(0, 0, 640, 360);
const Inpt = new BranthInput();
const Canv = new BranthCanvas(View.w, View.h, C.black);
const Draw = new BranthDraw(Canv.getContext('2d'));
const OBJ = new BranthObject(['particle']);
const Emtr = new BranthEmitter('particle');

const UI = {
	update: function() {
		this.render();
	},
	render: function() {
		switch (World.scene.c) {
			case World.scene.list['menu']:
				Draw.setColor(C.white);
				Draw.text(32, 32, 'Menu');
				Draw.text(32, 48, 'enter');
				break;
			case World.scene.list['game']:
				Draw.setColor(C.white);
				Draw.text(32, 32, 'Game');
				Draw.text(32, 48, 'esc');
				break;
			default: break;
		}
		if (World.scene.isTransitioning) {
			Draw.setAlpha(World.scene.transition.alpha);
			Draw.setColor(World.scene.transition.color);
			Draw.rect(View.x, View.y, View.w, View.h);
			Draw.setAlpha(1);
		}
	}
}

const Game = {
	start: function() {
		World.startTransition();
		World.start();
		this.update();
	},
	update: function(t) {
		World.update();
		Time.update(t);
		Room.update();
		View.update();
		Inpt.update();
		Draw.clearRect(View.x, View.y, View.w, View.h);
		OBJ.update();
		UI.update();
		BranthRequestAnimationFrame(Game.update);
	}
}

window.onload = function() {
	body = document.querySelector('body');
	function preventScroll(e) {
		const keyCodes = [32, 37, 38, 39, 40];
		if (keyCodes.includes(e.keyCode)) {
			e.preventDefault();
		}
	}
	body.addEventListener('keydown', preventScroll, false);
	body.appendChild(Canv);
	Game.start();
}