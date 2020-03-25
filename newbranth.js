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

BRANTH.Canvas = document.createElement("canvas");
BRANTH.Ctx = BRANTH.Canvas.getContext("2d");

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

BRANTH.Room = {
	scale: 1,
	w: 0,
	h: 0,
	mid: {
		w: 0,
		h: 0
	},
	list: {},
	current: null,
	previous: null,
	add(name) {
		if (this.list[name] === undefined) {
			return this.list[name] = {
				name: name,
				start() {},
				render() {}
			};
		}
		else console.log(`Room already exists: ${name}`);
	},
	get(name) {
		return this.list[name];
	},
	start(name) {
		this.previous = this.current;
		this.current = this.list[name];
		this.current.start();
	},
	clear() {
		BRANTH.Ctx.clearRect(0, 0, this.w, this.h);
	},
	resize(options={}) {
		if (options.scale) this.scale = options.scale;
		const b = BRANTH.Canvas.getBoundingClientRect();
		this.w = options.w || b.width;
		this.h = options.h || b.height;
		this.mid.w = this.w * 0.5;
		this.mid.h = this.h * 0.5;
		BRANTH.Canvas.width = this.w * this.scale;
		BRANTH.Canvas.height = this.h * this.scale;
		BRANTH.Ctx.resetTransform();
		BRANTH.Ctx.scale(this.scale, this.scale);
	}
};

BRANTH.KeyCode = {};

BRANTH.Mouse = {};

BRANTH.Input = {
	update() {},
	reset() {}
};

BRANTH.Sound = {
	update() {}
};

BRANTH.C = {
	aliceBlue: "#f0f8ff",
	antiqueWhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedAlmond: "#ffebcd",
	blue: "#0000ff",
	blueViolet: "#8a2be2",
	brown: "#a52a2a",
	burlyWood: "#deb887",
	cadetBlue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerBlue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkBlue: "#00008b",
	darkCyan: "#008b8b",
	darkGoldenRod: "#b8860b",
	darkGray: "#a9a9a9",
	darkGrey: "#a9a9a9",
	darkGreen: "#006400",
	darkKhaki: "#bdb76b",
	darkMagenta: "#8b008b",
	darkOliveGreen: "#556b2f",
	darkOrange: "#ff8c00",
	darkOrchid: "#9932cc",
	darkRed: "#8b0000",
	darkSalmon: "#e9967a",
	darkSeaGreen: "#8fbc8f",
	darkSlateBlue: "#483d8b",
	darkSlateGray: "#2f4f4f",
	darkSlateGrey: "#2f4f4f",
	darkTurquoise: "#00ced1",
	darkViolet: "#9400d3",
	deepPink: "#ff1493",
	deepSkyBlue: "#00bfff",
	dimGray: "#696969",
	dimGrey: "#696969",
	dodgerBlue: "#1e90ff",
	fireBrick: "#b22222",
	floralWhite: "#fffaf0",
	forestGreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostWhite: "#f8f8ff",
	gold: "#ffd700",
	goldenRod: "#daa520",
	gray: "#808080",
	grey: "#808080",
	green: "#008000",
	greenYellow: "#adff2f",
	honeyDew: "#f0fff0",
	hotPink: "#ff69b4",
	indianRed: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lavenderBlush: "#fff0f5",
	lawnGreen: "#7cfc00",
	lemonChiffon: "#fffacd",
	lightBlue: "#add8e6",
	lightCoral: "#f08080",
	lightCyan: "#e0ffff",
	lightGoldenRodYellow: "#fafad2",
	lightGray: "#d3d3d3",
	lightGrey: "#d3d3d3",
	lightGreen: "#90ee90",
	lightPink: "#ffb6c1",
	lightSalmon: "#ffa07a",
	lightSeaGreen: "#20b2aa",
	lightSkyBlue: "#87cefa",
	lightSlateGray: "#778899",
	lightSlateGrey: "#778899",
	lightSteelBlue: "#b0c4de",
	lightYellow: "#ffffe0",
	lime: "#00ff00",
	limeGreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumAquaMarine: "#66cdaa",
	mediumBlue: "#0000cd",
	mediumOrchid: "#ba55d3",
	mediumPurple: "#9370db",
	mediumSeaGreen: "#3cb371",
	mediumSlateBlue: "#7b68ee",
	mediumSpringGreen: "#00fa9a",
	mediumTurquoise: "#48d1cc",
	mediumVioletRed: "#c71585",
	midnightBlue: "#191970",
	mintCream: "#f5fffa",
	mistyRose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajoWhite: "#ffdead",
	navy: "#000080",
	oldLace: "#fdf5e6",
	olive: "#808000",
	oliveDrab: "#6b8e23",
	orange: "#ffa500",
	orangeRed: "#ff4500",
	orchid: "#da70d6",
	paleGoldenRod: "#eee8aa",
	paleGreen: "#98fb98",
	paleTurquoise: "#afeeee",
	paleVioletRed: "#db7093",
	papayaWhip: "#ffefd5",
	peachPuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderBlue: "#b0e0e6",
	purple: "#800080",
	rebeccaPurple: "#663399",
	red: "#ff0000",
	rosyBrown: "#bc8f8f",
	royalBlue: "#4169e1",
	saddleBrown: "#8b4513",
	salmon: "#fa8072",
	sandyBrown: "#f4a460",
	seaGreen: "#2e8b57",
	seaShell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyBlue: "#87ceeb",
	slateBlue: "#6a5acd",
	slateGray: "#708090",
	slateGrey: "#708090",
	snow: "#fffafa",
	springGreen: "#00ff7f",
	steelBlue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whiteSmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowGreen: "#9acd32",
	random() {
		const i = Object.values(this);
		i.pop();
		return Math.pick(i);
	}
};

