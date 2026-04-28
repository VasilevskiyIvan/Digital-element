import { tween } from "./tween";
import type { TAnimationConfig, TAnimationConfigRule, TTransformState } from "./types";
import { domQuery } from "../dom/query";

/**
 * Класс управления анимациями
 * Запускает анимации для набора правил
 */
export class Animations {

  private animations: TAnimationConfig;

  /**
   * Класс управления анимациями
   * @param {TAnimationConfig} animations - список конфигураций анимаций
   */
  constructor(animations: TAnimationConfig) {
    this.animations = animations;
  }

  public init() {
    const tasks: Promise<void>[] = [];

    this.animations.forEach((config) => {
      const elements = config.multiple
        ? domQuery.byDataJsAll<HTMLElement>(config.selector)
        : [ domQuery.byDataJs<HTMLElement>(config.selector) ].filter(Boolean) as HTMLElement[];

      elements.forEach((el, index) => {
        const delay = config.delay + (config.stagger ?? 0) * index;

        this.applyState(el, config.from);

        tasks.push(
          this.runAt(delay, () => this.animate(el, config))
        );
      });
    });

    void Promise.all(tasks);
  }

  private animate(el: HTMLElement, config: TAnimationConfigRule) {
    return tween({
      durationMs: config.duration,
      easing: config.easing,
      onUpdate: (progress) => {
        const current = this.interpolate(config.from, config.to, progress);
        this.applyState(el, current);
      },
    });
  }

  private interpolate(from: TTransformState, to: TTransformState, t: number): TTransformState {
    return {
      opacity: this.mix(from.opacity, to.opacity, t),
      x: this.mix(from.x, to.x, t),
      y: this.mix(from.y, to.y, t),
      scale: this.mix(from.scale, to.scale, t),
    };
  }

  private mix(a: number | undefined, b: number | undefined, t: number): number | undefined {
    if (a === undefined || b === undefined) {
      return undefined;
    }
    return a + (b - a) * t;
  }

  private applyState(el: HTMLElement, state: TTransformState) {
    if (state.opacity !== undefined) {
      el.style.opacity = String(state.opacity);
    }

    const transforms: string[] = [];

    if (state.x !== undefined) {
      transforms.push(`translateX(${state.x}px)`);
    }
    if (state.y !== undefined) {
      transforms.push(`translateY(${state.y}px)`);
    }
    if (state.scale !== undefined) {
      transforms.push(`scale(${state.scale})`);
    }

    if (transforms.length > 0) {
      el.style.transform = transforms.join(" ");
    }
  }

  private runAt(delay: number, fn: () => Promise<void>) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        void fn().then(resolve);
      }, delay);
    });
  }

}