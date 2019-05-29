var spriteId = 0;
var nativeSpriteMap = {};
var inputEvents = [];
var behaviors = [];

export var background;
export var title = '';
export var subtitle = '';

export function reset() {
  spriteId = 0;
  nativeSpriteMap = {};
  inputEvents = [];
  behaviors = [];
}

/**
 * Returns a list of all sprites that have the specified animation.
 * Called on each tick of the draw loop because animations can change throughout runtime.
 * @param {string} animation - animation name
 */
function allSpritesWithAnimation(animation) {
  let group = [];
  Object.keys(nativeSpriteMap).forEach(spriteId => {
    if (nativeSpriteMap[spriteId].getAnimationLabel() === animation) {
      group.push(nativeSpriteMap[spriteId]);
    }
  });
  return group;
}

/**
 * Returns a list of sprites, specified either by id or animation name.
 * @param {(string|number)} spriteOrGroup - Either the id or the animation name
 * @return {[Sprite]} List of sprites that match the parameter. Either a list containing the one sprite
 * the specified id, or a list containing all sprites with the specified animation.
 */
export function singleOrGroup(spriteOrGroup) {
  if (typeof spriteOrGroup === 'number') {
    const sprite = nativeSpriteMap[spriteOrGroup];
    return [sprite];
  }
  if (typeof spriteOrGroup === 'string') {
    return allSpritesWithAnimation(spriteOrGroup);
  }
  return [];
}

/**
 * Adds the specified sprite to the native sprite map
 * @param {Sprite} sprite
 * @returns {Number} A unique id to reference the sprite.
 */
export function addSprite(sprite) {
  nativeSpriteMap[spriteId] = sprite;
  sprite.id = spriteId;
  spriteId++;
  return sprite.id;
}

/**
 * Removes a sprite from the native sprite map
 * @param {Number} spriteId
 */
export function deleteSprite(spriteId) {
  delete nativeSpriteMap[spriteId];
}

export function addEvent(type, args, callback) {
  inputEvents.push({type: type, args: args, callback: callback});
}

function checkEvent(inputEvent, p5Inst) {
  let shouldEventFire = false;
  switch (inputEvent.type) {
    case 'whenpress':
      return p5Inst.keyWentDown(inputEvent.args.key);
    case 'whilepress':
      return p5Inst.keyDown(inputEvent.args.key);
    case 'whentouch': {
      let sprites = singleOrGroup(inputEvent.args.sprite1);
      let targets = singleOrGroup(inputEvent.args.sprite2);
      let overlap = false;
      sprites.forEach(sprite => {
        targets.forEach(target => {
          if (sprite.overlap(target)) {
            overlap = true;
          }
        });
      });
      if (overlap && !inputEvent.firedOnce) {
        shouldEventFire = true;
        inputEvent.firedOnce = true;
      }
      if (!overlap) {
        inputEvent.firedOnce = false;
      }
      return shouldEventFire;
    }
    case 'whiletouch': {
      let sprites = singleOrGroup(inputEvent.args.sprite1);
      let targets = singleOrGroup(inputEvent.args.sprite2);
      sprites.forEach(sprite => {
        targets.forEach(target => {
          if (sprite.overlap(target)) {
            shouldEventFire = true;
          }
        });
      });
      return shouldEventFire;
    }
    case 'whenclick': {
      if (p5Inst.mouseWentDown('leftButton')) {
        let sprites = singleOrGroup(inputEvent.args.sprite);
        sprites.forEach(sprite => {
          if (p5Inst.mouseIsOver(sprite)) {
            shouldEventFire = true;
          }
        });
      }
      return shouldEventFire;
    }
    case 'whileclick': {
      let sprites = singleOrGroup(inputEvent.args.sprite);
      sprites.forEach(sprite => {
        if (p5Inst.mousePressedOver(sprite)) {
          shouldEventFire = true;
        }
      });
      return shouldEventFire;
    }
  }
}

export function runEvents(p5Inst) {
  inputEvents.forEach(inputEvent => {
    if (checkEvent(inputEvent, p5Inst)) {
      inputEvent.callback();
    }
  });
}

export function addBehavior(sprite, behavior) {
  if (sprite && behavior) {
    let existing = behaviors.find(
      b => b.sprite === sprite && b.name === behavior.name
    );
    if (!existing) {
      behaviors.push({
        func: behavior.func,
        name: behavior.name,
        sprite: sprite
      });
    }
  }
}

export function removeAllBehaviors(sprite) {
  behaviors = behaviors.filter(behavior => behavior.sprite !== sprite);
}

export function removeBehavior(sprite, behavior) {
  if (sprite && behavior) {
    let index = behaviors.findIndex(
      b => b.sprite === sprite && b.name === behavior.name
    );
    if (index !== -1) {
      behaviors.splice(index, 1);
    }
  }
}

export function runBehaviors() {
  behaviors.forEach(behavior => behavior.func(behavior.sprite.id));
}