BRANTH.Font = {
	H1: 48,
	H2: 36,
	H3: 24,
	H4: 16,
	H5: 14,
	H6: 10,
	Regular: "",
	Bold: "bold ",
	Italic: "italic ",
	BoldItalic: "bold italic ",
	FamilyDefault: "Maven Pro, sans-serif",
	generate(size, style=BRANTH.Font.Regular, family=BRANTH.Font.FamilyDefault) {
		return `${style}${size}px ${family}, serif`;
	}
};

BRANTH.Font.xxl = BRANTH.Font.generate(BRANTH.Font.H1);
BRANTH.Font.xl = BRANTH.Font.generate(BRANTH.Font.H2);
BRANTH.Font.l = BRANTH.Font.generate(BRANTH.Font.H3);
BRANTH.Font.m = BRANTH.Font.generate(BRANTH.Font.H4);
BRANTH.Font.sm = BRANTH.Font.generate(BRANTH.Font.H5);
BRANTH.Font.s = BRANTH.Font.generate(BRANTH.Font.H6);

BRANTH.Align = {
	l: "left",
	r: "right",
	c: "center",
	t: "top",
	b: "bottom",
	m: "middle"
};

BRANTH.LineCap = {
	Butt: "butt",
	Round: "round"
};

BRANTH.LineJoin = {
	Miter: "miter",
	Round: "round",
	Bevel: "bevel"
};

BRANTH.Primitive = {
	Fill: { name: "Fill", quantity: 0, closePath: true, outline: false },
	Line: { name: "Line", quantity: 0, closePath: false, outline: true },
	Stroke: { name: "Stroke", quantity: 0, closePath: true, outline: true },
	LineList: { name: "Line List", quantity: 2, closePath: false, outline: true },
	PointList: { name: "Point List", quantity: 1, closePath: false, outline: true },
	TriangleList: { name: "Triangle List", quantity: 3, closePath: true, outline: true },
	TriangleListFill: { name: "Triangle List Fill", quantity: 3, closePath: false, outline: false }
};

