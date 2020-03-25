class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

const BRANTH = {};

Math.hypot = (a, b) => Math.sqrt(a*a + b*b);
Math.clamp = (a, b, c) => Math.min(c, Math.max(b, a));
Math.range = (a, b=0, c=Math.random()) => a + c * (b - a);
Math.irange = (a, b=0) => ~~Math.range(a, b);
Math.pick = (a) => a[Math.irange(a.length)];
Math.choose = (...a) => a[Math.irange(a.length)];
Math.randpop = (a) => a.splice(Math.irange(a.length), 1)[0];
Math.randneg = (a=0.5) => Math.random() < a? 1 : -1;
Math.randbool = (a=0.5) => Math.random() < a;
Math.degtorad = Math.PI / 180;
Math.radtodeg = 180 / Math.PI;
Math.lendirx = (l, d) => l * Math.cos(d * Math.degtorad);
Math.lendiry = (l, d) => l * Math.sin(d * Math.degtorad);
Math.lendir = (l, d) => new Vector2(Math.lendirx(l, d), Math.lendiry(l, d));
Math.linedis = (x1, y1, x2, y2) => Math.hypot(x2-x1, y2-y1);
Math.linedir = (x1, y1, x2, y2) => { const d = 90 - Math.atan2(x2-x1, y2-y1) * Math.radtodeg; return d < 0? d + 360 : d; };
Math.pointdis = (p1, p2) => Math.linedis(p1.x, p1.y, p2.x, p2.y);
Math.pointdir = (p1, p2) => Math.linedir(p1.x, p1.y, p2.x, p2.y);

BRANTH.Global = {};

BRANTH.Time = {
	time: 0,
	lastTime: 0,
	deltaTime: 0,
	update(t) {
		this.lastTime = this.time;
		this.time = t;
		this.deltaTime = this.time - this.lastTime;
	}
};

BRANTH.Sound = {};
BRANTH.KeyCode = {};
BRANTH.Mouse = {};
BRANTH.Input = {};
BRANTH.C = {};
BRANTH.Font = {};
BRANTH.Align = {};
BRANTH.LineCap = {};
BRANTH.LineJoin = {};
BRANTH.Primitive = {};
BRANTH.Canvas = document.createElement("canvas");
BRANTH.Draw = {};
BRANTH.OBJ = {};
BRANTH.Particle = {};

BRANTH.Room = {
	w: 0,
	h: 0,
	mid: {
		w: 0,
		h: 0
	},
	rooms: {},
	add(name) {
		this.rooms[name] = {
			name: name,
			start() {},
			render() {}
		};
	}
};

BRANTH.View = {};