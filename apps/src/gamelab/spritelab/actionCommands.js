import * as spriteUtils from './spriteUtils';

export const commands = {
  changePropBy(spriteId, prop, val) {
    if (!val) {
      return;
    }
    let sprites = spriteUtils.singleOrGroup(spriteId);
    let specialCases = {
      scale: sprite => (sprite.scale += val / 100),
      y: sprite => (sprite.y -= val)
    };
    sprites.forEach(sprite => {
      if (specialCases[prop]) {
        specialCases[prop](sprite);
      } else {
        sprite[prop] += val;
      }
    });
  },
  edgesDisplace(spriteId) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => this.edges.displace(sprite));
  },
  isTouchingEdges(spriteId) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    let touching = false;
    sprites.forEach(sprite => {
      if (sprite.isTouching(this.edges)) {
        touching = true;
      }
    });
    return touching;
  },
  jumpTo(spriteId, location) {
    if (!location) {
      return;
    }
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => {
      sprite.x = location.x;
      sprite.y = location.y;
    });
  },
  mirrorSprite(spriteId, direction) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => {
      if (direction === 'right') {
        sprite.mirrorX(1);
      } else {
        sprite.mirrorX(-1);
      }
    });
  },
  moveForward(spriteId, distance) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => {
      if (sprite.direction) {
        let direction = sprite.direction % 360;
        sprite.x += distance * Math.cos((direction * Math.PI) / 180);
        sprite.y += distance * Math.sin((direction * Math.PI) / 180);
      }
    });
  },
  moveInDirection(spriteId, distance, direction) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    let dirs = {
      North: sprite => (sprite.y -= distance),
      East: sprite => (sprite.x += distance),
      South: sprite => (sprite.y += distance),
      West: sprite => (sprite.x -= distance)
    };
    if (!dirs[direction]) {
      console.error('invalid direction: ' + direction);
    }
    sprites.forEach(sprite => {
      dirs[direction](sprite);
    });
  },
  moveToward(spriteId, distance, target) {
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => {
      if (sprite && target) {
        let angle = Math.atan2(target.y - sprite.y, target.x - sprite.x);
        if (angle) {
          let dy = Math.sin(angle) * distance;
          let dx = Math.cos(angle) * distance;
          sprite.x += dx;
          sprite.y += dy;
        }
      }
    });
  },
  setProp(spriteId, prop, val) {
    if (!val) {
      return;
    }
    let sprites = spriteUtils.singleOrGroup(spriteId);
    let specialCases = {
      height: sprite =>
        (sprite.height = (sprite.animation.getHeight() * val) / 100),
      scale: sprite => (sprite.scale = val / 100),
      width: sprite =>
        (sprite.width = (sprite.animation.getWidth() * val) / 100),
      y: sprite => (sprite.y = 400 - val)
    };
    sprites.forEach(sprite => {
      if (specialCases[prop]) {
        specialCases[prop](sprite);
      } else {
        sprite[prop] = val;
      }
    });
  },
  turn(spriteId, n, direction) {
    if (!n) {
      return;
    }
    let sprites = spriteUtils.singleOrGroup(spriteId);
    sprites.forEach(sprite => {
      if (direction === 'right') {
        sprite.rotation += n;
      } else {
        sprite.rotation -= n;
      }
    });
  }
};