BRANTH.Draw = {
	ctx: BRANTH.Ctx,
	images: {},
	sprites: {},
	strips: {},
	setCtx(ctx) {
		this.ctx = ctx;
	},
	resetCtx() {
		this.ctx = BRANTH.Ctx;
	},
	setFont(font) {
		this.ctx.font = font;
	},
	setHAlign(align) {
		this.ctx.textAlign = align;
	},
	setVAlign(align) {
		this.ctx.textBaseline = align;
	},
	setHVAlign(halign, valign) {
		this.ctx.textAlign = halign;
		this.ctx.textBaseline = valign;
	},
	addImage(origin, name, img) {
		img.origin = origin;
		this.images[name] = img;
	},
	addSprite(origin, name, imgArray) {
		this.sprites[name] = [];
		for (const i of imgArray) {
			i.origin = origin;
			this.sprites[name].push(i);
		}
	},
	addStrip(origin, name, img, strip) {
		img.strip = strip;
		img.origin = origin;
		this.strips[name] = img;
	},
	image(name, x, y) {
		this.ctx.drawImage(this.images[name], x, y);
	},
	sprite(name, index, x, y) {
		this.ctx.drawImage(this.sprites[name][index], x, y);
	},
	strip(name, index, x, y) {
		const img = this.strips[name];
		const s = {
			w: img.width / img.strip,
			h: img.height
		};
		this.ctx.drawImage(img, (index % img.strip) * s.w, 0, s.w, s.h, x, y, s.w, s.h);
	}
};

BRANTH.OBJ = {};

BRANTH.Particle = {};

BRANTH.View = {};

BRANTH.start = (w=0, h=0, options={}) => {
	const canvasID = options.canvasID? options.canvasID : "branthMainCanvas";
	const style = document.createElement("style");
	style.innerHTML = `
		* {
			margin: 0;
			padding: 0;
		}
		${options.parent? options.parent : "body"} {
			width: ${w? `${w}px` : "100vw"};
			height: ${h? `${h}px` : "100vh"};
			overflow: hidden;
			position: absolute;
			top: ${options.VAlign? "50%" : "0"};
			left: ${options.HAlign? "50%" : "0"};
			transform: translate(${options.HAlign? "-50%" : "0"}, ${options.VAlign? "-50%" : "0"});
		}
		#${canvasID} {
			width: 100%;
			height: 100%;
		}
	`;
	BRANTH.Canvas.id = canvasID;
	BRANTH.Draw.setHVAlign(BRANTH.Align.l, BRANTH.Align.t);
	document.head.appendChild(style);
	document.body.appendChild(BRANTH.Canvas);
	style.onload = () => {
		BRANTH.Room.resize();
		BRANTH.Room.start("Load");
		BRANTH.render(0);
	};
};

BRANTH.render = (t) => {
	BRANTH.Time.update(t);
	BRANTH.Input.update();
	BRANTH.Sound.update();
	BRANTH.Room.clear();
	BRANTH.Room.current.render();
	BRANTH.Input.reset();
	window.requestAnimationFrame(BRANTH.render);
};

BRANTH.onLoadStart = () => {};
BRANTH.onLoadRender = () => {};
BRANTH.onLoadFinish = () => {};

BRANTH.Loader = {
	loaded: false,
	loadAmount: 0,
	loadedCount: 0,
	get loadProgress() {
		return BRANTH.Loader.loadedCount / Math.max(1, BRANTH.Loader.loadAmount);
	},
	loadImage(origin, name, src) {
		const img = new Image();
		img.src = src;
		BRANTH.Draw.addImage(origin, name, img);
		BRANTH.Loader.loadAmount++;
		img.onload = () => { BRANTH.Loader.loadedCount++; };
	},
	loadSprite(origin, name, srcArray) {
		const imgArray = [];
		for (const src of srcArray) {
			const img = new Image();
			img.src = src;
			imgArray.push(img);
			BRANTH.Loader.loadAmount++;
			img.onload = () => { BRANTH.Loader.loadedCount++; };
		}
		BRANTH.Draw.addSprite(origin, name, imgArray);
	},
	loadStrip(origin, name, src, strip) {}
};

BRANTH.Load = BRANTH.Room.add("Load");
BRANTH.Load.start = () => { BRANTH.onLoadStart(); };
BRANTH.Load.render = () => {
	if (!BRANTH.Loader.loaded) {
		if (BRANTH.Loader.loadedCount === BRANTH.Loader.loadAmount) {
			BRANTH.onLoadFinish();
			BRANTH.Loader.loaded = true;
		}
	}
	if (BRANTH.Room.current.name === "Load") {
		BRANTH.onLoadRender();
	}
};
delete BRANTH.Load;