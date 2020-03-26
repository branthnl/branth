Branth.onLoadRender = () => {
	Branth.Draw.setFont(Branth.Font.l);
	Branth.Draw.setHVAlign(Branth.Align.c, Branth.Align.m);
	let y = Branth.Draw.textHeight;
	Branth.Draw.textRegular(Branth.Room.mid.w, y, `(${~~Branth.Room.mid.w}, ${~~Branth.Room.mid.h})`);
	y += Branth.Draw.textHeight * 0.5;
	Branth.Draw.setFont(Branth.Font.xxl);
	Branth.Draw.setVAlign(Branth.Align.t);
	Branth.Draw.setStroke(Branth.C.white);
	Branth.Draw.textRegular(Branth.Room.mid.w, y, `(${~~Branth.Room.mid.w}, ${~~Branth.Room.mid.h})`, true);
	y = Branth.Room.mid.h;
	const bb = ~~(Branth.Time.time * 0.001) % 2 > 0;
	Branth.Draw.setHVAlign(Branth.Align.r, bb? Branth.Align.b : Branth.Align.m);
	Branth.Draw.text(Branth.Room.mid.w, y, `right\n${bb? "bottom" : "middle"}\naligned\ntext`);
	Branth.Draw.setHVAlign(bb? Branth.Align.r : Branth.Align.l, Branth.Align.t);
	Branth.Draw.text(Branth.Room.mid.w, y, `${bb? "right" : "left"}\ntop\naligned\ntext`);
	Branth.Draw.setHVAlign(Branth.Align.l, bb? Branth.Align.m : Branth.Align.b);
	const txt = `left\n${bb? "middle" : "bottom"}\naligned${Math.random().toFixed(5)}${bb? `\n${Math.random()}` : ""}\ntext}`;
	Branth.Draw.rect(Branth.Room.mid.w, y - Branth.Draw.getTextHeight(txt) * (1 - 0.5 * bb), Branth.Draw.getTextWidth(txt), Branth.Draw.getTextHeight(txt), true);
	Branth.Draw.text(Branth.Room.mid.w, y, txt);
};

const options = {
	autoResize: true,
	styleParent: true,
	removeAllGap: true
};
Branth.start(options);