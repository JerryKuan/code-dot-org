import * as spriteUtils from './spriteUtils.js';

export const commands = {
  makeSprite(animation, location) {
    if (!location) {
      location = {x: 200, y: 200};
    }
    if (typeof location === 'function') {
      location = location();
    }
    var sprite = this.createSprite(location.x, location.y);
    spriteUtils.nativeSpriteMap[spriteUtils.spriteId] = sprite;
    sprite.id = spriteUtils.spriteId;
    if (animation) {
      sprite.setAnimation(animation);
    }
    spriteUtils.spriteId++;
    return sprite.id;
  },

  setAnimation(spriteIndex, animation) {
    let sprites = spriteUtils.singleOrGroup(spriteIndex);
    sprites.forEach(sprite => {
      sprite.setAnimation(animation);
    });
  },

  getProp(spriteIndex, prop) {
    if (!spriteIndex) {
      return undefined;
    }
    let sprite = spriteUtils.singleOrGroup(spriteIndex)[0];
    if (prop === 'scale') {
      return sprite.scale * 100;
    } else if (prop === 'costume') {
      return sprite.getAnimationLabel();
    } else if (prop === 'y') {
      return 400 - sprite.y;
    } else {
      return sprite[prop];
    }
  },

  destroy(spriteIndex) {
    let sprites = spriteUtils.singleOrGroup(spriteIndex);
    sprites.forEach(sprite => {
      sprite.destroy();
      delete spriteUtils.nativeSpriteMap[sprite.id];
    });
  }
};
