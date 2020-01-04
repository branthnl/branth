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
- Room System
```markdown
const Menu = new BranthRoom('Menu', width, height);
Room.add(Menu);
Room.start('Menu');
```