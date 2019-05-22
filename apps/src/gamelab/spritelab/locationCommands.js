import * as spriteUtils from './spriteUtils.js';

export const commands = {
  locationAt(x, y) {
    return {x: x, y: 400 - y};
  },
  locationMouse() {
    return {x: this.World.mouseX, y: this.World.mouseY};
  },
  locationOf(spriteIndex) {
    if (!spriteIndex) {
      return undefined;
    }
    let sprite = spriteUtils.singleOrGroup(spriteIndex)[0];
    if (sprite) {
      return {x: sprite.x, y: sprite.y};
    }
  },
  randomLocation() {
    let x = Math.floor(Math.random() * (380 - 20 + 1)) + 20;
    let y = Math.floor(Math.random() * (380 - 20 + 1)) + 20;
    return {x: x, y: y};
  },
  xLocationOf(spriteIndex) {
    let sprite = spriteUtils.singleOrGroup(spriteIndex)[0];
    if (sprite) {
      return sprite.x;
    }
  },
  yLocationOf(spriteIndex) {
    let sprite = spriteUtils.singleOrGroup(spriteIndex)[0];
    if (sprite) {
      return sprite.y;
    }
  }
};
