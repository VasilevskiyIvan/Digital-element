import type { TEasingFunction } from "./easings";

type TTweenOptions = {
  durationMs: number;
  easing: TEasingFunction;
  onUpdate: (progress: number) => void;
  onComplete?: () => void;
};

/**
 *
 */
export const tween = ({
  durationMs,
  easing,
  onUpdate,
  onComplete,
}: TTweenOptions) => (
  new Promise<void>((resolve) => {
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const linear = Math.min(1, Math.max(0, elapsed / durationMs));
      const eased = easing(linear);
      onUpdate(eased);

      if (linear >= 1) {
        onComplete?.();
        resolve();
        return;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  })
);
