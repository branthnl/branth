class Char extends BranthObject {
	constructor(imageIndex, x, y) {
		super(x, y);
		this.imageIndex = imageIndex;
	}
	update() {
		this.depth = -this.y * Branth.Input.keyHold(Branth.KeyCode.Space);
		this.x += Math.sin(Branth.Time.time * 0.001 + this.id) * 1;
		this.y -= Math.cos(Branth.Time.time * 0.001 + this.id) * 1;
	}
	render() {
		Branth.Draw.sprite("Char", this.imageIndex, this.x, this.y);
		Branth.Draw.text(this.x, this.y, this.depth.toFixed(2));
	}
}

class Chick extends Char {
	constructor(x, y) {
		super(2, x, y);
	}
}

Branth.OBJ.add("Char");
Branth.OBJ.add("Chick");
const Game = Branth.Room.add("Game");

Branth.onLoadStart = () => {
	Branth.Loader.loadSprite(new Vector2(0.5, 0.5), "Char", [
		"bear",
		"buffalo",
		"chick",
		"chicken",
		"cow",
		"crocodile",
		"dog",
		"duck",
		"elephant",
		"frog",
		"giraffe",
		"goat",
		"gorilla",
		"hippo",
		"horse",
		"monkey",
		"moose",
		"narwhal",
		"owl",
		"panda",
		"parrot",
		"penguin",
		"pig",
		"rabbit",
		"rhino",
		"sloth",
		"snake",
		"walrus",
		"whale",
		"zebra"]
		.map(x => `img/${x}.png`)
	);
};

Branth.onLoadFinish = () => {
	Branth.Room.start("Game");
};

Game.start = () => {
	for (let i = 10; i >= 0; i--) {
		for (let j = 5; j >= 0; j--) {
			Branth.OBJ.push("Char", new Char(Math.irange(30), 78 + 8 * i + 100 * j, 32 + 32 * i));
		}
	}
	for (let i = 10; i >= 0; i--) {
		Branth.OBJ.push("Chick", new Chick(250 - 8 * i, 64 + 32 * (10 - i)));
	}
};

Game.render = () => {
	Branth.OBJ.updateAll();
	Branth.OBJ.renderAll();
	// Destroy an object best after all objects are done with logic and render so it won't affect the array
	if (Branth.Input.keyDown(Branth.KeyCode.Enter)) {
		Branth.OBJ.destroy("Char", Math.pick(Branth.OBJ.take("Char").map(x => x.id)));
	}
	Branth.Draw.text(Branth.Room.mid.w, Branth.Room.mid.h, (Branth.Input.keyHold(Branth.KeyCode.Space)? "Release space to render with same depth" : "Hold space to render with -y as depth") + " | Press enter to randomly destroy char");
};

let options = {
	parentID: "gameContainer"
};

Branth.start(options);