export const SPRITE_CONFIG = {
  frameWidth: 24,
  frameHeight: 24,
  sheetWidth: 192,
  sheetHeight: 144,
  scale: 3,
  path: "/sprites/protagonist.png",
  animations: {
    idle: { row: 0, colStart: 0, frames: 2, fps: 2, loop: true },
    kick: { row: 0, colStart: 2, frames: 2, fps: 5, loop: false },
    attack: { row: 0, colStart: 4, frames: 2, fps: 5, loop: false },
    damage: { row: 0, colStart: 6, frames: 2, fps: 5, loop: false },
    walk: { row: 1, colStart: 0, frames: 4, fps: 6, loop: true },
    run: { row: 1, colStart: 4, frames: 4, fps: 10, loop: true },
    push: { row: 2, colStart: 0, frames: 4, fps: 6, loop: true },
    pull: { row: 2, colStart: 4, frames: 4, fps: 6, loop: true },
    jump: { row: 3, colStart: 0, frames: 8, fps: 10, loop: false },
    win: { row: 4, colStart: 0, frames: 4, fps: 5, loop: false },
    die: { row: 4, colStart: 4, frames: 4, fps: 5, loop: false },
    sit: { row: 5, colStart: 0, frames: 2, fps: 2, loop: true },
  },
} as const;

export type AnimationName = keyof typeof SPRITE_CONFIG.animations;
