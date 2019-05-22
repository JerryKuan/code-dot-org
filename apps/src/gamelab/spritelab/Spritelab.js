var commands = require('./commands');
import * as spriteUtils from './spriteUtils.js';

function drawBackground() {
  this.background(spriteUtils.background || 'white');
  if (typeof spriteUtils.background === 'object') {
    spriteUtils.background.resize(400, 400);
    this.image(spriteUtils.background);
  }
}

function updateTitle() {
  this.fill('black');
  this.textAlign(this.CENTER, this.CENTER);
  this.textSize(50);
  this.text(spriteUtils.title, 0, 0, 400, 200);
  this.textSize(35);
  this.text(spriteUtils.subtitle, 0, 200, 400, 200);
}

var Spritelab = function() {
  window.p5.prototype.executeDrawLoopAndCallbacks = function() {
    drawBackground.apply(this);
    this.drawSprites();
    updateTitle.apply(this);
  };

  window.p5.prototype.makeNewSpriteAnon = function(animation, location) {
    commands.makeSprite.apply(this, [animation, location]);
  };

  window.p5.prototype.createNewSprite = function(name, animation, location) {
    return commands.makeSprite.apply(this, [animation, location]);
  };

  window.p5.prototype.setAnimation = function(spriteIndex, animation) {
    commands.setAnimation.apply(this, [spriteIndex, animation]);
  };

  window.p5.prototype.getProp = function(spriteIndex, prop) {
    return commands.getProp.apply(this, [spriteIndex, prop]);
  };

  window.p5.prototype.destroy = function(spriteIndex) {
    commands.destroy.apply(this, [spriteIndex]);
  };

  // LOCATION commands
  window.p5.prototype.locationAt = function(x, y) {
    return commands.locationAt.apply(this, [x, y]);
  };
  window.p5.prototype.locationMouse = function() {
    return commands.locationMouse.apply(this, []);
  };
  window.p5.prototype.locationOf = function(spriteIndex) {
    return commands.locationOf.apply(this, [spriteIndex]);
  };

  // WORLD commands
  window.p5.prototype.hideTitleScreen = function() {
    commands.hideTitleScreen.apply(this, []);
  };
  window.p5.prototype.randColor = function() {
    return commands.randColor.apply(this, []);
  };
  window.p5.prototype.setBackground = function(color) {
    commands.setBackground.apply(this, [color]);
  };
  window.p5.prototype.setBackgroundImage = function(img) {
    commands.setBackgroundImage.apply(this, [img]);
  };
  window.p5.prototype.showTitleScreen = function(title, subtitle) {
    commands.showTitleScreen.apply(this, [title, subtitle]);
  };
};

module.exports = Spritelab;
