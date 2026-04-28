export type TEasingFunction = (time: number) => number;

/**
 * Back out easing
 * Кривая с небольшим выходом за предел в конце
 * @param {number} overshoot - сила выхода за предел
 * @returns {TEasingFunction} функция анимации
 */
export const backOut = (overshoot: number): TEasingFunction => {
  const overshootCoef = overshoot * 1.70158;

  return (time) => {
    const t = time - 1;
    return 1 + (overshootCoef + 1) * t * t * t + overshootCoef * t * t;
  };
};

/**
 * Elastic out easing
 * Кривая с эффектом пружины и затуханием
 * @param {number} amplitude - сила колебаний
 * @param {number} period - длина колебания
 * @returns {TEasingFunction} функция анимации
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
 * Power 2 out easing
 * Простое замедление к концу
 * @param {number} time - прогресс от 0 до 1
 * @returns {number} значение кривой
 */
export const power2Out: TEasingFunction = (time) => 1 - (1 - time) * (1 - time);