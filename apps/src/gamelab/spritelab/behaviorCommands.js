import * as spriteUtils from './spriteUtils';

export const commands = {
  addBehavior(spriteId, behavior) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => spriteUtils.addBehavior(sprite, behavior));
  },

  Behavior(func) {
    return {func: func, name: func.funcName};
  },

  removeAllBehaviors(spriteId) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => spriteUtils.removeAllBehaviors(sprite));
  },

  removeBehavior(spriteId, behavior) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => spriteUtils.removeBehavior(sprite, behavior));
  }
};
