const RAF = requestAnimatioFrame;
const BRANTH = {};

BRANTH.Time = {
	time: 0,
	lastTime: 0,
	deltaTime: 0,
	startTime: 0,
	start() {
		this.startTime = Date.now();
	},
	update() {
		this.lastTime = this.time;
		this.time = Date.now() - this.startTime;
		this.deltaTime = this.time - this.lastTime;
	}
};

BRANTH.BranthRoom = function(name) {
	this.name = name;
};

BRANTH.BranthRoom.prototype.start = function() {};
BRANTH.BranthRoom.prototype.update = function() {};
BRANTH.BranthRoom.prototype.render = function() {};
BRANTH.BranthRoom.prototype.renderUI = function() {};

BRANTH.start = () => {
	Menu.start();
	Menu.render();
	Menu.renderUI();
	BRANTH.Time.start();
	BRANTH.render(0);
};

BRANTH.render = (t) => {
	BRANTH.Time.update(t);
	Menu.update();
	RAF(BRANTH.render);
};

const Menu = new BRANTH.BranthRoom("Menu");

Menu.start = () => {
	console.log("Game start");
};

Menu.update = () => {
	console.log(BRANTH.Time.deltaTime);
};

BRANTH.start();