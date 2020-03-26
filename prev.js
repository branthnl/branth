class Char extends BranthObject {
	constructor(imageName, x, y) {
		super(x, y);
		this.imageName = imageName;
	}
	update() {
		this.depth = -this.y * Branth.Input.keyHold(Branth.KeyCode.Space);
		this.x += Math.sin(Branth.Time.time * 0.001 + this.id) * 1;
		this.y -= Math.cos(Branth.Time.time * 0.001 + this.id) * 1;
	}
	render() {
		Branth.Draw.image(this.imageName, this.x, this.y);
		Branth.Draw.text(this.x, this.y, this.depth.toFixed(2));
	}
}

class Chick extends Char {
	constructor(x, y) {
		super("Chick", x, y);
	}
}

Branth.OBJ.add("Char");
const Game = Branth.Room.add("Game");

Branth.onLoadStart = () => {
	Branth.Loader.loadImage(new Vector2(0.5, 0.5), "Bear", "img/bear.png");
	Branth.Loader.loadImage(new Vector2(0.5, 0.5), "Chick", "img/chick.png");
};

Branth.onLoadFinish = () => {
	Branth.Room.start("Game");
};

Game.start = () => {
	for (let i = 10; i >= 0; i--) {
		Branth.OBJ.push("Char", new Char("Bear", 78 + 8 * i, 32 + 32 * i));
	}
	for (let i = 10; i >= 0; i--) {
		Branth.OBJ.push("Char", new Chick(250 - 8 * i, 64 + 32 * (10 - i)));
	}
};

Game.render = () => {
	Branth.OBJ.updateAll();
	Branth.OBJ.renderAll();
	// Destroy an object best after all objects are done with logic and render so it won't affect the array
	if (Branth.Input.keyDown(Branth.KeyCode.Enter)) {
		Branth.OBJ.destroy("Char", Math.pick(Branth.OBJ.take("Char").map(x => x.id)));
	}
	Branth.Draw.text(Branth.Room.mid.w, Branth.Room.mid.h, Branth.Input.keyHold(Branth.KeyCode.Space)? "Release space to render with same depth" : "Hold space to render with -y as depth" + " | Press enter to randomly destroy char");
};

let options = {
	parentID: "gameContainer"
};

Branth.start(options);