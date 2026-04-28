import type { TScrollContext, TScrollEffectsConfig } from "../behaviors/types";
import { domQuery } from "../dom/query";

export const ScrollEffectsConfig: TScrollEffectsConfig = [
  {
    target: "header",
    toggleClass: "header--scrolled",
    when: (ctx: TScrollContext) => {
      const hero = domQuery.byDataJs<HTMLElement>("hero");
      if (!hero) {
        return false; 
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      return ctx.scrollY > heroBottom - ctx.viewportHeight / 10;
    },
  },

  {
    target: "contacts",
    toggleClass: "contacts--border-none",
    when: (ctx: TScrollContext) => {
      const el = domQuery.byDataJs<HTMLElement>("contacts");
      if (!el) {
        return false; 
      }

      const top = el.getBoundingClientRect().top;
      return top <= ctx.viewportHeight / 10;
    },
  },
];