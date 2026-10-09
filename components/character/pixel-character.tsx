"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SPRITE_CONFIG, type AnimationName } from "@/lib/sprite-config";

const { frameWidth, frameHeight, scale, path, animations } = SPRITE_CONFIG;
const DISPLAY_W = frameWidth * scale;
const DISPLAY_H = frameHeight * scale;
const SHEET_SCALED_W = SPRITE_CONFIG.sheetWidth * scale;
const SHEET_SCALED_H = SPRITE_CONFIG.sheetHeight * scale;

// Movement
const WALK_SPEED = 22;
const RUN_SPEED = 42;
const ARRIVE_DISTANCE = 4;

// Pauses (ms)
const PAUSE_MIN = 1200;
const PAUSE_MAX = 3000;
const SIT_PAUSE_MIN = 3500;
const SIT_PAUSE_MAX = 7000;

// Idle animations
const IDLE_ANIMS: AnimationName[] = ["idle", "idle", "idle", "sit"];

// Hover reactions
const HOVER_ANIMS: AnimationName[] = ["kick", "attack", "damage"];

// Click celebrate
const CELEBRATE_ANIMS: AnimationName[] = ["jump", "win"];

// Draggable feels — what to play while held and after drop
const GRAB_ANIM: AnimationName = "pull";
const DROP_ANIM: AnimationName = "damage";

// Viewport margins
const MARGIN_X = 24;
const MARGIN_TOP = 96;
const MARGIN_BOTTOM = 24;

type Point = { x: number; y: number };

