const BRANTH = {};

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