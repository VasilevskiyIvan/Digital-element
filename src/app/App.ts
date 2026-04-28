import { Animations } from "./animations/scrollAnimations";
import { ScrollEffects } from "./behaviors/ScrollEffects";
import { HeroAnimationsConfig } from "./configs/heroAnimationConfig";
import { ScrollEffectsConfig } from "./configs/scrollEffectsConfig";
import { domQuery } from "./dom/query";
import { ContactModalFeature } from "./features/ContactModalFeature";
import {
  AddBaseClassStrategy,
  FooterContentVisibilityStrategy,
  FooterVisibilityStrategy,
} from "./observers";
import { IntersectionReveal } from "./observers/IntersectionReveal";
import { SectionsVisibility } from "./observers/SectionsVisibility";

/**
 * Инициализация приложения
 * Подключает все анимации, наблюдатели и фичи
 */
export class App {

  /**
   * Запуск приложения
   */
  public init() {
    new Animations(HeroAnimationsConfig).init();
    new ScrollEffects(ScrollEffectsConfig).init();

    new IntersectionReveal(
      '[data-js="feature-card"]', "feature-card--visible", {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    ).init();

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
      .init({ threshold: 0.2 });

    new ContactModalFeature().init();
  }

}