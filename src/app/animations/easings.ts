export type TEasingFunction = (time: number) => number;

/**
 *
 */
export const backOut = (overshoot: number): TEasingFunction => {
  const overshootCoef = overshoot * 1.70158;

  return (time) => {
    const t = time - 1;
    return 1 + (overshootCoef + 1) * t * t * t + overshootCoef * t * t;
  };
};

/**
 *
 */
export const elasticOut = (amplitude: number, period: number): TEasingFunction => {
  const twoPi = Math.PI * 2;

  return (time) => {
    if (time === 0 || time === 1) {
      return time;
    }

    const a = amplitude < 1 ? 1 : amplitude;
    const p = period;
    const s = (p / twoPi) * Math.asin(1 / a);

    return a * Math.pow(2, -10 * time) * Math.sin(((time - s) * twoPi) / p) + 1;
  };
};

/**
 *
 */
export const power2Out: TEasingFunction = (time) => 1 - (1 - time) * (1 - time);
