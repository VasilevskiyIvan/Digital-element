import { HeroAnimations, FormOnScrollAnimator } from "./animations/scrollAnimations";
import { ScrollEffects } from "./behaviors/ScrollEffects";
import { domQuery } from "./dom/query";
import { ContactModalFeature } from "./features/ContactModalFeature";
import { AddBaseClassStrategy, FooterContentVisibilityStrategy, FooterVisibilityStrategy } from "./observers";
import { IntersectionReveal } from "./observers/IntersectionReveal";
import { SectionsVisibility } from "./observers/SectionsVisibility";

/**
 *
 */
export class App {

  public init() {
    new HeroAnimations().init();
    new FormOnScrollAnimator().init();
    new ScrollEffects().init();
    new IntersectionReveal('[data-js="feature-card"]', "feature-card--visible", {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
      forceAfterMs: 2000,
    }).init();

    const footer = domQuery.byDataJs<HTMLElement>("footer");
    const footerContent = domQuery.byDataJs<HTMLElement>("footer-content");

    new SectionsVisibility()
      .addElements([
        '[data-js="clients"]',
        '[data-js="cta"]',
        '[data-js="footer-content"]',
      ])
      .addStrategy(new AddBaseClassStrategy())
      .addStrategy(new FooterVisibilityStrategy(footer))
      .addStrategy(new FooterContentVisibilityStrategy(footerContent))
      .init({ threshold: 0.2, forceAfterMs: 2000 });

    new ContactModalFeature().init();
  }

}

