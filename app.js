const Menu = BRANTH.Room.add("Menu");

const Time = BRANTH.Time;
const Room = BRANTH.Room;
const Draw = BRANTH.Draw;
const Loader = BRANTH.Loader;

BRANTH.onLoadStart = () => {
	Loader.loadImage(new Vector2(0, 0), "Bear", "img/bear.png");
	Loader.loadSprite(new Vector2(0.5, 0.5), "Char", ["bear", "buffalo", "chick", "chicken", "cow", "crocodile", "dog", "duck", "elephant", "frog", "giraffe", "goat", "gorilla", "hippo", "horse", "monkey", "moose", "narwhal", "owl", "panda", "parrot", "penguin", "pig", "rabbit", "rhino", "sloth", "snake", "walrus", "whale", "zebra"].map(x => `img/${x}.png`));
};

let count = 0;

BRANTH.onLoadRender = () => {
	count++;
	console.log(Loader.loadProgress);
};

BRANTH.onLoadFinish = () => {
	console.log(`Loaded ${Loader.loadedCount} sources in ${Time.time}ms`);
	Room.start("Menu");
};

Menu.render = () => {
	Draw.image("Bear", 0, 0);
};

BRANTH.start();