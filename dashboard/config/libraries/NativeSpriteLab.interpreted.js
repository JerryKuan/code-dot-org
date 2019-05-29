function draw() {
  executeDrawLoopAndCallbacks();
}

/* Legacy code only. Do not add any new code below here */
function clickedOn(spriteId, callback) {
  spriteClicked('when', spriteId, callback);
}

function draggable() {}

function pointInDirection(spriteId,direction) {
    if (direction== "North") {
      setProp(spriteId, 'rotation', 360);
    }
 	else if (direction== "East") {
      setProp(spriteId, 'rotation', 90);
 	}
    else if (direction=="South") {
      setProp(spriteId, 'rotation', 180);
    }
	else if (direction=="West") {
      setProp(spriteId, 'rotation', 270);
    }
    else {
      console.error("pointInDirection: invalid direction provided");
    }
}

function randColor() {
  return color(randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)).toString();
}

function randomColor() {
  return randColor();
}

function setSizes(spriteId,property,val) {
  setProp(spriteId, property, val);
}

function setupSim() {}

function whenDownArrow(callback) {
  keyPressed('when', 'down', callback);
}

function whenKey(key, callback) {
  keyPressed('when', key, callback);
}

function whenLeftArrow(callback) {
  keyPressed('when', 'left', callback);
}

function whenRightArrow(callback) {
  keyPressed('when', 'right', callback);
}

function whenTouching(sprite1, sprite2, callback) {
  checkTouching('when', sprite1, sprite2, callback);
}

function whenUpArrow(callback) {
  keyPressed('when', 'up', callback);
}

function whileDownArrow(callback) {
  keyPressed('while', 'down', callback);
}

function whileKey(key, callback) {
  keyPressed('while', key, callback);
}

function whileLeftArrow(callback) {
  keyPressed('while', 'left', callback);
}

function whileRightArrow(callback) {
  keyPressed('while', 'down', callback);
}

function whileTouching(sprite1, sprite2, callback) {
  checkTouching('while', sprite1, sprite2, callback);
}

function whileUpArrow(callback) {
  keyPressed('while', 'up', callback);
}

function xLocationOf(spriteId) {
  return getProp(spriteId, 'x');
}

function yLocationOf(spriteId) {
  return getProp(spriteId, 'y');
}
