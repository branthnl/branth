const DOTA = BRANTH;
const Menu = DOTA.Room.add("Menu");

DOTA.onLoadStart = () => {
	DOTA.Loader.loadImage(new Vector2(0, 0), "Bear", "img/bear.png");
	DOTA.Loader.loadSprite(new Vector2(0.5, 0.5), "Char", ["bear", "buffalo", "chick", "chicken", "cow", "crocodile", "dog", "duck", "elephant", "frog", "giraffe", "goat", "gorilla", "hippo", "horse", "monkey", "moose", "narwhal", "owl", "panda", "parrot", "penguin", "pig", "rabbit", "rhino", "sloth", "snake", "walrus", "whale", "zebra"].map(x => `img/${x}.png`));
};

DOTA.onLoadFinish = () => {
	console.log("Loaded in " + BRANTH.Time.time);
	DOTA.Room.start("Menu");
};

Menu.render = () => {
	DOTA.Draw.image("Bear", 0, 0);
};

DOTA.start();