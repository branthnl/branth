const C = Branth.C,
	OBJ = Branth.OBJ,
	Time = Branth.Time,
	Room = Branth.Room,
	Draw = Branth.Draw,
	Font = Branth.Font,
	Align = Branth.Align,
	Input = Branth.Input,
	Sound = Branth.Sound,
	Loader = Branth.Loader,
	Emitter = Branth.Emitter,
	KeyCode = Branth.KeyCode,
	Primitive = Branth.Primitive,
	Menu = Branth.Room.add("Menu"),
	Tuts = Branth.Room.add("Tuts"),
	Game = Branth.Room.add("Game");

Branth.onLoadStart = () => {
	Loader.loadImage(new Vector2(0, 0), "Bear", "img/bear.png");
	Loader.loadSprite(new Vector2(0.5, 0.5), "Char", [
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
	Room.start("Menu");
};

let bear = new Vector2(0, 0);

Menu.render = () => {
	Draw.image("Bear", bear.x, bear.y);
	if (Input.mouseDown(0)) {
		bear.x = Input.mousePosition.x;
		bear.y = Input.mousePosition.y;
	}
	bear.x += (1 + 4 * Input.keyHold(KeyCode.Shift)) * (Input.keyHold(KeyCode.Right) - Input.keyHold(KeyCode.Left));
	bear.y += (1 + 4 * Input.keyHold(KeyCode.Shift)) * (Input.keyHold(KeyCode.Down) - Input.keyHold(KeyCode.Up));
};

const options = {
	parentID: "gameContainer"
};

Branth.start(options);