class Box extends BranthObject {
	constructor(x, y) {
		super(x, y);
		this.hsp = 0;
		this.vsp = 0;
		this.jumpHold = false;
		this.isGrounded = false;
	}
	update() {
		const gp = navigator.getGamepads()[0];
		if (gp) {
			if (gp.axes[0] === 1) {
				this.hsp = Math.min(10, this.hsp + 0.4);
			}
			if (gp.axes[0] === -1) {
				this.hsp = Math.max(-10, this.hsp - 0.4);
			}
			if (gp.buttons[2].pressed) {
				if (!this.jumpHold) {
					if (this.isGrounded) {
						this.vsp = -15;
						this.isGrounded = false;
					}
					this.jumpHold = true;
				}
			}
			else this.jumpHold = false;
		}
		this.x += this.hsp;
		this.y += this.vsp;
		this.hsp *= 0.96;
		this.vsp += 0.98;
		this.x = Math.clamp(this.x, 12, Room.w - 12);
		let groundCounter = 0;
		if (this.y >= Room.h - 32) {
			this.y = Room.h - 32;
			groundCounter++;
		}
		else {
			const o = OBJ.take("Block");
			for (let i = o.length - 1; i >= 0; i--) {
				if (this.x > o[i].x && this.x < o[i].x + o[i].w && this.y > o[i].y && this.y < o[i].y + o[i].h) {
					this.y = o[i].y;
					groundCounter++;
				}
			}
		}
		if (!this.isGrounded && groundCounter > 0) {
			this.isGrounded = true;
			this.vsp = 0;
		}
		else if (this.isGrounded && groundCounter === 0) {
			this.isGrounded = false;
		}
	}
	render() {
		Draw.setColor(C.skyBlue);
		Draw.rect(this.x - 12, this.y - 24, 24, 24);
	}
}

class Block extends BranthObject {
	constructor(x, y, w, h) {
		super(x, y);
		this.w = w;
		this.h = h;
	}
	render() {
		Draw.setColor(C.black);
		Draw.rect(this.x, this.y, this.w, this.h);
	}
}

OBJ.add("Box");
OBJ.add("Block");

const Game = Room.add("Game");

Branth.onLoadFinish = () => {
	Room.start("Game");
};

Game.start = () => {
	OBJ.push("Box", new Box(Room.mid.w, Room.mid.h));
	OBJ.push("Block", new Block(0, Room.h * 0.8, 200, 32));
};

Game.render = () => {
	OBJ.updateAll();
	OBJ.renderAll();
};

Branth.start({
	w: 960,
	h: 540,
	align: 0.5,
	styleParent: true,
	removeAllGap: true
});