export function PixelCharacter() {
  const [mounted, setMounted] = useState(false);

  const posRef = useRef<Point>({ x: 0, y: 0 });
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState<Point>({ x: 0, y: 0 });

  const [animation, setAnimation] = useState<AnimationName>("idle");
  const animationRef = useRef<AnimationName>("idle");
  const frameRef = useRef(0);
  const [frame, setFrame] = useState(0);

  const lastTickRef = useRef<number>(performance.now());
  const frameTimerRef = useRef<number>(0);
  const pauseUntilRef = useRef<number>(0);
  const playingOneShotRef = useRef<boolean>(false);
  const wasMovingRef = useRef<boolean>(false);

  const [facingLeft, setFacingLeft] = useState(false);
  const facingLeftRef = useRef(false);

  const lastHoverRef = useRef<number>(0);

  // Drag state
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);

  const boundsRef = useRef({
    minX: MARGIN_X,
    maxX: 0,
    minY: MARGIN_TOP,
    maxY: 0,
  });

  useEffect(() => {
    animationRef.current = animation;
  }, [animation]);

  useEffect(() => {
    facingLeftRef.current = facingLeft;
  }, [facingLeft]);

  const updateBounds = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    boundsRef.current = {
      minX: MARGIN_X,
      maxX: Math.max(MARGIN_X + 40, w - DISPLAY_W - MARGIN_X),
      minY: MARGIN_TOP,
      maxY: Math.max(MARGIN_TOP + 40, h - DISPLAY_H - MARGIN_BOTTOM),
    };
  }, []);

  const clamp = (p: Point): Point => {
    const b = boundsRef.current;
    return {
      x: Math.min(Math.max(p.x, b.minX), b.maxX),
      y: Math.min(Math.max(p.y, b.minY), b.maxY),
    };
  };

  const pickNewTarget = useCallback(() => {
    const { minX, maxX, minY, maxY } = boundsRef.current;
    let x = minX + Math.random() * (maxX - minX);
    let y = minY + Math.random() * (maxY - minY);

    const dx = x - posRef.current.x;
    const dy = y - posRef.current.y;
    if (Math.hypot(dx, dy) < 80) {
      x = minX + Math.random() * (maxX - minX);
      y = minY + Math.random() * (maxY - minY);
    }

    targetRef.current = { x, y };
  }, []);

  const pickIdleBehavior = useCallback((): {
    anim: AnimationName;
    duration: number;
  } => {
    const pick = IDLE_ANIMS[Math.floor(Math.random() * IDLE_ANIMS.length)];
    const duration =
      pick === "sit"
        ? SIT_PAUSE_MIN + Math.random() * (SIT_PAUSE_MAX - SIT_PAUSE_MIN)
        : PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN);
    return { anim: pick, duration };
  }, []);

  const playOneShot = useCallback(
    (name: AnimationName, resumeMoving: boolean) => {
      if (playingOneShotRef.current) return;
      playingOneShotRef.current = true;
      wasMovingRef.current = resumeMoving;

      setAnimation(name);
      frameRef.current = 0;
      frameTimerRef.current = 0;

      const anim = animations[name];
      const totalMs = (anim.frames / anim.fps) * 1000;

      window.setTimeout(() => {
        playingOneShotRef.current = false;
        pauseUntilRef.current = 0;

        if (resumeMoving) {
          setAnimation("walk");
        } else {
          setAnimation("idle");
          wasMovingRef.current = false;
        }

        frameRef.current = 0;
        frameTimerRef.current = 0;
      }, totalMs);
    },
    [],
  );

  const handleHover = useCallback(() => {
    if (draggingRef.current) return;
    const now = performance.now();
    if (now - lastHoverRef.current < 1500) return;
    if (playingOneShotRef.current) return;

    lastHoverRef.current = now;
    const currentAnim = animationRef.current;
    const wasMoving = currentAnim === "walk" || currentAnim === "run";
    const pick = HOVER_ANIMS[Math.floor(Math.random() * HOVER_ANIMS.length)];
    playOneShot(pick, wasMoving);
  }, [playOneShot]);

  const handleClick = useCallback(() => {
    // If we just finished a drag, don't also trigger the click action
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    if (playingOneShotRef.current) return;
    const currentAnim = animationRef.current;
    const wasMoving = currentAnim === "walk" || currentAnim === "run";
    const pick =
      CELEBRATE_ANIMS[Math.floor(Math.random() * CELEBRATE_ANIMS.length)];
    playOneShot(pick, wasMoving);
  }, [playOneShot]);

  // ─── Drag handlers ──────────────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      // Left-click / touch only
      if (e.button !== 0) return;
      draggingRef.current = true;
      dragMovedRef.current = false;

      const rect = e.currentTarget.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Capture pointer so we keep receiving events even outside the button
      e.currentTarget.setPointerCapture(e.pointerId);

      // Cancel any in-progress one-shot and lock into grab animation
      playingOneShotRef.current = false;
      pauseUntilRef.current = 0;
      setAnimation(GRAB_ANIM);
      frameRef.current = 0;
      frameTimerRef.current = 0;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!draggingRef.current) return;

      const next = clamp({
        x: e.clientX - dragOffsetRef.current.x,
        y: e.clientY - dragOffsetRef.current.y,
      });

      // Mark as moved only after a real displacement
      const dx = next.x - posRef.current.x;
      const dy = next.y - posRef.current.y;
      if (Math.hypot(dx, dy) > 3) dragMovedRef.current = true;

      posRef.current = next;
      setRenderPos(next);
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — pointer capture might already be released
      }

      // Drop animation, then resume wandering
      playingOneShotRef.current = false;
      playOneShot(DROP_ANIM, false);

      // Pick a fresh target far from current position
      const { minX, maxX, minY, maxY } = boundsRef.current;
      let x = minX + Math.random() * (maxX - minX);
      let y = minY + Math.random() * (maxY - minY);
      const dx = x - posRef.current.x;
      const dy = y - posRef.current.y;
      if (Math.hypot(dx, dy) < 120) {
        x = minX + Math.random() * (maxX - minX);
        y = minY + Math.random() * (maxY - minY);
      }
      targetRef.current = { x, y };
    },
    [playOneShot],
  );

  // ─── Main loop ──────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    updateBounds();

    const initBounds = boundsRef.current;
    const initX =
      initBounds.minX + Math.random() * (initBounds.maxX - initBounds.minX);
    const initY =
      initBounds.minY + Math.random() * (initBounds.maxY - initBounds.minY);
    posRef.current = { x: initX, y: initY };
    setRenderPos({ x: initX, y: initY });
    pickNewTarget();

    window.addEventListener("resize", updateBounds);

    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - lastTickRef.current) / 1000, 0.05);
      lastTickRef.current = now;

      const anim = animations[animationRef.current];

      frameTimerRef.current += dt;
      const frameDuration = 1 / anim.fps;
      if (frameTimerRef.current >= frameDuration) {
        frameTimerRef.current -= frameDuration;
        frameRef.current += 1;
        if (frameRef.current >= anim.frames) {
          frameRef.current = anim.loop ? 0 : anim.frames - 1;
        }
        setFrame(frameRef.current);
      }

      // No movement while dragging
      if (draggingRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const paused = now < pauseUntilRef.current;
      const canMove = !paused && !playingOneShotRef.current && anim.loop;

      if (canMove) {
        const dx = targetRef.current.x - posRef.current.x;
        const dy = targetRef.current.y - posRef.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < ARRIVE_DISTANCE) {
          const { anim: idleAnim, duration } = pickIdleBehavior();
          pauseUntilRef.current = now + duration;
          setAnimation(idleAnim);
          frameRef.current = 0;
          frameTimerRef.current = 0;
          pickNewTarget();
        } else {
          const useRun = dist > 350;
          const speed = useRun ? RUN_SPEED : WALK_SPEED;
          const step = speed * dt;
          posRef.current.x += (dx / dist) * step;
          posRef.current.y += (dy / dist) * step;
          setRenderPos({ x: posRef.current.x, y: posRef.current.y });

          const desired: AnimationName = useRun ? "run" : "walk";
          if (animationRef.current !== desired) {
            setAnimation(desired);
            frameRef.current = 0;
            frameTimerRef.current = 0;
          }

          if (dx < -1 && !facingLeftRef.current) setFacingLeft(true);
          else if (dx > 1 && facingLeftRef.current) setFacingLeft(false);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateBounds);
    };
  }, [pickIdleBehavior, pickNewTarget, updateBounds]);

  if (!mounted) return null;

  const anim = animations[animation];
  const bgX = -((anim.colStart + frame) * frameWidth) * scale;
  const bgY = -(anim.row * frameHeight) * scale;

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleHover}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Character"
      tabIndex={-1}
      className="fixed z-30 select-none touch-none"
      style={{
        width: DISPLAY_W,
        height: DISPLAY_H,
        left: renderPos.x,
        top: renderPos.y,
        transform: facingLeft ? "scaleX(-1)" : undefined,
        transformOrigin: "center",
        transition: draggingRef.current ? "none" : "transform 100ms ease-out",
        pointerEvents: "auto",
        cursor: draggingRef.current ? "grabbing" : "grab",
      }}
    >
      <div
        style={{
          width: DISPLAY_W,
          height: DISPLAY_H,
          backgroundImage: `url(${path})`,
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${SHEET_SCALED_W}px ${SHEET_SCALED_H}px`,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </button>
  );
}
