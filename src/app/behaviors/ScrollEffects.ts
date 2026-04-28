import type { TScrollContext, TScrollEffectsConfig } from "./types";
import { domQuery } from "../dom/query";

/**
 *
 */
export class ScrollEffects {

  constructor(private rules: TScrollEffectsConfig) {}

  private scheduled = false;

  public init() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.update();
  }

  private onScroll = () => {
    if (this.scheduled) {
      return; 
    }

    this.scheduled = true;

    requestAnimationFrame(() => {
      this.scheduled = false;
      this.update();
    });
  };

  private update() {
    const ctx: TScrollContext = {
      scrollY: window.scrollY,
      viewportHeight: window.innerHeight,
    };

    for (const rule of this.rules) {
      const el = domQuery.byDataJs<HTMLElement>(rule.target);
      if (!el) {
        continue; 
      }

      el.classList.toggle(rule.toggleClass, rule.when(ctx));
    }
  }

}