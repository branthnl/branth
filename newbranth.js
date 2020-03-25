class Branth {
	Time = {
		time: 0,
		lastTime: 0,
		deltaTime: 0,
		startTime: 0,
		update(t) {
			this.lastTime = this.time;
			this.time = t - this.startTime;
			this.deltaTime = this.time - this.lastTime;
		}
	};
	Room = {
		w: 0,
		h: 0,
		rooms: {},
		current: null,
		previous: null,
		add(room) {
			this.rooms[room.name] = room;
		},
		start(name) {
			if (this.rooms[name]) {
				this.previous = this.current;
				this.current = this.rooms[name];
			}
			else Branth.log(`Room not found: ${name}`);
		}
	};
	static createRoom(name) {
		return {
			name: name,
			start() {},
			render() {},
			renderUI() {}
		};
	}
	static log(s) {
		console.log(s);
	}
	static games = {};
	constructor(name, w=0, h=0) {
		if (name) {
			this.name = name;
			this.Room.w = w;
			this.Room.h = h;
			Branth.games[this.name] = this;
		}
		else Branth.log("Please provide a name for the game");
	}
	start(name) {
		this.Room.start(name);
		if (this.Room.current) {
			this.Time.startTime = window.performance.now();
			Branth.render(0, this.name);
		}
	}
	static render(t, name) {
		Branth.games[name].Time.update(t);
		window.requestAnimationFrame((t) => Branth.render(t, name));
	}
}

const Boot = Branth.createRoom("Boot");
const Menu = Branth.createRoom("Menu");
const Tuts = Branth.createRoom("Tuts");
const Game = Branth.createRoom("Game");

const DOTA = new Branth("DOTA", 960, 540);

DOTA.Room.add(Boot);
DOTA.Room.add(Menu);
DOTA.Room.add(Tuts);
DOTA.Room.add(Game);

DOTA.start("Boot");