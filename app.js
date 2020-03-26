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

Menu.render = () => {
	Draw.image("Bear", 0, 0);
};

const options = {
	w: 360,
	h: 540,
	align: 0.5,
	noStyle: true,
	borderRadius: 20,
	parentID: "gameContainer"
};

Branth.start(options);