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

export function runEvents() {}

export function runBehaviors() {}
