var commands = require('./commands');
import * as spriteUtils from './spriteUtils';

var Spritelab = function() {
  this.reset = () => spriteUtils.reset();
  this.commands = {};

  this.commands.executeDrawLoopAndCallbacks = function() {
    this.createEdgeSprites();
    this.drawSprites();
  };

  // Sprite commands
  this.commands.createNewSprite = function(name, animation, location) {
    return commands.makeSprite.apply(this, [animation, location]);
  };

  this.commands.destroy = function(spriteId) {
    commands.destroy(spriteId);
  };

  this.commands.displace = function(spriteId, targetSpriteIndex) {
    commands.displace(spriteId, targetSpriteIndex);
  };

  this.commands.getProp = function(spriteId, prop) {
    return commands.getProp(spriteId, prop);
  };

  this.commands.makeNewSpriteAnon = function(animation, location) {
    commands.makeSprite.apply(this, [animation, location]);
  };

  this.commands.setAnimation = function(spriteId, animation) {
    commands.setAnimation(spriteId, animation);
  };
};

module.exports = Spritelab;
