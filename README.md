# branth
branth.js
Created to help me develop game faster on JavaScript. Also help me understand programming concept and game development in general.
### Description
This file includes functions and setup I used mostly in every game I create on JavaScript.
### Syntax
Most of the syntax inspired from GameMaker Language and UnityEngine C#.
### Features
- Extra Math Function
```markdown
const r = Math.range(0, 100);
this.spd = Math.clamp(r, this.spd.min, this.spd.max) * Math.randomNegator();
this.direction = Math.radtodeg(this.angle);
this.end.x = Math.lengthDirX(this.len, this.direction);
```
- Simplified Draw Function
```markdown
Draw.setColor(C.red);
Draw.circle(this.x, this.y, this.r);
```
- Object Handler
```markdown
OBJ.add('ball', new Ball(32, 32, 5));
OBJ.take('ball')[0].reset();
```
- Particle System
```markdown
Emitter.setArea(this.x - 2, this.x + 2, this.y - 2, this.y + 2);
Emitter.preset('explosion');
Emitter.setDirection(0, 360);
Emitter.emit(20);
```
- Audio System
```markdown
Audio.play('confirm');
if (!Audio.isPlaying('bgm')) {
    Audio.loop('bgm');
}
```
