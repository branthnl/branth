# branth
### Include
branth.js
### Description
Created to help me develop game faster on JavaScript. Also help me understand programming concept and game development in general. The file includes functions and setup I used mostly in every game I create on JavaScript.
### Syntax
Most of the syntax inspired from GameMaker Language and UnityEngine C#.
### Getting Started
1. Create and add room.
```markdown
const RoomGame = new BranthRoom('Game');
Room.add(RoomGame);
```
2a. Start BRANTH and the room. The size will be in fullscreen.
```markdown
BRANTH.start();
Room.start('Game');
```
2b. You can set the size and more options on BRANTH.start(w, h, ?options).
```markdown
// The canvas will be 640x360 and center-aligned both horizontally and vertically.
const options = {
  HAlign: true,
  VAlign: true,
  backgroundColor: C.red;
};
BRANTH.start(640, 360, options);
```
3. Override the function from RoomGame to manage current room.
```markdown
RoomGame.start = () => {
  // Called once as the room start
};

RoomGame.update = () => {
  // Called every frame (60fps)
};

RoomGame.render = () => {
  // Draw here
};

RoomGame.renderUI = () => {
  // Called after all render() functions
};
4. I gtg, brb.
```
### Features
- Extra Math Function
```markdown
Math.clamp(value, min, max);
Math.range(min, max);
Math.degtorad(degrees);
Math.radtodeg(radians);
Math.choose(x1, x2, x3..);
```
- Time Struct
```markdown
Time.toSeconds(Time.time);
Time.toClockSeconds(Time.time);
```
- Sound System
```markdown
Sound.add(name, path1, path2, path3..);
Sound.setVolume(name, 0.5);
Sound.play(name);
```
- Input System
```markdown
if (Input.keyDown(KeyCode.E)) //
if (Input.mouseHold(Mouse.Left)) //
this.x = Input.mousePosition.x;
```
- Draw Struct
```markdown
Draw.setColor(color);
Draw.text(x, y, text);
Draw.star(x, y, r, outline);
Draw.ellipse(x, y, w, h, outline);
```
- Object Handler
```markdown
OBJ.add(class);
OBJ.create(class, x, y);
```
- Particle System
```markdown
Emitter.preset('sparkle');
Emitter.setArea(xmin, xmax, ymin, ymax);
Emitter.setGravity(0, 0);
Emitter.emit(10);
```
- Room System
```markdown
const Menu = new BranthRoom('Menu');
Room.add(Menu);
Room.start('Menu');
```
