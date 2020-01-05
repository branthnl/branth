# branth
### Include
branth.js
### Description
Created to help me develop game faster on JavaScript. Also help me understand programming concept and game development in general. The file includes functions and setup I used mostly in every game I create on JavaScript.
### Syntax
Most of the syntax inspired from GameMaker Language and UnityEngine C#.
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
- Audio System
```markdown
Audio.add(name, path1, path2, path3..);
Audio.setVolume(name, 0.5);
Audio.play(name);
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
const Menu = new BranthRoom('Menu', width, height);
Room.add(Menu);
Room.start('Menu');
```
